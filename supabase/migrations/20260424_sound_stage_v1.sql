create extension if not exists pgcrypto;

alter table if exists public.fan_subscribers
  add column if not exists preferred_platform text,
  add column if not exists city text,
  add column if not exists country text,
  add column if not exists referrer text;

create table if not exists public.page_visitors (
  session_id uuid primary key,
  country text,
  city text,
  arrived_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create index if not exists page_visitors_last_seen_idx on public.page_visitors (last_seen_at desc);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.poster_downloads (
  id uuid primary key default gen_random_uuid(),
  lyric_line text not null,
  format text not null,
  theme text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.merch_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  product_slug text not null,
  size text,
  consent_given boolean not null default false,
  created_at timestamptz not null default now()
);

alter publication supabase_realtime add table public.page_visitors;
