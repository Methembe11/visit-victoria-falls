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
| `OPENAI_MODEL` | `src/app/api/plan/route.js` | Trip planner model. Defaults to `gpt-4o-mini`. |
| `OPENAI_WEB_SEARCH_MODEL` | `src/app/api/concierge/route.js` | Concierge Responses API model. Defaults to `gpt-5.5`. |
| `SUPABASE_URL` | Server-side Supabase client | Project URL for private enquiry, analytics and optional conversation storage. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase client | Private server-only key. Never expose it with a `NEXT_PUBLIC_` prefix. |
| `STUDIO_KEY` | `src/app/studio/page.js` | Protects the analytics dashboard at `/studio?key=…`. |

## Project structure

```
src/
├─ app/
│  ├─ layout.js                 Root layout: Instrument Serif + Manrope, metadata, header, footer
│  ├─ page.js                   Home page
│  ├─ globals.css               The entire design system (tokens + components)
│  ├─ <section>/                Index pages: things-to-do, places-to-stay, restaurants,
│  │                            guides, interests, travel, explore, events, landmarks,
│  │                            itineraries, plan, search, about, contact, faq, …
│  ├─ <section>/[slug]/         Detail pages for experiences, stays, restaurants,
│  │                            guides and interests
│  ├─ studio/                   Key-protected analytics dashboard (noindex)
│  ├─ api/
│  │  ├─ enquiry/route.js       Validated enquiries → Formspree + private Supabase archive
│  │  ├─ plan/route.js          OpenAI or deterministic local itinerary generation
│  │  ├─ concierge/route.js     OpenAI web research or curated local fallback
│  │  ├─ track/route.js         Client analytics events → private Supabase table
│  │  └─ referral/route.js      Partner referral submissions
│  ├─ sitemap.js                Generated from the content collections
│  └─ robots.js
├─ components/                  SiteHeader, SiteFooter, ListingCard, PageHero, HomeTabs,
│                               Reveal, EnquiryForm, TripPlanner, AiConcierge, JourneyPathways,
│                               ReferralPanel, AnalyticsProvider
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

Production enquiries are delivered through Formspree and archived in Supabase. Analytics events are stored in Supabase. The Studio dashboard reads both datasets from Supabase. The legacy JSONL helper remains in the repository but is not used by these production routes.

See [AI integration, analytics and enquiry handling](docs/AI-INTEGRATION-AND-LIMITATIONS.md) for the implementation and limitations. For submission, see the [production verification report](docs/SUBMISSION-TEST-REPORT.md), [final presentation outline](docs/FINAL-PRESENTATION.md) and [screenshot evidence](docs/evidence/).

## Conventions

- **Styling** uses hand-written CSS, CSS Modules for isolated component styles, and shared design tokens in `src/app/globals.css`. There is no Tailwind dependency.
- **Fonts** are Instrument Serif (editorial display) and Manrope (body and interface), loaded with `next/font/google` and exposed as `--font-instrument` / `--font-manrope`.
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

Production deployment: [https://visit-victoria-falls.vercel.app](https://visit-victoria-falls.vercel.app) (Vercel).

Standard Next.js deployment (Vercel or any Node host):

1. Set `NEXT_PUBLIC_SITE_URL` to `https://visit-victoria-falls.vercel.app`.
2. Configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for private enquiry and analytics storage.
3. Set `STUDIO_KEY` to protect the Studio dashboard.
4. Set `OPENAI_API_KEY`, `OPENAI_MODEL` and `OPENAI_WEB_SEARCH_MODEL` to enable live model responses and concierge web search.
5. Keep all server secrets in the Vercel project environment settings. Never commit `.env.local`.

Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) and
`poweredByHeader: false` are configured in `next.config.mjs`.
## AI concierge
A floating concierge appears throughout the site. It answers visitor questions from the curated
destination catalogue and links to real listing pages. It never claims live prices, availability or
confirmed bookings.

- Endpoint: `POST /api/concierge`
- Configure `OPENAI_API_KEY` and `OPENAI_WEB_SEARCH_MODEL=gpt-5.5` for AI replies with optional live web research.
- The concierge uses the site guides, FAQs and directory first, then can search the web for missing or changing information. Web citations are shown as clickable source links.
- `OPENAI_MODEL` remains the trip planner model; `OPENAI_WEB_SEARCH_MODEL` controls the concierge search model.
- Without an OpenAI key, a limited local response remains available; it does not perform web research.
- Requests are rate limited. Conversation text is saved only when server-side Supabase credentials are configured.

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


## Current production data flow

- **Enquiries:** POST /api/enquiry validates submissions, forwards accepted messages to Formspree (https://formspree.io/f/mjyyjejk), and attempts to archive them in the private Supabase enquiries table.
- **Analytics:** POST /api/track validates allowlisted events and stores them in the private Supabase analytics_events table. The global AnalyticsProvider sends page views and marked interaction clicks.
- **Studio:** /studio?key=STUDIO_KEY reads analytics and enquiry records from Supabase. Keep STUDIO_KEY and SUPABASE_SERVICE_ROLE_KEY private.
- **AI documentation:** See docs/AI-INTEGRATION-AND-LIMITATIONS.md.

Formspree acceptance is the primary enquiry-delivery confirmation; the Supabase copy is an additional private archive. The Supabase service-role key is accessed only by server-side code.