# AI integration, analytics and enquiry handling

## AI integration

Visit Victoria Falls provides two visitor-facing AI-assisted tools.

### AI Trip Planner
- Endpoint: `POST /api/plan`
- Inputs: travel month, trip length, budget, group type and interests.
- Uses the curated experience catalogue as its source material.
- Uses the server-side `OPENAI_API_KEY` when available.
- Uses the deterministic local itinerary generator when the key is missing or the OpenAI request fails.

### AI Concierge
- Endpoint: `POST /api/concierge`
- Available through the floating site-wide concierge interface.
- Uses the site's curated experiences, accommodation, restaurants, guides, FAQs and recent conversation context.
- When the OpenAI Responses API is available, it can use web search for changing or missing information and display citation links returned by the API.
- When the provider is unavailable, it uses curated local knowledge and clearly labels the response source.

### Configuration
| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Server-side key for OpenAI requests |
| `OPENAI_MODEL` | Trip Planner model; default is `gpt-4o-mini` |
| `OPENAI_WEB_SEARCH_MODEL` | Concierge model; default is `gpt-5.5` |

Keys must remain server-side. They must never use a `NEXT_PUBLIC_` prefix or be committed to Git.

### AI limitations
- Live generation and Concierge web research require available OpenAI API quota. A ChatGPT subscription does not include API credits.
- The local fallback is deterministic catalogue/FAQ matching, not a full language model. It may not understand complex or unusual questions.
- The planner creates suggested itineraries only. It does not check availability, prices, opening hours or booking inventory.
- The Concierge does not make bookings or guarantee prices, operating hours, schedules, river conditions, safety conditions, border rules or visa eligibility.
- Visitors should verify time-sensitive details with official authorities and providers.
- Live citations are available only when the live API returns citation annotations. Local fallback replies do not perform live web research.

### Verified demonstration state
The production Trip Planner was sent a three-day itinerary request and returned a three-day plan with the local fallback marker. The production Concierge was asked about game drives and returned a curated response with a recommendation. These tests verify fallback operation, not live AI generation or live web search. Live AI calls previously returned an OpenAI quota-exhaustion error.

Suggested presentation: generate a three-day itinerary, ask about game drives, then ask about live prices or availability. Explain that the tools are AI-integrated but currently operating in fallback mode until API quota is available.

## Enquiry forms

The enquiry form performs server-side validation for name, email, topic, message length and consent. A honeypot field is used for basic bot filtering, and requests are rate-limited.

Valid enquiries are forwarded server-to-server to Formspree at:

`https://formspree.io/f/mjyyjejk`

The endpoint uses JSON submission with an `Accept: application/json` response. The visitor is shown success only after Formspree accepts the submission. Formspree's dashboard controls recipient routing and notification settings; these should be checked by the project owner.

The application also attempts to archive accepted enquiries in the private Supabase `enquiries` table for the Studio dashboard. If Formspree accepts the enquiry but the Supabase archive fails, the visitor still receives success because delivery has already been accepted; the archive error is logged server-side. Do not ask visitors to include payment-card details or other sensitive information.

## Basic analytics

The global `AnalyticsProvider` records page views and clicks on elements carrying `data-track`. It sends events to `POST /api/track`. The API validates the event type against an allowlist, rate-limits requests and writes events to Supabase's `analytics_events` table.

Supported event types:
- `page_view`
- `listing_click`
- `plan_submit`
- `enquiry_submit`
- `outbound_click`
- `search`
- `filter`

The protected `/studio?key=<STUDIO_KEY>` dashboard reads recent analytics and enquiries from Supabase.

Analytics are basic first-party event counts, not a full analytics platform. There is no cross-device identity, user profiling, demographic reporting or guaranteed unique-visitor count. Browser privacy controls, ad blockers, disabled JavaScript and network failures can prevent events from being recorded. The analytics table stores event type, optional label, path and timestamp; it does not intentionally store raw IP addresses.

## Supabase and security

Server-side code uses the Supabase REST API with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The service-role key must never be sent to the browser or committed to source control. Row Level Security is enabled and browser roles do not have direct access to private enquiry or analytics records.

Tables:
- `concierge_messages`: visitor message and assistant reply.
- `enquiries`: name, email, topic, message and timestamp.
- `analytics_events`: event type, label, path and timestamp.
- `business_listings`: reserved for a future moderated business-submission workflow. The current editorial directory is still stored in the site's source data.

## Environment variables

Set these in Vercel as server-side environment variables:
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENAI_WEB_SEARCH_MODEL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STUDIO_KEY`
- `NEXT_PUBLIC_SITE_URL`

The Formspree endpoint is configured in `src/app/api/enquiry/route.js`.

## Future improvements
- Restore OpenAI API quota and test live model responses, web search and citations.
- Add automated API tests for validation, rate limits, fallbacks and persistence.
- Add dashboard date filters, exports and more detailed conversion reporting.
- Add monitoring for Formspree delivery failures and Supabase archive failures.
- Add an owner-managed business listing moderation interface.
- Review analytics consent and privacy wording for the jurisdictions where the site is used.
