# Visit Victoria Falls

An independent destination guide to Victoria Falls, Zimbabwe — experiences, places to stay,
restaurants, travel guides, interest collections and trip planning tools.

Built with the Next.js App Router. All content is data-driven, so adding a listing or a guide is a
data change, not a page change.

---

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server (Turbopack) on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint via `eslint-config-next` |

Node 20+ is required by Next.js 16.

## Environment variables

Every variable is optional — the site runs fully without them. Features degrade gracefully.

| Variable | Used by | Effect when set |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `src/app/layout.js`, `sitemap.js`, `robots.js` | Canonical origin for metadata, sitemap and robots. Defaults to `http://localhost:3000`. Set this in production. |
| `OPENAI_API_KEY` | `src/app/api/plan/route.js` | Enables AI itinerary generation. Without it, the planner uses a deterministic local generator. |
| `OPENAI_MODEL` | `src/app/api/plan/route.js` | Model name. Defaults to `gpt-4o-mini`. |
| `STUDIO_KEY` | `src/app/studio/page.js` | Enables the analytics dashboard at `/studio?key=…`. Unset means the page reports "not configured". |

## Project structure

```
src/
├─ app/
│  ├─ layout.js                 Root layout: fonts, metadata, header, footer
│  ├─ page.js                   Home page
│  ├─ globals.css               The entire design system (tokens + components)
│  ├─ <section>/                Index pages: things-to-do, places-to-stay, restaurants,
│  │                            guides, interests, travel, explore, events, landmarks,
│  │                            itineraries, plan, search, about, contact, faq, …
│  ├─ <section>/[slug]/         Detail pages for experiences, stays, restaurants,
│  │                            guides and interests
│  ├─ studio/                   Key-protected analytics dashboard (noindex)
│  ├─ api/
│  │  ├─ enquiry/route.js       Contact and listing enquiries → .data/enquiries.jsonl
│  │  ├─ plan/route.js          AI or local itinerary generation
│  │  └─ track/route.js         Client analytics events → .data/events.jsonl
│  ├─ sitemap.js                Generated from the content collections
│  └─ robots.js
├─ components/                  SiteHeader, SiteFooter, ListingCard, PageHero, HomeTabs,
│                               Reveal, EnquiryForm, TripPlanner, AnalyticsProvider
├─ data/site.js                 All content (see below)
└─ lib/
   ├─ store.js                  Append-only JSONL persistence in .data/
   ├─ rate-limit.js             In-memory, per-IP fixed-window limiter
   └─ resolve.js                Resolves `related` references to cards
```

## Editing content

`src/data/site.js` is the single source of truth. It exports:

| Export | Shape |
| --- | --- |
| `site` | Name, tagline, description, email, location, `lastReviewed` |
| `images` | Named image URLs, all served from the `CDN` constant |
| `nav` | Mega-menu structure: `label`, `href`, `feature`, `links[]` |
| `experiences` | `slug`, `title`, `category`, `image`, `blurb`, `duration`, `area`, `bestFor`, `summary`, `includes[]`, `goodToKnow[]`, `related[]` |
| `stays` | `slug`, `name`, `type`, `area`, `image`, `blurb`, `goodFor`, `note` |
| `restaurants` | `slug`, `name`, `type`, `area`, `image`, `blurb`, `note` |
| `guides` | `slug`, `title`, `excerpt`, `category`, `image`, `readTime`, `updated`, `intro`, `sections[]`, `related[]` |
| `interests` | `slug`, `name`, `image`, `blurb`, `experiences[]` (slugs) |
| `itineraries` | `slug`, `name`, `duration`, `forWho`, `summary`, `days[]` |
| `faqs`, `trustPoints` | Editorial copy blocks |

A guide `section` is `{ id, heading, body[], list[] }`. `id` is used as the anchor and for the
on-page table of contents.

Adding an entry is enough — index pages, detail routes (`generateStaticParams`), search, the
sitemap and the trip planner all read from these arrays. Deleting an entry without removing
references to its slug leaves dead links; `related` entries resolve through `src/lib/resolve.js`
and are silently dropped when they do not exist.

Images are remote (`https://visitzimbabwe.b-cdn.net`). Any new host must be added to
`images.remotePatterns` in `next.config.mjs`.

## API routes

All three are `POST` only, JSON in, JSON out, and rate limited per IP.

