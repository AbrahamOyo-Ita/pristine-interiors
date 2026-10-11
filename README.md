# Pristine Interiors, Website

A production-oriented website for **Pristine Interiors**, an interior design & furniture business in Nigeria.
Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, **React Hook Form + Zod**, **Lucide icons**, and a
pluggable data layer that runs on **Supabase (PostgreSQL + Auth + Storage)** in production and on a clearly-labelled
**local demo database** when Supabase is not configured.

> **Demo honesty policy:** nothing on the site is presented as a verified fact unless the business owner supplied it.
> Products, prices, projects, testimonials and contact details are **sample content** and are labelled as such in the UI.

---

## 1. Quick start (demo mode)

```bash
npm install
npm run dev          # http://localhost:3000
```

No environment variables are required. Without Supabase credentials the site runs in **demo mode**:

- Data (products, projects, services, enquiries, consultation requests, homepage settings) is stored in `data/db.json`
  (seeded automatically from `src/lib/seed.ts` on first run).
- Admin sign-in uses demo credentials (shown on the sign-in page):
  - email `owner@pristineinteriors.example`
  - password `pristine-demo`
  - override with `DEMO_ADMIN_EMAIL` / `DEMO_ADMIN_PASSWORD` in `.env.local`.
- Sessions are random 256-bit tokens in an httpOnly cookie; **every admin server action re-checks authorization
  server-side** (`requireAdmin()` in `src/lib/auth.ts`).

A top banner and footer note make clear that contact details are sample content until verified.

## 2. Feature map

| Area | Where | Notes |
| --- | --- | --- |
| Home (hero, featured products/projects, services, why-us, testimonials, CTA) | `src/app/page.tsx` | Hero copy & featured items editable in **Admin → Homepage** |
| Furniture shop | `/shop` | Search by name, category filter, price-range filter, sort (newest / price / name) |
| Product detail | `/shop/[slug]` | Gallery, stock status, sample-price badge, add-to-cart, WhatsApp enquiry, request-a-quote, related products |
| Cart | `/cart` | Add / remove / quantity, per-line subtotals + total, **persists in `localStorage`**, order via WhatsApp with encoded item summary |
| Portfolio | `/portfolio` | Category filters; project pages with gallery, approach, materials; consultation CTA; labelled illustrative |
| Services | `/services` | Proposed categories, toggle/edit in **Admin → Services** |
| Consultation booking | `/book-consultation` | Full validated form (RHF + Zod); success state makes clear a request ≠ confirmed booking; saved & visible in admin |
| Contact | `/contact` | Validated form, click-to-call, WhatsApp, email, hours, socials; Google Maps placeholder until address verified |
| WhatsApp | floating button + product/order/consultation links | Central number in `src/lib/config.ts`; messages URL-encoded via `waHref()` |
| Admin | `/admin` | Dashboard, product CRUD + image upload, project CRUD, services editor, enquiry/consultation status management, homepage settings |
| SEO | metadata per page, Open Graph, `sitemap.xml`, `robots.txt` | |

## 3. Central business configuration

All business identity is read from environment variables with honest fallbacks in **`src/lib/config.ts`**:
phone, WhatsApp number, email, address, hours and social links. Set them in `.env.local` (or your host's
dashboard) exactly as listed in `.env.example`, e.g. `NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678`. While a value
is unset the site shows clearly worded placeholders and hides social icons entirely, so nothing unverified is
ever presented as fact. Secrets (admin credentials, Supabase keys) are server-side only and are never sent to
the browser. `NEXT_PUBLIC_` variables are inlined at build time: set them before running `npm run build`
(a redeploy is needed after changing them).

## 4. Connecting Supabase (production)

1. Create a Supabase project.
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql). It creates all tables
   (`products`, `portfolio_projects`, `categories`, `services`, `testimonials`, `enquiries`,
   `consultation_requests`, `site_settings`, `profiles`), the `pristine-images` public storage bucket, and
   **Row Level Security** policies:
   - public visitors can only read *published* products/projects, active services, testimonials and settings;
   - anyone (anon) may **insert** enquiries / consultation requests but **never read** them;
   - only rows in `profiles` (admins) may write business content or read customer data.
3. Create the admin user in **Authentication → Users**, then insert its UUID into `profiles`
   (SQL at the bottom of the schema file).
