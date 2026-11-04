create extension if not exists pgcrypto;
create table if not exists public.concierge_messages (
 id uuid primary key default gen_random_uuid(),
 visitor_message text not null check (char_length(visitor_message) between 2 and 1200),
 assistant_reply text not null check (char_length(assistant_reply) between 1 and 1800),
 created_at timestamptz not null default now()
);
create table if not exists public.business_listings (
 id uuid primary key default gen_random_uuid(), slug text not null unique,
 name text not null, category text not null, description text not null,
 area text not null default 'Victoria Falls, Zimbabwe', website_url text, image_url text,
 status text not null default 'pending' check(status in ('pending','published','rejected')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.enquiries (
 id uuid primary key default gen_random_uuid(), name text not null, email text not null,
 topic text not null, message text not null, created_at timestamptz not null default now()
);
create table if not exists public.analytics_events (
 id uuid primary key default gen_random_uuid(), event_type text not null,
 label text, path text, created_at timestamptz not null default now()
);
alter table public.concierge_messages enable row level security;
alter table public.business_listings enable row level security;
alter table public.enquiries enable row level security;
alter table public.analytics_events enable row level security;
drop policy if exists "Public can view published business listings" on public.business_listings;
create policy "Public can view published business listings" on public.business_listings
 for select to anon, authenticated using(status='published');
revoke all on public.concierge_messages from anon,authenticated;
revoke all on public.enquiries from anon,authenticated;
revoke all on public.analytics_events from anon,authenticated;
revoke insert,update,delete on public.business_listings from anon,authenticated;
grant select on public.business_listings to anon,authenticated;
create index if not exists business_listings_status_category_idx on public.business_listings(status,category);
create index if not exists concierge_messages_created_at_idx on public.concierge_messages(created_at desc);
create index if not exists analytics_events_created_at_idx on public.analytics_events(created_at desc);
