-- Run in a private Supabase project before enabling live donations.
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  internal_reference text not null unique,
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  amount_paise bigint not null check (amount_paise > 0),
  currency text not null default 'INR',
  donor_name text not null,
  donor_email text not null,
  donor_phone text,
  purpose text,
  status text not null default 'created',
  created_at timestamptz not null default now(),
  verified_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.razorpay_webhook_events (
  event_id text primary key,
  event_type text not null,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

alter table public.donations enable row level security;
alter table public.razorpay_webhook_events enable row level security;
-- No public policies: service-role server requests only.