- **`/api/enquiry`** — validates name, email, topic, message (20+ chars) and consent, plus a
  honeypot field (`website`). Appends to `.data/enquiries.jsonl`. Returns `400` with a
  per-field `errors` object on validation failure.
- **`/api/plan`** — accepts `{ month, days, budget, group, interests }`. `days` must be 1–10.
  Uses OpenAI when `OPENAI_API_KEY` is set and falls back to the deterministic planner on any
  failure. The prompt restricts the model to the supplied experience catalogue and forbids
  inventing prices, availability or bookings.
- **`/api/track`** — accepts an event `type` from a fixed allowlist (`page_view`, `listing_click`,
  `plan_submit`, `enquiry_submit`, `outbound_click`, `search`, `filter`) plus `label`, `href`,
  `path`.

## Local data and analytics

`.data/` holds append-only JSONL written at runtime:

- `.data/events.jsonl` — page views and interaction events
- `.data/enquiries.jsonl` — submitted enquiries

Read them at `/studio?key=<STUDIO_KEY>`.

**This is local-only persistence.** On a serverless host the filesystem is read-only or ephemeral,
so both files will fail to write or disappear between deploys. Before going live on Vercel,
replace `src/lib/store.js` with a real store (KV, Postgres, or forward enquiries by email).

`.data/` is gitignored and is not deployed.

## Conventions

- **No Tailwind, no CSS modules.** One hand-written design system in `src/app/globals.css`,
  driven by CSS custom properties: `--color-*`, `--font-sans` / `--font-display`, `--text-*`,
  `--spacing-*`, `--radius*`, `--ease*`. Reuse those tokens rather than adding new values.
- **Fonts** are Instrument Serif (editorial display) and Manrope (body and interface), loaded with \u0060next/font\u0060 and exposed as \u0060--font-instrument\u0060 / \u0060--font-manrope\u0060.\n  `--font-lato` / `--font-playfair`.
- **JavaScript, not TypeScript.** Path alias `@/*` maps to `src/*` (`jsconfig.json`).
- **Cards** go through `ListingCard` so image, tag, meta and CTA treatment stay consistent.
- **Scroll reveals** use `Reveal`, which sets `.js-reveal` on the document and falls back to
  visible content when `IntersectionObserver` is unavailable.
- **Metadata** is declared per page. Dynamic pages use `generateMetadata`; the root layout owns
  the title template and Open Graph defaults.
- **Claims policy**: the site does not process bookings and must not state prices, availability
  or opening hours as confirmed facts. Keep the "confirm with the provider" copy intact, and
  prefer counts and dates pulled from `src/data/site.js` over hardcoded numbers.

## Deployment

Standard Next.js deployment (Vercel or any Node host):

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
2. Set `STUDIO_KEY` if you want the analytics dashboard.
3. Set `OPENAI_API_KEY` if you want AI itineraries.
4. Move enquiries and analytics off the local filesystem — see the note above.

Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) and
`poweredByHeader: false` are configured in `next.config.mjs`.
## AI concierge
A floating concierge appears throughout the site. It answers visitor questions from the curated
destination catalogue and links to real listing pages. It never claims live prices, availability or
confirmed bookings.

- Endpoint: `POST /api/concierge`
- Configure `OPENAI_API_KEY` and optionally `OPENAI_MODEL` for AI-generated replies.
- Without an OpenAI key, a catalogue-based local fallback remains available.
- Requests are rate limited. Conversation text is saved only when server-side Supabase credentials
  are configured.

## Supabase database
Apply `supabase/migrations/202611030001_initial_platform.sql` to a Supabase project you own.
Then set these server-only variables:

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for concierge message storage; never use a NEXT_PUBLIC_ prefix |

The migration creates tables for concierge messages, business directory submissions, enquiries and
analytics events. RLS is enabled. Public visitors can read only published business listings;
conversation, enquiry and analytics tables are not exposed to browser roles. Keep the service-role
key on the server and never commit it.

The current editorial business directory remains in `src/data/site.js`. The new table is ready for
a future owner-managed listing workflow; the migration does not automatically publish or import
editorial listings.

## AI and data handling
The existing trip planner posts to `/api/plan`; the floating concierge posts to
`/api/concierge`. Both use the server-side OpenAI key and have local fallbacks. Never commit
`.env.local`; use `.env.example` as the configuration template.
