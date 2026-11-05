# Production verification report

**Date:** 5 November 2026  
**Production URL:** https://visit-victoria-falls.vercel.app  
**Git commit deployed during verification:** 83a1ab1 (`Prepare capstone submission documentation and evidence`). The Vercel production deployment for this commit reached `READY`, and the stable production alias was assigned.

## Deployment checks

The Vercel deployment record for the latest pushed commit was in the `READY` state and targeted production. The production alias was confirmed as `visit-victoria-falls.vercel.app`.

Live HTTP checks returned **200 OK** for:
- Homepage: `/`
- AI Trip Planner: `/plan`
- Experiences: `/things-to-do`
- Accommodation: `/places-to-stay`
- Restaurants: `/restaurants`
- Partner information: `/partners`
- Favicon: `/favicon.png` (image/png)

These checks establish that the routes respond; they are not a substitute for a full manual cross-browser and mobile usability review.

## Live API tests

### Trip Planner

A POST request was sent to `/api/plan` with:
- Month: November
- Duration: 3 days
- Budget: Mid-range
- Group: Couple
- Interests: Nature and Wildlife

**Result:** HTTP success; returned a three-day itinerary. The response identified `generatedBy: local`.

**Interpretation:** The planner endpoint and local fallback work in production. This test did not verify live OpenAI generation.

### AI Concierge

A POST request was sent to `/api/concierge` asking for wildlife experiences around Victoria Falls.

**Result:** HTTP success; returned a destination-guidance answer and one internal recommendation. The response identified `generatedBy: local-knowledge` and returned no web citations.

**Interpretation:** The concierge endpoint and curated local knowledge fallback work in production. Live OpenAI responses and web research were not verified in this test.

### Important AI limitation

The production AI features currently demonstrated are fallback-assisted. Do not describe the live AI model or live web search as successfully tested. Live model use requires a working OpenAI API key, available API quota and correctly configured production environment variables. A ChatGPT subscription does not provide API credits.

## Screenshot evidence

The following screenshots were captured from the live production site using Microsoft Edge headless at a 1440 × 1000 viewport:

1. `01-homepage.png` — homepage and destination introduction.
2. `02-trip-planner.png` — AI Trip Planner page.
3. `03-experiences.png` — experiences directory.
4. `04-accommodation.png` — places-to-stay directory.
5. `05-partners.png` — partner information page.

These are page screenshots, not proof of a completed form submission or a live AI response. The API test results above provide separate evidence for the fallback behaviour.

## Local quality checks

After the final typography and documentation changes:
- `npm run build`: passed; 76 pages generated.
- `npm run lint`: passed with zero errors and one warning in `src/components/ui/polaroid-line-carousel.js` because it uses a standard `<img>` element.

The final source changes were pushed as commit `83a1ab1`. Vercel deployed that commit to production and reported `READY`; the stable production alias was confirmed. The Instrument Serif font is now loaded through `next/font/google` and the Manrope interface font remains in place.