4. Copy `.env.example` → `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
5. Swap the data layer: `src/lib/db.ts` + `src/lib/actions.ts` currently read/write `data/db.json`; point the same
   queries at Supabase using `@supabase/supabase-js` (already installed), `src/lib/auth.ts` switches to Supabase Auth
   (`signInWithPassword` / session cookies) and `uploadImage` to the storage bucket. Types in `src/lib/types.ts` map
   1:1 to the SQL schema. **Admin server actions must keep calling `requireAdmin()`** (or check the Supabase session +
   `profiles` row) so authorization stays enforced server-side; RLS is the second layer of defence.

> On Vercel’s read-only filesystem the JSON store degrades to in-memory; that is expected, production must use
> Supabase. Demo mode is for evaluation and local use.

## 5. Deployment (Vercel)

1. Push this folder to a Git repo and import it in Vercel (framework preset: **Next.js**, auto-detected).
2. Add the environment variables from `.env.example`. Before going public, set `DEMO_ADMIN_EMAIL` and
   `DEMO_ADMIN_PASSWORD` (or connect Supabase for real auth).
3. Deploy. `npm run build` is the build command; no extra configuration needed. Bind/host settings are default.

> On Vercel's read-only filesystem the demo JSON store degrades to in-memory, so admin edits made there do not
> persist between serverless cold starts. For persistent production data, connect Supabase (section 4) or host
> with `npm run start` on a VPS/container where `data/db.json` is writable.

## 6. Project structure

```
src/
  app/            pages & routes (public + /admin)
  components/     Header, Footer, CartProvider, cards, forms, WhatsApp float, admin UI
  lib/
    config.ts     ← central business configuration (edit me)
    types.ts      shared data model (mirrors supabase/schema.sql)
    seed.ts       demonstration content (sample products/projects/testimonials)
    db.ts         demo-mode JSON data store + public read helpers
    auth.ts       sessions, demo credentials, requireAdmin()
    actions.ts    server actions (forms + admin CRUD), all server-validated with Zod
    zod-schemas.ts
    whatsapp.ts   wa.me link builder (URL-encoded)
supabase/schema.sql
public/images/    curated interior & furniture photography
public/videos/    hero background clips (Pexels free license), crossfaded by components/HeroShow.tsx
```

## 7. Still required from the business owner

Everything below is supplied via environment variables (`.env.example`) or through the admin dashboard:

- [ ] `NEXT_PUBLIC_BUSINESS_PHONE` and `NEXT_PUBLIC_WHATSAPP_NUMBER` (verified numbers)
- [ ] `NEXT_PUBLIC_BUSINESS_EMAIL` (verified address)
- [ ] `NEXT_PUBLIC_BUSINESS_ADDRESS` (+ Google Maps embed) and `NEXT_PUBLIC_BUSINESS_HOURS`
- [ ] `NEXT_PUBLIC_SOCIAL_INSTAGRAM` / `NEXT_PUBLIC_SOCIAL_FACEBOOK` / `NEXT_PUBLIC_SOCIAL_PINTEREST` (icons stay hidden until set)
- [ ] `NEXT_PUBLIC_SITE_URL` (real domain, used for SEO metadata, sitemap and robots)
- [ ] `DEMO_ADMIN_EMAIL` / `DEMO_ADMIN_PASSWORD`, or a Supabase project for real authentication
- [ ] Real **product catalogue** with verified prices, stock and photography (admin → Products)
- [ ] Real **client projects** for the portfolio (admin → Projects)
- [ ] Real **testimonials** and confirmation of the **service list** (admin → Content / Services)
- [ ] Official **logo** (currently a clean typographic wordmark) and brand photos

## 8. Verification performed

- `tsc --noEmit` clean; `next build` succeeds (22 routes).
- All public routes return 200; `/admin` redirects (307) without a session.
- Server actions executed in-runtime: enquiry + consultation saved and validated (invalid input rejected with field
  message); admin write without session throws Unauthorized; session cookie grants `/admin` access; wrong password
  rejected.
- Shop search / category / price filters and portfolio category filter verified against rendered output.
- Cart math and persistence implemented client-side (`localStorage`), WhatsApp order message includes quantities,
  names and prices, correctly URL-encoded.
