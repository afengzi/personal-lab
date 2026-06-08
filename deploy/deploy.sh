#!/usr/bin/env bash
#
# Deploy personal-lab to the server, REUSING couple-companion's self-hosted
# Supabase (same Hong Kong box → ~0ms DB latency). It:
#   1. ships the migrations to /opt/lab/repo
#   2. applies lab_* migrations into the existing Supabase Postgres (idempotent)
#   3. pulls the CI-built app image from GHCR and (re)starts it on 127.0.0.1:3001
#   4. health-checks 127.0.0.1:3001
#
# Reuse, not a second Supabase stack — keeps memory off the 4GB box.
# Runs from CI (GitHub Actions); not meant to run from a dev laptop.

set -euo pipefail
cd "$(dirname "$0")"

: "${SERVER_HOST:?set SERVER_HOST}"
: "${SERVER_USER:?set SERVER_USER}"
: "${DOMAIN:?set DOMAIN}"
: "${IMAGE:?set IMAGE}"
: "${IMAGE_TAG:?set IMAGE_TAG}"
: "${ADMIN_SECRET:?set ADMIN_SECRET}"
GITHUB_HANDLE="${GITHUB_HANDLE:-fengziaaa}"
VESPER_DIR="${VESPER_DIR:-/opt/vesper}"

SSH=(ssh -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}")
REMOTE="${SERVER_USER}@${SERVER_HOST}"
APP_IMAGE="${IMAGE}:${IMAGE_TAG}"

echo "==> ship migrations to ${REMOTE}:/opt/lab/repo"
"${SSH[@]}" 'mkdir -p /opt/lab/repo/supabase'
rsync -az --delete -e 'ssh -o StrictHostKeyChecking=accept-new' \
  ../supabase/migrations "${REMOTE}:/opt/lab/repo/supabase/"

echo "==> deploy on server (image: ${APP_IMAGE})"
"${SSH[@]}" \
  "APP_IMAGE='${APP_IMAGE}' DOMAIN='${DOMAIN}' VESPER_DIR='${VESPER_DIR}' \
   ADMIN_SECRET='${ADMIN_SECRET}' GITHUB_HANDLE='${GITHUB_HANDLE}' \
   GHCR_USER='${GHCR_USER:-}' GHCR_TOKEN='${GHCR_TOKEN:-}' bash -s" <<'REMOTE_DEPLOY'
set -euo pipefail

# Reuse couple-companion's Supabase: pull its secrets + apply lab_* migrations
# into the same Postgres, then run only the lab app container.
if [ ! -f "${VESPER_DIR}/.env" ]; then
  echo "!! ${VESPER_DIR}/.env not found — couple-companion's Supabase must be deployed first" >&2
  exit 1
fi
set -a; . "${VESPER_DIR}/.env"; set +a
: "${SERVICE_ROLE_KEY:?SERVICE_ROLE_KEY missing in ${VESPER_DIR}/.env}"

echo "  -> apply lab_* migrations into the shared Postgres (idempotent)"
DB_EXEC=(docker compose -f "${VESPER_DIR}/docker-compose.yml" --project-directory "${VESPER_DIR}" exec -T db psql -U postgres -d postgres)
"${DB_EXEC[@]}" -v ON_ERROR_STOP=1 -c \
  "create table if not exists public._lab_migrations(filename text primary key, applied_at timestamptz default now())" </dev/null
for f in /opt/lab/repo/supabase/migrations/*.sql; do
  base="$(basename "$f")"
  if [ "$("${DB_EXEC[@]}" -tAc "select 1 from public._lab_migrations where filename='$base'" </dev/null | tr -d '[:space:]')" = "1" ]; then
    continue
  fi
  echo "     applying $base"
  "${DB_EXEC[@]}" -v ON_ERROR_STOP=1 < "$f"
  "${DB_EXEC[@]}" -c "insert into public._lab_migrations(filename) values ('$base')" </dev/null >/dev/null
done

echo "  -> pull image and (re)start lab app on 127.0.0.1:3001"
if [ -n "${GHCR_TOKEN:-}" ]; then
  printf '%s' "$GHCR_TOKEN" | docker login ghcr.io -u "${GHCR_USER:-github-actions}" --password-stdin >/dev/null
fi
docker pull "$APP_IMAGE"
docker rm -f lab-app 2>/dev/null || true
docker run -d --name lab-app --restart unless-stopped \
  -p 127.0.0.1:3001:3000 \
  --memory 512m --memory-swap 512m \
  --add-host "db.${DOMAIN}:host-gateway" \
  -e SUPABASE_URL="https://db.${DOMAIN}" \
  -e SUPABASE_SERVICE_ROLE_KEY="$SERVICE_ROLE_KEY" \
  -e GITHUB_HANDLE="$GITHUB_HANDLE" \
  -e ADMIN_SECRET="$ADMIN_SECRET" \
  "$APP_IMAGE"

echo "  -> wait for health on 127.0.0.1:3001"
ok=0
for _ in $(seq 1 30); do
  code="$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/api/ideas || true)"
  if [[ "$code" =~ ^[23] ]]; then echo "     lab app ready (HTTP $code)"; ok=1; break; fi
  sleep 3
done
docker ps --filter name=lab-app --format '{{.Names}} {{.Status}}'
[ "$ok" = "1" ] || { echo "!! lab app not ready; docker logs lab-app" >&2; exit 1; }
REMOTE_DEPLOY

cat <<EOF

✅ lab app 已在 127.0.0.1:3001 跑起来（复用 couple-companion 的 Supabase，同机 ~0ms）。
   公网访问还需在「宝塔」给 lab.${DOMAIN} 配反向代理 + SSL：
     lab.${DOMAIN}  ->  http://127.0.0.1:3001
EOF
