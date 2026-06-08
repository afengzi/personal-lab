-- FENGZIAAA Lab — visitor ideas + votes (moderated UGC).
create extension if not exists "pgcrypto";

create table if not exists public.lab_ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  author_handle text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.lab_votes (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.lab_ideas(id) on delete cascade,
  voter_key text not null,
  created_at timestamptz not null default now(),
  unique (idea_id, voter_key)
);

create index if not exists ideas_status_created_idx on public.lab_ideas (status, created_at desc);
create index if not exists votes_idea_idx on public.lab_votes (idea_id);

alter table public.lab_ideas enable row level security;
alter table public.lab_votes enable row level security;

-- Anonymous clients may read only approved ideas; all writes go through the
-- service-role key on the server, which bypasses RLS.
drop policy if exists "approved ideas are readable" on public.lab_ideas;
create policy "approved ideas are readable" on public.lab_ideas
  for select using (status = 'approved');

drop policy if exists "votes are readable" on public.lab_votes;
create policy "votes are readable" on public.lab_votes
  for select using (true);
