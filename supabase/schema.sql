-- ───────────────────────────────────────────────────────────────────────────
-- Pristine Interiors — Supabase schema + Row Level Security
--
-- Run this in the Supabase SQL editor after creating a project.
-- The demo (no-Supabase) mode uses the same data model in data/db.json.
-- ───────────────────────────────────────────────────────────────────────────

create extension if not exists pgcrypto;

-- ── helpers ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

-- ── categories ─────────────────────────────────────────────────────────────
create table if not exists public.categories (
  slug text primary key,
  label text not null,
  kind text not null check (kind in ('product', 'project'))
);

insert into public.categories (slug, label, kind) values
  ('sofas','Sofas','product'), ('beds','Beds','product'), ('dining','Dining Furniture','product'),
  ('chairs','Chairs','product'), ('tables','Tables','product'), ('storage','Storage','product'),
  ('accessories','Accessories','product'),
  ('living-rooms','Living Rooms','project'), ('bedrooms','Bedrooms','project'),
  ('offices','Offices','project'), ('kitchens','Kitchens','project'),
  ('commercial','Commercial Spaces','project'), ('full-transformations','Full Transformations','project')
on conflict (slug) do nothing;

-- ── products ──────────────────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_slug text not null references public.categories (slug),
  price numeric(12,2),                       -- null = price on request; sample until verified
  description text not null default '',
  images jsonb not null default '[]'::jsonb, -- array of storage paths / URLs
  stock text not null default 'in-stock' check (stock in ('in-stock','made-to-order','out-of-stock')),
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── portfolio projects ─────────────────────────────────────────────────────
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category_slug text not null references public.categories (slug),
  location text not null default '',
  cover text not null,
  images jsonb not null default '[]'::jsonb,
  summary text not null default '',
  approach text not null default '',
  materials jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── services ───────────────────────────────────────────────────────────────
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  blurb text not null default '',
  points jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  sort int not null default 0
);

-- ── testimonials (clearly sample until real ones are supplied) ────────────
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null default '',
  quote text not null,
  is_sample boolean not null default true
);

-- ── customer enquiries (private) ───────────────────────────────────────────
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null default '',
  email text not null default '',
  message text not null,
  source text not null default 'contact',
  status text not null default 'new' check (status in ('new','replied','closed')),
  created_at timestamptz not null default now()
);

-- ── consultation requests (private) ────────────────────────────────────────
create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null default '',
  project_type text not null,
  location text not null,
  budget text not null default '',
  preferred_date date,
  description text not null,
  status text not null default 'new' check (status in ('new','contacted','scheduled','closed')),
  created_at timestamptz not null default now()
);

-- ── homepage / site settings (single row) ──────────────────────────────────
create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.site_settings (id, settings) values (true, '{}'::jsonb)
on conflict (id) do nothing;

-- ── Row Level Security ─────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.enquiries enable row level security;
alter table public.consultation_requests enable row level security;
alter table public.site_settings enable row level security;

-- profiles: admins can read their own row
create policy "profiles self read" on public.profiles
  for select to authenticated using (id = auth.uid());

-- categories: public read, admin write
create policy "categories public read" on public.categories for select using (true);
create policy "categories admin write" on public.categories for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- products: public sees published only; admins see/manage all
create policy "products public read" on public.products for select using (published or public.is_admin());
create policy "products admin insert" on public.products for insert to authenticated with check (public.is_admin());
create policy "products admin update" on public.products for update to authenticated using (public.is_admin());
create policy "products admin delete" on public.products for delete to authenticated using (public.is_admin());

-- projects: same pattern
create policy "projects public read" on public.portfolio_projects for select using (published or public.is_admin());
create policy "projects admin insert" on public.portfolio_projects for insert to authenticated with check (public.is_admin());
create policy "projects admin update" on public.portfolio_projects for update to authenticated using (public.is_admin());
create policy "projects admin delete" on public.portfolio_projects for delete to authenticated using (public.is_admin());

-- services & testimonials: public read, admin write
create policy "services public read" on public.services for select using (true);
create policy "services admin write" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "testimonials public read" on public.testimonials for select using (true);
create policy "testimonials admin write" on public.testimonials for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- enquiries: anyone (anon) can insert; ONLY admins can read/update/delete
create policy "enquiries anon insert" on public.enquiries for insert to anon with check (true);
create policy "enquiries admin read" on public.enquiries for select to authenticated using (public.is_admin());
create policy "enquiries admin update" on public.enquiries for update to authenticated using (public.is_admin());
create policy "enquiries admin delete" on public.enquiries for delete to authenticated using (public.is_admin());

-- consultation requests: same pattern
create policy "consultations anon insert" on public.consultation_requests for insert to anon with check (true);
create policy "consultations admin read" on public.consultation_requests for select to authenticated using (public.is_admin());
create policy "consultations admin update" on public.consultation_requests for update to authenticated using (public.is_admin());
create policy "consultations admin delete" on public.consultation_requests for delete to authenticated using (public.is_admin());

-- settings: public read, admin write
create policy "settings public read" on public.site_settings for select using (true);
create policy "settings admin write" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── storage: public-read image bucket, admin uploads ───────────────────────
insert into storage.buckets (id, name, public) values ('pristine-images','pristine-images', true)
on conflict (id) do nothing;

create policy "images public read" on storage.objects for select using (bucket_id = 'pristine-images');
create policy "images admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'pristine-images' and public.is_admin());
create policy "images admin update" on storage.objects for update to authenticated using (bucket_id = 'pristine-images' and public.is_admin());
create policy "images admin delete" on storage.objects for delete to authenticated using (bucket_id = 'pristine-images' and public.is_admin());

-- ── bootstrap an admin: after creating the user in Supabase Auth, run ──────
-- insert into public.profiles (id) values ('<auth-user-uuid>');
