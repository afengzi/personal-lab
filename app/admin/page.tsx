"use client";

import { useCallback, useState, type CSSProperties } from "react";

type PendingIdea = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  created_at: string;
};

/* Minimal owner-only moderation gate. Enter ADMIN_SECRET → it is stored in the
   `admin` cookie and checked by /api/admin/ideas. Optional: delete this page and
   the admin API to moderate straight from the Supabase dashboard instead. */
export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [ideas, setIdeas] = useState<PendingIdea[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/ideas", { headers: { "x-admin-secret": secret } });
    if (res.status === 401) {
      setError("密钥不正确");
      return;
    }
    const data = await res.json();
    setIdeas(data.ideas ?? []);
    setAuthed(true);
    setError("");
    document.cookie = `admin=${encodeURIComponent(secret)}; path=/; max-age=86400; samesite=lax`;
  }, [secret]);

  const act = async (id: string, action: "approve" | "reject") => {
    await fetch("/api/admin/ideas", {
      method: "POST",
      headers: { "content-type": "application/json", "x-admin-secret": secret },
      body: JSON.stringify({ id, action }),
    });
    setIdeas((xs) => xs.filter((x) => x.id !== id));
  };

  const wrap: CSSProperties = { position: "fixed", inset: 0, overflow: "auto", display: "grid", placeItems: "center", padding: 24 };

  if (!authed) {
    return (
      <div style={wrap}>
        <div className="fz-panel" style={{ ["--frame" as string]: "color-mix(in srgb, var(--cyan) 55%, var(--line))", padding: 28, width: 340 }}>
          <div className="fz-wordmark" style={{ fontSize: 18, marginBottom: 16 }}>
            ADMIN · 审核
          </div>
          <div className="field">
            <label htmlFor="secret">Admin secret</label>
            <input id="secret" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load()} />
          </div>
          {error && <div style={{ color: "var(--red)", fontFamily: "var(--font-mono)", fontSize: 12, marginBottom: 10 }}>{error}</div>}
          <button type="button" className="nav-btn active" onClick={load}>
            进入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "auto", padding: "32px 24px" }}>
      <div className="fz-wordmark" style={{ fontSize: 22, marginBottom: 6 }}>
        待审想法 · {ideas.length}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", marginBottom: 20 }}>
        通过后将出现在访客想法列表
      </div>
      {ideas.length === 0 && <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>没有待审项</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
        {ideas.map((i) => (
          <div key={i.id} className="fz-panel" style={{ ["--frame" as string]: "color-mix(in srgb, var(--amber) 45%, var(--line))", padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-techno)", fontWeight: 700, fontSize: 16, color: "var(--text-bright)" }}>{i.title}</div>
                {i.description && <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text-dim)", marginTop: 4 }}>{i.description}</div>}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", marginTop: 6 }}>
                  {i.category ?? "—"} · {new Date(i.created_at).toLocaleString()}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button type="button" className="nav-btn" style={{ color: "var(--green)", borderColor: "var(--green)" }} onClick={() => act(i.id, "approve")}>
                  通过
                </button>
                <button type="button" className="nav-btn" style={{ color: "var(--red)", borderColor: "var(--red)" }} onClick={() => act(i.id, "reject")}>
                  拒绝
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
