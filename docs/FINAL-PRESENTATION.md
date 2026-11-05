# Visit Victoria Falls
## Capstone project presentation

**Presenter:** Methembe Mkhize  
**Programme:** Software Development Specialization — Uncommon.org  
**Project type:** AI-integrated tourism discovery and booking-referral platform  
**Live application:** https://visit-victoria-falls.vercel.app  
**Source code:** https://github.com/Methembe11/visit-victoria-falls

---

## 1. The problem

Victoria Falls attracts visitors from Zimbabwe and around the world. Visitors can choose from adventure activities, guided tours, accommodation, restaurants and transport services.

However, information about these options is spread across search engines, social media pages and individual business websites. Visitors may need to contact several providers before they can understand their options.

Local tourism businesses also need ways to reach travellers who are actively planning a visit.

## 2. The proposed solution

Visit Victoria Falls brings destination information and local tourism discovery into one focused platform.

Visitors can:
- Explore activities, tours, accommodation and restaurants.
- Read destination guides and practical travel information.
- View business information and follow booking links or send enquiries.
- Use an AI-assisted trip planner to create a suggested itinerary.
- Ask the destination concierge questions about Victoria Falls.

The platform is a discovery and referral service. It does not take payments or confirm reservations.

## 3. Main application features

- Destination-focused homepage and navigation.
- Experiences and interest collections.
- Accommodation and restaurant directories with detail pages.
- Local business and partner information.
- Travel guides and practical destination content.
- AI Trip Planner.
- Floating AI Concierge.
- Enquiry and partner referral workflows.
- Basic first-party analytics and a protected Studio dashboard.

## 4. Technologies used

- **Next.js 16.4.3** with the App Router.
- **React 19.3.0** and JavaScript.
- **CSS and CSS Modules** for responsive interface styling.
- **Instrument Serif and Manrope** for typography.
- **Supabase** for private server-side data storage.
- **Formspree** for enquiry delivery.
- **OpenAI API integration** for AI-assisted planning and concierge responses, with local fallback behaviour.
- **Git and GitHub** for version control.
- **Vercel** for production hosting.

## 5. How the AI integration works

### AI Trip Planner

The visitor selects a travel month, trip length, approximate budget, group type and interests. The browser sends these preferences to `POST /api/plan`.

The server uses the curated experience catalogue as source material. When the OpenAI API is configured and available, it requests a structured itinerary. If the key is missing or the provider request fails, the application uses a deterministic local itinerary generator.

### AI Concierge

The visitor asks a question through the floating concierge. The browser sends the question and recent conversation context to `POST /api/concierge`.

The server can use the OpenAI Responses API with web search for changing or missing information. If live AI is unavailable, it uses the destination catalogue, guides and FAQs to provide a local response.

### AI safeguards and limitations

- AI suggestions are not confirmed bookings.
- The system must not invent prices, availability, opening hours or provider details.
- Visitors are directed to confirm important details with operators.
- Local fallback responses are not live model responses and do not perform web research.

**Demonstration result:** The production trip planner returned a three-day itinerary using its local fallback. The concierge returned a curated wildlife-related answer and a listing recommendation using its local knowledge fallback. Live OpenAI generation and web search were not verified during final production testing because the observed responses used fallback mode.

## 6. Data and enquiry handling

- Enquiry submissions are validated by the server and forwarded to Formspree.
- Accepted enquiries are also archived in a private Supabase table when configured.
- Analytics events are sent to a server endpoint and stored in Supabase.
- Server credentials are kept out of browser code.
- The platform uses rate limits and validation on its API routes.

## 7. Testing and deployment

The production deployment is available at:

https://visit-victoria-falls.vercel.app

Production route checks returned HTTP 200 for the homepage, planner, experiences, accommodation, restaurants, partners page and favicon.

The planner API returned a three-day plan. The concierge API returned a local-knowledge response with a recommendation.

The local production build previously completed successfully and generated 76 pages. ESLint reported zero errors and one image optimisation warning. The final build and lint checks are repeated after the submission documentation and typography changes.

Screenshot evidence is saved in `docs/evidence/`. The production verification report is `docs/SUBMISSION-TEST-REPORT.md`.

## 8. What I accomplished

I took the project from a proposal and concept into a deployed full-stack tourism platform. I planned the information architecture, built the interface and destination pages, structured the tourism content, integrated the trip planner and concierge APIs, connected enquiry and analytics services, added partner referral functionality, tested the application and maintained the source code in GitHub.

The project demonstrates how a destination-specific digital platform can combine web development, structured information, AI-assisted planning and referral workflows to make travel discovery more convenient.

## 9. Future improvements

- Restore and verify live OpenAI API quota for both AI tools.
- Add automated tests for API validation, rate limiting and persistence.
- Expand the business listing moderation workflow.
- Improve analytics reporting and conversion measurement.
- Add verified provider availability integrations where partnerships permit.
- Conduct usability testing with visitors and local tourism businesses.

## Closing

Visit Victoria Falls is a working foundation for a destination-focused tourism platform. The capstone demonstrates the core discovery experience, AI-assisted planning, concierge fallback, enquiry handling and production deployment, while clearly identifying what still requires live provider integrations and further testing.
