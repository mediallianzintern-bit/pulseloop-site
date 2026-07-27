-- PulseLoop — demo request storage.
-- Run once in the Supabase SQL Editor (Database → SQL Editor → New query).

create table if not exists public.demo_requests (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  company      text not null,
  title        text,
  company_size text,
  message      text,
  interest     text,
  page         text
);

-- Newest leads first when browsing the table.
create index if not exists demo_requests_created_at_idx
  on public.demo_requests (created_at desc);

-- Lock the table down. The API route writes with the service-role key,
-- which bypasses RLS; without this, an anon key could read your leads.
alter table public.demo_requests enable row level security;

-- No policies are defined on purpose: that means no anonymous or
-- authenticated client can read or write. Only the service role can.
