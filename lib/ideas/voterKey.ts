import { createHash } from "node:crypto";

/* Stable anonymous voter fingerprint = sha256(ip | ua | anon-cookie).
   Combined with a unique(idea_id, voter_key) constraint, this dedupes votes
   without requiring accounts. */
export function voterKey({ ip, ua, anon }: { ip: string; ua: string; anon: string }): string {
  return createHash("sha256").update(`${ip}|${ua}|${anon}`).digest("hex");
}
