export const CDN = "https://visitzimbabwe.b-cdn.net";

export const site = {
  name: "Visit Victoria Falls",
  tagline: "Discover More. Experience Victoria Falls.",
  description:
    "A destination-focused guide to experiences, places to stay, local businesses and travel information for Victoria Falls, Zimbabwe.",
  email: "hello@visitvictoriafalls.co.zw",
  location: "Victoria Falls, Matabeleland North, Zimbabwe",
  lastReviewed: "October 2026",
};

export const images = {
  hero: `${CDN}/guides/victoria-falls/pillar-complete-guide-to-victoria-falls-zimbabwe.jpg`,
  fallsCity: `${CDN}/city/victoria-falls-1764957589195.jpg`,
  devilsPool: `${CDN}/guides/victoria-falls/devils-pool-victoria-falls-safety-booking-guide-1767724311534.jpg`,
  devilTour: `${CDN}/tours/victoria-falls-elite-devils-pool-island-adventure-escape-1-1765703819462.jpg`,
  sunsetCruise: `${CDN}/guides/victoria-falls/sunset-cruise-zambezi-victoria-falls-boats-1767724537282.jpg`,
  sunsetGuide: `${CDN}/guides/victoria-falls/sunset-cruise-zambezi-victoria-falls-boats-1767724537282.jpg`,
  helicopter: `${CDN}/guides/victoria-falls/victoria-falls-helicopter-tours-prices-comparison-1767724370622.jpg`,
  bungee: `${CDN}/guides/victoria-falls/victoria-falls-bungee-jump-complete-guide-1767724483790.jpg`,
  bridge: `${CDN}/guides/victoria-falls/victoria-falls-bridge-walk-border-crossing-1767724596315.jpg`,
  seasons: `${CDN}/guides/victoria-falls/victoria-falls-dry-vs-wet-season-when-to-visit-1767724428653.jpg`,
  gameDrive: `${CDN}/tours/victoria-falls-game-drive-1-1765706442933.jpg`,
  chobe: `${CDN}/tours/from-victoria-falls-full-chobe-day-trip-to-chobe-botswana-1-1765706380391.jpg`,
  zambeziSafari: `${CDN}/tours/victoria-falls-zambezi-national-park-safari-1-1765706312987.jpg`,
  community: `${CDN}/tours/victoria-falls-community-and-wildlife-safari-hero.jpg`,
  transfers: `${CDN}/tours/victoria-falls/airport-transfers.jpg`,
  safariFamily: `${CDN}/tours/family-zimbabwe-safari-falls-hwange-and-kariba-hero.jpg`,
  themeAdventure: `${CDN}/theme/theme-adventure.jpg`,
  themeArt: `${CDN}/theme/theme-art-history.jpg`,
  themeFamily: `${CDN}/theme/theme-family.jpg`,
  themeRomance: `${CDN}/theme/theme-romance.jpg`,
  themeNature: `${CDN}/theme/theme-nature.jpg`,
  themeCulture: `${CDN}/theme/theme-culture.jpg`,
  themeFood: `${CDN}/theme/theme-food-wine.jpg`,
  themeShopping: `${CDN}/theme/theme-shopping.jpg`,
  themeWellness: `${CDN}/theme/theme-wellness.jpg`,
  themeNightlife: `${CDN}/theme/theme-nightlife.jpg`,
  restaurantLookout: `${CDN}/restaurants/restaurant-63e79532-678f-4447-8521-742684ae29c6-1.jpg`,
  restaurantBaines: `${CDN}/restaurants/restaurant-29051ebd-868c-489d-83be-efc985fbdbeb-1.jpg`,
  restaurantBeachHouse: `${CDN}/restaurants/restaurant-b39dc5b4-5ea2-4a40-a98f-35fa68474118-1.jpg`,
  restaurantGarden: `${CDN}/restaurants/restaurant-42d81d7d-a0f3-48e7-8213-971974f852d8-1.jpg`,
  restaurantMarula: `${CDN}/restaurants/restaurant-809d6dfa-7cfa-49da-b090-20d15b8aa307-1.jpg`,
  restaurantRoosters: `${CDN}/restaurants/restaurant-1df7c815-6565-4f5a-bcb2-92c6ebc7c976-1.jpg`,
  restaurantZulu: `${CDN}/restaurants/restaurant-8c7cf561-5f54-4c35-94cc-5cb421938598-1.jpg`,
  restaurantSushi: `${CDN}/restaurants/restaurant-bc06d687-fdca-4387-82bf-3d5f815057a3-1.jpg`,
};

export const nav = [
  {
    label: "Guides",
    href: "/guides",
    feature: {
      eyebrow: "Featured guide",
      title: "Your first visit to Victoria Falls",
      text: "Everything you need to know before you arrive.",
      href: "/guides/complete-guide-to-victoria-falls",
      image: images.hero,
    },
    links: [
      { label: "First time in Victoria Falls", href: "/guides/complete-guide-to-victoria-falls" },
      { label: "When to visit", href: "/guides/when-to-visit" },
      { label: "How long to stay", href: "/guides/complete-guide-to-victoria-falls#how-long" },
      { label: "Victoria Falls travel tips", href: "/guides/complete-guide-to-victoria-falls#tips" },
      { label: "Frequently asked questions", href: "/faq" },
    ],
  },
  {
    label: "Things to do",
    href: "/things-to-do",
    feature: {
      eyebrow: "Featured experience",
      title: "Find your kind of adventure",
      text: "From the rainforest to the Zambezi, discover experiences that suit your trip.",
      href: "/things-to-do",
      image: images.helicopter,
    },
    links: [
      { label: "All experiences", href: "/things-to-do" },
      { label: "Adventure activities", href: "/things-to-do?category=Adventure" },
      { label: "Wildlife & nature", href: "/things-to-do?category=Wildlife" },
      { label: "River experiences", href: "/things-to-do?category=River" },
      { label: "Cultural experiences", href: "/things-to-do?category=Culture" },
      { label: "Day trips", href: "/things-to-do?category=Day%20trip" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    plain: true,
    feature: {
      eyebrow: "Verified listings only",
      title: "What's happening in Victoria Falls?",
      text: "We publish events once dates and details have been confirmed.",
      href: "/events",
      image: images.themeCulture,
    },
    links: [
      { label: "Upcoming events", href: "/events" },
      { label: "Cultural events", href: "/events#cultural" },
      { label: "Festivals & celebrations", href: "/events#festivals" },
      { label: "Seasonal experiences", href: "/events#seasonal" },
    ],
  },
  {
    label: "Travel",
    href: "/travel",
    feature: {
      eyebrow: "Plan your journey",
      title: "Arrive with confidence",
      text: "Understand your transport options and border requirements before you travel.",
      href: "/travel",
      image: images.bridge,
    },
    links: [
      { label: "Getting here", href: "/travel#getting-here" },
      { label: "Airport transfers", href: "/travel#transfers" },
      { label: "Getting around", href: "/travel#getting-around" },
      { label: "Border & visa information", href: "/travel#border" },
      { label: "Practical travel information", href: "/travel#practical" },
    ],
  },
  {
    label: "Eat",
    href: "/restaurants",
    feature: {
      eyebrow: "Taste of Victoria Falls",
      title: "A taste of Victoria Falls",
      text: "Discover places to eat, from local favourites to special dining experiences.",
      href: "/restaurants",
      image: images.restaurantLookout,
    },
    links: [
      { label: "Restaurants", href: "/restaurants" },
      { label: "Cafés", href: "/restaurants?type=Caf%C3%A9" },
      { label: "Local cuisine", href: "/restaurants?type=Local" },
      { label: "Fine dining", href: "/restaurants?type=Fine%20dining" },
      { label: "Dining experiences", href: "/restaurants#experiences" },
    ],
  },
  {
    label: "Stay",
    href: "/places-to-stay",
    feature: {
      eyebrow: "Find your place",
      title: "Stay somewhere that feels right",
      text: "Explore accommodation for different budgets, travel styles and occasions.",
      href: "/places-to-stay",
      image: images.restaurantBeachHouse,
    },
    links: [
      { label: "All accommodation", href: "/places-to-stay" },
      { label: "Hotels", href: "/places-to-stay?type=Hotel" },
      { label: "Lodges", href: "/places-to-stay?type=Lodge" },
      { label: "Guesthouses", href: "/places-to-stay?type=Guesthouse" },
      { label: "Boutique stays", href: "/places-to-stay?type=Boutique" },
    ],
  },
  {
    label: "Interests",
    href: "/interests",
    feature: {
      eyebrow: "Travel your way",
      title: "Start with what you love",
      text: "Adventure, wildlife, culture, food and slower escapes.",
      href: "/interests",
      image: images.themeNature,
    },
    links: [
      { label: "Adventure", href: "/interests/adventure" },
      { label: "Wildlife", href: "/interests/wildlife" },
      { label: "Nature", href: "/interests/nature" },
      { label: "Culture & heritage", href: "/interests/culture" },
      { label: "Food & dining", href: "/interests/food" },
      { label: "Family travel", href: "/interests/family" },
      { label: "Relaxation", href: "/interests/relaxation" },
      { label: "Luxury experiences", href: "/interests/luxury" },
    ],
  },
  {
    label: "Explore",
    href: "/explore",
    feature: {
      eyebrow: "Go further",
      title: "Beyond the Falls",
      text: "Local businesses, places and suggested itineraries.",
      href: "/explore",
      image: images.fallsCity,
    },
    links: [
      { label: "Discover Victoria Falls", href: "/explore" },
      { label: "Local businesses", href: "/businesses" },
      { label: "Places & attractions", href: "/landmarks" },
      { label: "Suggested itineraries", href: "/itineraries" },
      { label: "AI trip planner", href: "/plan" },
      { label: "About Visit Victoria Falls", href: "/about" },
    ],
  },
];

export const experiences = [
  {
    slug: "helicopter-flights",
    title: "Helicopter flights over the Falls",
    category: "Adventure",
    image: images.helicopter,
    blurb:
      "See the full width of the Falls and the Zambezi gorge from above, with the mist rising below you.",
    duration: "13–25 minutes",
    area: "Victoria Falls town and the Falls",
    bestFor: "First-time visitors, photographers",
    summary:
      "Aerial flights are one of the clearest ways to understand the scale of Victoria Falls. Flights typically depart from a helipad near town and follow the line of the gorge. Duration and routing vary by operator and by the flight option you choose.",
    includes: ["Aerial views of the Falls and gorge", "Safety briefing", "Operator transfer arrangements where offered"],
    goodToKnow: [
      "Weight limits and seating arrangements are set by the operator.",
      "Weather and visibility can affect departure times.",
      "Confirm the flight path, duration and price directly with the operator before paying.",
    ],
    related: ["rainforest-walk", "sunset-cruise", "bridge-walk"],
  },
  {
    slug: "zambezi-sunset-cruise",
    title: "Zambezi sunset cruise",
    category: "River",
    image: images.sunsetCruise,
    blurb:
      "Drift upstream as the light changes over the river, with wildlife on the banks and the sound of the bush around you.",
    duration: "About 2 hours",
    area: "Zambezi River, upstream of the Falls",
    bestFor: "Couples, families, slow evenings",
    summary:
      "Sunset cruises run on the Zambezi upstream of Victoria Falls, where the river is calm and the wildlife is easier to see. Boats vary from small vessels to larger cruise boats, and some departures include drinks and snacks. Confirm exactly what is included with the operator.",
    includes: ["River cruise", "Drinks or snacks where specified by the operator", "Wildlife viewing from the water"],
    goodToKnow: [
      "Departure times move with the sunset through the year.",
      "Bring a layer for the evening and insect protection.",
      "Confirm the meeting point, boarding time and inclusions before booking.",
    ],
    related: ["dinner-cruise", "game-drive", "devils-pool"],
  },
  {
    slug: "devils-pool",
    title: "Devil's Pool & Livingstone Island",
    category: "Adventure",
    image: images.devilsPool,
    blurb:
      "A guided visit to Livingstone Island and the natural rock pool at the lip of the Falls, when river conditions allow.",
    duration: "Half day",
    area: "Livingstone Island, on the Zambian side",
    bestFor: "Confident swimmers, thrill seekers",
    summary:
      "Devil's Pool sits in the rock lip of Victoria Falls on the Zambian side. Access is by guided boat and on foot from Livingstone Island, and the experience is only possible at certain water levels. The operator decides whether conditions are safe on the day.",
    includes: ["Guided boat crossing and island visit", "Safety guidance from the operator", "Access subject to river conditions"],
    goodToKnow: [
      "This is a seasonal experience, not available at high water.",
      "You will need to cross a border, so check your visa and passport requirements.",
      "Never attempt to reach the pool without an authorised guide.",
    ],
    related: ["helicopter-flights", "rainforest-walk", "bungee-jump"],
  },
  {
    slug: "bungee-jump",
    title: "Victoria Falls Bridge bungee jump",
    category: "Adventure",
    image: images.bungee,
    blurb:
      "A 111-metre jump from the Victoria Falls Bridge, above the gorge where the Zambezi leaves the Falls.",
    duration: "Allow 1–2 hours",
    area: "Victoria Falls Bridge",
    bestFor: "Adrenaline seekers",
    summary:
      "The bungee jump operates from the Victoria Falls Bridge, which links Zimbabwe and Zambia. Jumpers are briefed and harnessed by the operator before the jump. Spectators can usually watch from the bridge area, subject to access rules.",
    includes: ["Safety briefing and harness", "Jump from the bridge", "Operator-issued certificate or media where offered"],
    goodToKnow: [
      "Age, weight and health restrictions apply and are set by the operator.",
      "The bridge is a border crossing point; carry your passport.",
      "Check operating times and availability directly with the operator.",
    ],
    related: ["bridge-walk", "helicopter-flights", "devils-pool"],
  },
  {
    slug: "bridge-walk",
    title: "Bridge walk & border viewpoints",
    category: "Culture",
    image: images.bridge,
    blurb:
      "Walk the Victoria Falls Bridge, learn how it was built and look back along the gorge towards the Falls.",
    duration: "1–2 hours",
    area: "Victoria Falls Bridge",
    bestFor: "History, architecture, photography",
    summary:
      "The Victoria Falls Bridge was completed in 1905 as part of Cecil Rhodes's Cape-to-Cairo railway vision. Walking the bridge gives you a different view of the Falls and the gorge. The bridge is an active border crossing, so access can be affected by immigration and security arrangements.",
    includes: ["Guided or self-guided bridge walk", "Gorge and Falls viewpoints", "Historical context"],
    goodToKnow: [
      "Carry identification; the bridge connects two countries.",
      "The bridge is exposed to sun, wind and spray.",
      "Check current access arrangements before you set out.",
    ],
    related: ["bungee-jump", "rainforest-walk", "historical-victoria-falls"],
  },
  {
    slug: "rainforest-walk",
    title: "Rainforest & Falls viewpoints",
    category: "Nature",
    image: images.hero,
    blurb:
      "Follow the rainforest trails on the Zimbabwe side for close-range views of the Falls and the spray forest.",
    duration: "2–3 hours",
    area: "Victoria Falls National Park",
    bestFor: "Everyone, especially first-time visitors",
    summary:
      "The rainforest on the Zimbabwe side offers a sequence of viewpoints along the face of the Falls. The path is generally walkable but can be wet and slippery, particularly during high water. Allow time to stop at the viewpoints rather than rushing through.",
    includes: ["Access to the rainforest trails and viewpoints", "Close-range views of the Falls", "Interpretive signage along the route"],
    goodToKnow: [
      "Bring protection for cameras and phones; spray can be heavy.",
      "Wear shoes with grip and expect wet paths.",
      "Park fees and opening times are set by the park authority.",
    ],
    related: ["helicopter-flights", "devils-pool", "bridge-walk"],
  },
  {
    slug: "game-drive",
    title: "Victoria Falls game drive",
    category: "Wildlife",
    image: images.gameDrive,
    blurb:
      "Head out of town into the surrounding bush for a guided drive in search of wildlife.",
    duration: "3 hours or half day",
    area: "Private concessions and national park areas near Victoria Falls",
    bestFor: "Wildlife lovers, families",
    summary:
      "Game drives from Victoria Falls usually take place in private concessions or national park areas close to town. What you see depends on the season, the area and the time of day. Morning and late-afternoon drives are common.",
    includes: ["Guided game drive", "Park or concession fees where specified", "Vehicle and guide"],
    goodToKnow: [
      "Wildlife sightings are never guaranteed.",
      "Bring binoculars, sun protection and a warm layer for early starts.",
      "Confirm the area visited, vehicle type and inclusions with the operator.",
    ],
    related: ["zambezi-safari", "chobe-day-trip", "community-safari"],
  },
  {
    slug: "zambezi-safari",
    title: "Zambezi National Park safari",
    category: "Wildlife",
    image: images.zambeziSafari,
    blurb:
      "Explore the Zambezi National Park, where the river, floodplain and teak woodland meet.",
    duration: "Half or full day",
    area: "Zambezi National Park",
    bestFor: "Wildlife, birds, photography",
    summary:
      "Zambezi National Park stretches along the river upstream of Victoria Falls. Habitats include riverine forest, floodplain and woodland, which support a range of wildlife and birdlife. Drives can often be combined with a river activity.",
    includes: ["Guided safari in the national park", "Park fees where specified", "Game-viewing vehicle"],
    goodToKnow: [
      "Check park fees and opening times with the operator or park authority.",
      "Bring layers for early mornings and dust protection.",
      "Sightings and routes depend on conditions on the day.",
    ],
    related: ["game-drive", "sunset-cruise", "chobe-day-trip"],
  },
  {
    slug: "chobe-day-trip",
    title: "Chobe day trip from Victoria Falls",
    category: "Day trip",
    image: images.chobe,
    blurb:
      "Cross into Botswana for a full-day safari in Chobe National Park, combining a river cruise and a game drive.",
    duration: "Full day",
    area: "Chobe National Park, Botswana",
    bestFor: "Wildlife and a second country in one trip",
    summary:
      "A Chobe day trip typically includes road transfer to the border, a river cruise and a game drive in Chobe National Park. Border formalities and park fees are part of the day, so confirm what is included and what you need to carry.",
    includes: ["Cross-border transfers where specified", "River cruise and game drive components", "Park fees where specified"],
    goodToKnow: [
      "Carry your passport and check visa requirements for Botswana.",
      "The day is long; expect early departures and late returns.",
      "Confirm inclusions, border costs and pickup times with the operator.",
    ],
    related: ["game-drive", "zambezi-safari", "helicopter-flights"],
  },
  {
    slug: "community-safari",
    title: "Community & wildlife safari",
    category: "Culture",
    image: images.community,
    blurb:
      "Spend time with local communities and learn how conservation and tourism connect around Victoria Falls.",
    duration: "Half or full day",
    area: "Communities around Victoria Falls",
    bestFor: "Travellers interested in local life and conservation",
    summary:
      "Community-focused experiences vary widely. Some combine a village visit with a wildlife activity; others focus on a local project or enterprise. Ask the operator how the visit works, who benefits and what is appropriate to bring or buy.",
    includes: ["Guided community visit", "Local host or guide", "Activity components as specified"],
    goodToKnow: [
      "Ask before photographing people or entering private spaces.",
      "Buy locally made crafts directly where possible.",
      "Confirm how the experience supports the community you visit.",
    ],
    related: ["game-drive", "historical-victoria-falls", "bridge-walk"],
  },
  {
    slug: "airport-transfers",
    title: "Victoria Falls airport transfers",
    category: "Travel",
    image: images.transfers,
    blurb:
      "Arrange a transfer between Victoria Falls Airport and your accommodation before you arrive.",
    duration: "Varies by property",
    area: "Victoria Falls Airport and town",
    bestFor: "All arrivals",
    summary:
      "Victoria Falls Airport is a short drive from most accommodation in town. Transfers can usually be arranged through your property or a local operator. Confirm whether the driver will meet you in arrivals and what happens if your flight is delayed.",
    includes: ["Airport pickup and drop-off", "Vehicle and driver", "Luggage space as specified"],
    goodToKnow: [
      "Share your flight number and arrival time with the provider.",
      "Confirm the meeting point and a contact number before you fly.",
      "Check whether tolls, park fees or waiting time are included.",
    ],
    related: ["helicopter-flights", "sunset-cruise", "rainforest-walk"],
  },
  {
    slug: "dinner-cruise",
    title: "Dinner cruise on the Zambezi",
    category: "Food",
    image: images.sunsetGuide,
    blurb:
      "An evening on the river with dinner served on board, after the daytime heat has eased.",
    duration: "2–3 hours",
    area: "Zambezi River",
    bestFor: "Couples, celebrations",
    summary:
      "Dinner cruises combine a river crossing with a meal on board. Menus, departure points and what is included vary by operator. Confirm dietary requirements and the exact boarding time when you book.",
    includes: ["Evening river cruise", "Dinner as specified by the operator", "Drinks where specified"],
    goodToKnow: [
      "Tell the operator about allergies or dietary requirements in advance.",
      "Confirm whether drinks are included or charged separately.",
      "Evenings on the river can be cool; bring a layer.",
    ],
    related: ["zambezi-sunset-cruise", "restaurants", "game-drive"],
  },
];

export const stays = [
  {
    slug: "zambezi-sands-by-batoka",
    name: "Zambezi Sands by Batoka",
    type: "Lodge",
    area: "Zambezi River",
    image: `${CDN}/accommodation/zambezi-sands-by-batoka.jpg`,
    blurb:
      "A riverfront lodge west of Victoria Falls, with tented suites and views over the Zambezi.",
    goodFor: "Couples, quiet stays, river views",
    note: "Rates, availability and inclusions are set by the property.",
  },
  {
    slug: "victoria-falls-river-lodge",
    name: "Victoria Falls River Lodge",
    type: "Lodge",
    area: "Zambezi River",
    image: `${CDN}/accommodation/victoria-falls-river-lodge.jpg`,
    blurb:
      "A riverside lodge on the Zimbabwe bank, positioned for sunsets and wildlife along the water.",
    goodFor: "Couples, families, safari-style stays",
    note: "Confirm transfers, meal plans and park fees with the lodge.",
  },
  {
    slug: "sian-simba-river-lodge",
    name: "Sian Simba River Lodge",
    type: "Lodge",
    area: "Zambezi River",
    image: `${CDN}/accommodation/sian-simba-river-lodge-hero.jpg`,
    blurb:
      "A small river lodge with a relaxed setting upstream from the Falls.",
    goodFor: "Quiet stays, small groups",
    note: "Confirm rates and what is included directly with the property.",
  },
  {
    slug: "parrot-lodge",
    name: "Parrot Lodge",
    type: "Guesthouse",
    area: "Victoria Falls town",
    image: `${CDN}/accommodation/parrot-lodge.jpg`,
    blurb:
      "A long-established lodge in a quiet residential area of Victoria Falls town.",
    goodFor: "Value, gardens, local access",
    note: "Room types and rates vary; confirm with the property.",
  },
  {
    slug: "the-victorian-manor",
    name: "The Victorian Manor",
    type: "Boutique",
    area: "Victoria Falls town",
    image: `${CDN}/accommodation/the-victorian-manor.jpg`,
    blurb:
      "A small guesthouse with period character and a central location.",
    goodFor: "Couples, character stays",
    note: "Confirm availability and inclusions with the property.",
  },
  {
    slug: "inn-on-lichfield-lane",
    name: "Inn on Lichfield Lane",
    type: "Guesthouse",
    area: "Victoria Falls town",
    image: `${CDN}/accommodation/inn-on-lichfield-lane-1766210204239.jpg`,
    blurb:
      "A compact guesthouse in town, suited to travellers who want a simple base near restaurants.",
    goodFor: "Short stays, independent travellers",
    note: "Check current room details and rates with the property.",
  },
  {
    slug: "the-gray-luxury-apartments",
    name: "The Gray Luxury Apartments",
    type: "Apartment",
    area: "Victoria Falls town",
    image: `${CDN}/accommodation/the-gray-luxury-apartments.jpg`,
    blurb:
      "Self-catering apartments for travellers who prefer space and their own routine.",
    goodFor: "Families, longer stays, groups",
    note: "Confirm apartment size, facilities and minimum stays.",
  },
  {
    slug: "batonka-guest-lodge",
    name: "Batonka Guest Lodge",
    type: "Guesthouse",
    area: "Victoria Falls town",
    image: `${CDN}/accommodation/batonka-guest-lodge.jpg`,
    blurb:
      "A boutique guest lodge in a garden setting, within easy reach of town.",
    goodFor: "Couples, quiet stays",
    note: "Rates and meal options are set by the property.",
  },
  {
    slug: "shongwe-oasis",
    name: "Shongwe Oasis",
    type: "Boutique",
    area: "Victoria Falls town",
    image: `${CDN}/accommodation/shongwe-oasis.jpg`,
    blurb:
      "A small, design-led property with a focus on calm spaces between activities.",
    goodFor: "Couples, rest days",
    note: "Confirm current facilities and availability with the property.",
  },
];

export const restaurants = [
  {
    slug: "the-lookout-cafe",
    name: "The Lookout Café",
    type: "Café",
    area: "Zambezi gorge",
    image: images.restaurantLookout,
    blurb:
      "A café positioned above the gorge, useful for a meal between activities on the river side of town.",
    note: "Opening hours and menus change; confirm before you go.",
  },
  {
    slug: "baines-restaurant",
    name: "Baines Restaurant",
    type: "Fine dining",
    area: "Victoria Falls",
    image: images.restaurantBaines,
    blurb:
      "A restaurant setting for a slower meal, suited to evenings when you want something more considered.",
    note: "Check current opening times and booking arrangements.",
  },
  {
    slug: "beach-house",
    name: "Beach House",
    type: "Local",
    area: "Victoria Falls",
    image: images.restaurantBeachHouse,
    blurb:
      "A relaxed riverside-style setting for long lunches and informal meals.",
    note: "Confirm the current menu and hours with the restaurant.",
  },
  {
    slug: "garden-bistro",
    name: "Garden Bistro",
    type: "Café",
    area: "Victoria Falls",
    image: images.restaurantGarden,
    blurb:
      "A garden setting for breakfast, coffee or a light meal away from the busiest hours.",
    note: "Hours vary by season; check before visiting.",
  },
  {
    slug: "marula-cafe",
    name: "Marula Café",
    type: "Café",
    area: "Victoria Falls",
    image: images.restaurantMarula,
    blurb:
      "A café stop for coffee and a break between exploring town and the Falls.",
    note: "Confirm current hours and menu directly.",
  },
  {
    slug: "roosters-pub-grill",
    name: "Roosters Pub & Grill",
    type: "Local",
    area: "Victoria Falls",
    image: images.restaurantRoosters,
    blurb:
      "An informal pub and grill for a straightforward meal and a drink.",
    note: "Check opening hours and current menu with the venue.",
  },
  {
    slug: "zulu-bistro-bar",
    name: "Zulu Bistro Bar",
    type: "Fine dining",
    area: "Victoria Falls",
    image: images.restaurantZulu,
    blurb:
      "A bistro and bar for an evening meal in town.",
    note: "Confirm booking arrangements and hours directly.",
  },
  {
    slug: "active-sushi-victoria-falls",
    name: "Active Sushi Victoria Falls",
    type: "Local",
    area: "Victoria Falls",
    image: images.restaurantSushi,
    blurb:
      "A sushi option in town when you want something different from the usual lodge menu.",
    note: "Check current hours and menu with the restaurant.",
  },
];

export const guides = [
  {
    slug: "complete-guide-to-victoria-falls",
    title: "The complete guide to Victoria Falls",
    excerpt:
      "What to see, how to plan your days and what to confirm before you arrive.",
    category: "First visit",
    image: images.hero,
    readTime: "9 min read",
    updated: "October 2026",
    intro:
      "Victoria Falls is a small town beside an enormous natural feature. The Falls themselves are the centre of most visits, but the surrounding river, rainforest, gorge and bush are what turn a day trip into a stay. This guide sets out the practical shape of a visit without pretending that conditions, prices or availability are fixed.",
    sections: [
      {
        id: "the-falls",
        heading: "The Falls and the rainforest",
        body: [
          "Mosi-oa-Tunya — the Smoke That Thunders — is the local name for the Falls. The Zimbabwe side looks across the width of the waterfall, with a series of viewpoints through rainforest that is kept alive by the spray.",
          "The walk through the rainforest is not a single viewpoint. It is a sequence of stops, and the experience changes with the water level. At high water the spray can be intense; at low water more of the rock face is visible.",
        ],
        list: [
          "Allow two to three hours for the rainforest and viewpoints.",
          "Wear shoes with grip; paths can be wet and slippery.",
          "Protect cameras and phones from spray.",
        ],
      },
      {
        id: "beyond",
        heading: "Beyond the Falls",
        body: [
          "The Zambezi above the Falls is calm enough for cruises and wildlife watching. Below the Falls, the gorge creates the settings for the bridge, bungee and gorge activities.",
          "A good visit usually mixes one close-range experience of the Falls with one river or wildlife experience, and leaves space for the town itself.",
        ],
        list: [
          "River cruises are best in the late afternoon.",
          "Game drives work well early in the morning.",
          "Helicopter flights are often clearest earlier in the day.",
        ],
      },
      {
        id: "how-long",
        heading: "How long should you stay?",
        body: [
          "Two nights gives you one full day at the Falls and one activity. Three or four nights lets you add a river cruise, a game drive or a day trip without rushing. Stays of a week or more suit travellers combining Victoria Falls with Hwange, Chobe or Lake Kariba.",
          "If you are crossing borders for a day trip, build in time for immigration and check your visa arrangements in advance.",
        ],
      },
      {
        id: "booking",
        heading: "What to confirm before you book",
        body: [
          "This platform helps you discover experiences and contact providers. It does not process bookings or hold availability.",
          "Before paying any provider, confirm the date, start time, meeting point, duration, inclusions, cancellation terms and the total price. Ask what happens if weather or river conditions change the plan.",
        ],
        list: [
          "Is the price per person and does it include park or border fees?",
          "What is the cancellation and refund policy?",
          "Is hotel pickup included, and at what time?",
          "Are there age, weight or health restrictions?",
        ],
      },
      {
        id: "tips",
        heading: "Practical travel tips",
        body: [
          "Victoria Falls has a dry season and a wet season, and the character of a visit changes with both. The town is walkable in parts, but many lodges sit outside the centre, so plan transfers.",
          "Carry small amounts of local currency and a card, keep copies of your passport, and use reputable operators for activities.",
        ],
        list: [
          "Bring sun protection, insect repellent and a refillable water bottle.",
          "A light rain layer is useful even outside the wet season.",
          "Check your mobile roaming arrangements or buy a local SIM.",
        ],
      },
    ],
    related: ["when-to-visit", "helicopter-tours", "devils-pool-safety"],
  },
  {
    slug: "when-to-visit",
    title: "When to visit Victoria Falls",
    excerpt:
      "How the seasons change the Falls, the river and the experiences available.",
    category: "Planning",
    image: images.seasons,
    readTime: "6 min read",
    updated: "October 2026",
    intro:
      "There is no single best time to visit Victoria Falls. The water level, the heat, the vegetation and the activities available all shift through the year. The right month depends on whether you want maximum spray, low-water activities or quieter conditions.",
    sections: [
      {
        id: "high-water",
        heading: "High water: roughly February to May",
        body: [
          "After the summer rains, the Zambezi carries more water and the Falls are at their most forceful. Spray can rise high above the gorge and the rainforest becomes lush.",
          "The trade-off is visibility. At peak flow, spray can obscure parts of the Falls, and some river activities may be affected by water levels.",
        ],
      },
      {
        id: "low-water",
        heading: "Low water: roughly September to December",
        body: [
          "Lower water exposes more of the rock face and creates different viewpoints. Some activities that depend on water levels, such as Devil's Pool, may be available only in this window.",
          "It is also the hotter, drier part of the year. Plan outdoor activity for the morning and late afternoon.",
        ],
      },
      {
        id: "shoulder",
        heading: "Shoulder months: June to August",
        body: [
          "The middle of the year often brings clear days, cooler evenings and a balance between flow and visibility. It is also a popular time, so book accommodation and activities earlier.",
          "Mornings and evenings can be cold enough for a jacket, especially on the river.",
        ],
      },
      {
        id: "wildlife",
        heading: "Wildlife and birding",
        body: [
          "Wildlife viewing in the region is generally better in the dry months, when animals concentrate around water. Birders see different species at different times of year, including migratory birds in the wet season.",
        ],
      },
    ],
    related: ["complete-guide-to-victoria-falls", "zambezi-sunset-cruise", "game-drive"],
  },
  {
    slug: "helicopter-tours",
    title: "Helicopter flights: how to choose",
    excerpt: "Flight lengths, what you see and the questions to ask before you book.",
    category: "Experiences",
    image: images.helicopter,
    readTime: "5 min read",
    updated: "October 2026",
    intro:
      "A helicopter flight is the fastest way to understand the scale of Victoria Falls. But not every flight is the same. Duration, route, aircraft and departure point all vary, and so does the price.",
    sections: [
      {
        id: "length",
        heading: "Flight length",
        body: [
          "Short flights typically cover the Falls and the gorge. Longer flights can extend over the Zambezi, the national park or the surrounding concessions. Ask for the actual flight time rather than the total time including briefing and transfers.",
        ],
      },
      {
        id: "route",
        heading: "Route and views",
        body: [
          "Ask which side of the aircraft you will sit on and how the operator rotates passengers. The view from the front and rear seats differs, and good operators manage this fairly.",
        ],
      },
      {
        id: "questions",
        heading: "Questions to ask",
        body: [
          "Confirm the total price, weight limits, luggage restrictions, weather policy and what happens if a flight is cancelled. If photography matters to you, ask about doors-off options and whether they are available on the day.",
        ],
        list: [
          "What is the actual airborne time?",
          "Are park fees or levies included?",
          "What is the cancellation policy for weather?",
          "Is hotel pickup included?",
        ],
      },
    ],
    related: ["complete-guide-to-victoria-falls", "when-to-visit", "devils-pool-safety"],
  },
  {
    slug: "sunset-cruise-guide",
    title: "Choosing a Zambezi sunset cruise",
    excerpt: "Boat size, timing and what to check before you book an evening on the river.",
    category: "Experiences",
    image: images.sunsetCruise,
    readTime: "5 min read",
    updated: "October 2026",
    intro:
      "A sunset cruise is one of the simplest pleasures of a Victoria Falls visit. The variation between boats is bigger than it looks, so it is worth choosing deliberately.",
    sections: [
      {
        id: "boats",
        heading: "Boat size and atmosphere",
        body: [
          "Small boats feel more private and can get closer to the banks. Larger cruise boats offer more space and sometimes live music or a set menu. Neither is better; they suit different evenings.",
        ],
      },
      {
        id: "inclusions",
        heading: "What is included",
        body: [
          "Some cruises include drinks and snacks, others charge on board. Confirm whether national park fees are included and whether there is a cash bar.",
        ],
      },
      {
        id: "timing",
        heading: "Timing and seasons",
        body: [
          "Departure times shift with sunset. In the cooler months, bring a layer. In the hotter months, the cruise is a comfortable way to end the day.",
        ],
        list: [
          "Ask for the boarding time, not just the departure time.",
          "Confirm the meeting point and return time.",
          "Check whether children are permitted and at what age.",
        ],
      },
    ],
    related: ["when-to-visit", "complete-guide-to-victoria-falls", "dinner-cruise"],
  },
  {
    slug: "bungee-jump-guide",
    title: "The Victoria Falls bungee jump",
    excerpt: "What the jump involves, who can do it and what to confirm.",
    category: "Adventure",
    image: images.bungee,
    readTime: "4 min read",
    updated: "October 2026",
    intro:
      "The bungee jump from the Victoria Falls Bridge is one of the best-known adventure activities at the Falls. It is short, highly weather-dependent and governed by operator safety rules.",
    sections: [
      {
        id: "what",
        heading: "What happens",
        body: [
          "You are briefed, weighed and harnessed before jumping from the bridge above the gorge. The jump itself is brief; the waiting and preparation take longer.",
        ],
      },
      {
        id: "rules",
        heading: "Restrictions",
        body: [
          "Operators set age, weight and health restrictions. If you have a medical condition, check with the operator and your doctor before booking. Pregnant travellers should not jump.",
        ],
      },
      {
        id: "border",
        heading: "The border factor",
        body: [
          "The bridge is a border crossing between Zimbabwe and Zambia. Carry your passport and allow time for immigration if you are moving between countries.",
        ],
        list: [
          "Confirm the operating days and weather policy.",
          "Ask what photo or video options are available.",
          "Wear secure footwear and remove loose items.",
        ],
      },
    ],
    related: ["bridge-walk", "complete-guide-to-victoria-falls", "helicopter-tours"],
  },
  {
    slug: "devils-pool-safety",
    title: "Devil's Pool: safety and seasons",
    excerpt: "How the experience works, when it runs and why conditions decide.",
    category: "Adventure",
    image: images.devilsPool,
    readTime: "5 min read",
    updated: "October 2026",
    intro:
      "Devil's Pool is a natural rock pool at the lip of the Falls on the Zambian side. It is a guided, seasonal experience, and it is not appropriate for everyone.",
    sections: [
      {
        id: "access",
        heading: "How access works",
        body: [
          "Visitors reach Livingstone Island by boat with an authorised operator, then walk to the pool. Guides assess the water level and flow before allowing anyone into the pool.",
        ],
      },
      {
        id: "season",
        heading: "When it is possible",
        body: [
          "The pool is generally accessible in the lower-water months, but the exact window changes with the river. Never assume it will be open on a specific date; ask the operator.",
        ],
      },
      {
        id: "safety",
        heading: "Safety",
        body: [
          "Follow the guide's instructions exactly. Do not swim beyond the marked area, and do not enter the water if you are not a confident swimmer. The experience involves a border crossing, so carry your passport.",
        ],
        list: [
          "Book only with an authorised operator.",
          "Check your visa position for Zambia.",
          "Expect the plan to change if river conditions are unsuitable.",
        ],
      },
    ],
    related: ["helicopter-tours", "complete-guide-to-victoria-falls", "when-to-visit"],
  },
  {
    slug: "bridge-walk-guide",
    title: "Walking the Victoria Falls Bridge",
    excerpt: "History, viewpoints and the practicalities of a border bridge.",
    category: "Culture",
    image: images.bridge,
    readTime: "4 min read",
    updated: "October 2026",
    intro:
      "The Victoria Falls Bridge is both an engineering landmark and a working border crossing. Walking it gives you a view of the gorge that you cannot get from the rainforest.",
    sections: [
      {
        id: "history",
        heading: "A short history",
        body: [
          "Completed in 1905, the bridge was built as part of the Cape-to-Cairo railway project. It spans the Second Gorge just below the Falls.",
        ],
      },
      {
        id: "walk",
        heading: "The walk",
        body: [
          "The walk is exposed, with traffic and pedestrians sharing the bridge. Stay within the pedestrian area and follow any instructions from officials.",
        ],
      },
      {
        id: "practical",
        heading: "Practical notes",
        body: [
          "Carry identification and check current access arrangements. The bridge connects two countries, and immigration formalities apply if you cross.",
        ],
      },
    ],
    related: ["bungee-jump-guide", "complete-guide-to-victoria-falls", "historical-victoria-falls"],
  },
  {
    slug: "historical-victoria-falls",
    title: "Victoria Falls: history and local context",
    excerpt: "The railway, the town and the people who shaped the destination.",
    category: "Culture",
    image: images.themeArt,
    readTime: "6 min read",
    updated: "October 2026",
    intro:
      "The Falls are geological; the town is historical. Understanding a little of both makes the place richer.",
    sections: [
      {
        id: "geology",
        heading: "The geology",
        body: [
          "The Falls formed where the Zambezi crosses a series of basalt fractures, creating a waterfall that has shifted upstream over geological time. The zigzag of gorges downstream records those earlier positions.",
        ],
      },
      {
        id: "town",
        heading: "The town",
        body: [
          "Victoria Falls town grew around the railway and the bridge. Its layout still reflects that history, with the old village and the later tourism development sitting in different parts of town.",
        ],
      },
      {
        id: "people",
        heading: "Local context",
        body: [
          "The area is home to communities whose lives and livelihoods are connected to the river and to tourism. Visiting with respect, buying locally and asking before taking photographs are small but meaningful choices.",
        ],
      },
    ],
    related: ["bridge-walk-guide", "complete-guide-to-victoria-falls", "community-safari"],
  },
];

export const interests = [
  {
    slug: "adventure",
    name: "Adventure",
    image: images.themeAdventure,
    blurb: "Flights, bungee, gorge activities and days that start early.",
    experiences: ["helicopter-flights", "bungee-jump", "devils-pool"],
  },
  {
    slug: "wildlife",
    name: "Wildlife",
    image: images.themeNature,
    blurb: "Game drives, river safaris and the national park.",
    experiences: ["game-drive", "zambezi-safari", "chobe-day-trip"],
  },
  {
    slug: "nature",
    name: "Nature",
    image: images.hero,
    blurb: "Rainforest, river and the changing face of the Falls.",
    experiences: ["rainforest-walk", "sunset-cruise", "zambezi-safari"],
  },
  {
    slug: "culture",
    name: "Culture & heritage",
    image: images.themeCulture,
    blurb: "Local life, history and the bridge that shaped the town.",
    experiences: ["community-safari", "bridge-walk", "historical-victoria-falls"],
  },
  {
    slug: "food",
    name: "Food & dining",
    image: images.themeFood,
    blurb: "Long lunches, river dinners and places to eat in town.",
    experiences: ["dinner-cruise", "restaurants", "sunset-cruise"],
  },
  {
    slug: "family",
    name: "Family travel",
    image: images.themeFamily,
    blurb: "Experiences that work for different ages and energy levels.",
    experiences: ["rainforest-walk", "game-drive", "sunset-cruise"],
  },
  {
    slug: "relaxation",
    name: "Relaxation",
    image: images.themeWellness,
    blurb: "River time, quiet lodges and unhurried days.",
    experiences: ["sunset-cruise", "dinner-cruise", "rainforest-walk"],
  },
  {
    slug: "luxury",
    name: "Luxury experiences",
    image: images.themeRomance,
    blurb: "Private flights, riverside stays and considered dining.",
    experiences: ["helicopter-flights", "dinner-cruise", "devils-pool"],
  },
];

export const itineraries = [
  {
    slug: "two-days",
    name: "Two days at the Falls",
    duration: "2 days",
    forWho: "A first visit with limited time",
    summary:
      "One day close to the Falls, one day on the river, with room for an evening in town.",
    days: [
      {
        day: 1,
        title: "The Falls and the rainforest",
        items: ["Rainforest walk and viewpoints", "Lunch in town", "Sunset cruise on the Zambezi"],
      },
      {
        day: 2,
        title: "Above the Falls",
        items: ["Helicopter flight in the morning", "Bridge walk or town time", "Dinner at a local restaurant"],
      },
    ],
  },
  {
    slug: "four-days",
    name: "Four days, slower",
    duration: "4 days",
    forWho: "Travellers who want wildlife and river time",
    summary:
      "Adds a game drive and a full day in the bush without losing the Falls themselves.",
    days: [
      {
        day: 1,
        title: "Arrive and settle",
        items: ["Airport transfer", "Rainforest walk in the late afternoon", "Dinner at your lodge"],
      },
      {
        day: 2,
        title: "River and wildlife",
        items: ["Morning game drive", "Afternoon at leisure", "Sunset cruise"],
      },
      {
        day: 3,
        title: "Above and below",
        items: ["Helicopter flight", "Bridge walk", "Free evening in town"],
      },
      {
        day: 4,
        title: "A last morning",
        items: ["Slow breakfast", "Local market or craft shopping", "Transfer to the airport"],
      },
    ],
  },
  {
    slug: "family-week",
    name: "A family week",
    duration: "7 days",
    forWho: "Families with mixed ages",
    summary:
      "Balances active days with rest, and keeps travel times short.",
    days: [
      { day: 1, title: "Arrive", items: ["Transfer", "Pool time", "Early dinner"] },
      { day: 2, title: "The Falls", items: ["Rainforest walk", "Rest at the lodge", "Sunset cruise"] },
      { day: 3, title: "Wildlife", items: ["Game drive", "Afternoon rest", "Casual dinner"] },
      { day: 4, title: "River day", items: ["Slow morning", "River activity", "Free evening"] },
      { day: 5, title: "Culture", items: ["Community experience", "Local lunch", "Craft shopping"] },
      { day: 6, title: "Choice day", items: ["Optional activity", "Pool or spa", "Dinner in town"] },
      { day: 7, title: "Depart", items: ["Breakfast", "Transfer to the airport"] },
    ],
  },
];

export const faqs = [
  {
    q: "Does Visit Victoria Falls take bookings?",
    a: "No. This is a discovery and referral platform. You follow a link to a provider or send an enquiry, and the booking is completed with that business. Prices, availability and booking terms are set by the provider.",
  },
  {
    q: "Are the prices on this site confirmed?",
    a: "We do not publish unverified prices. Where a price or rate is not confirmed, we say so and ask you to check with the provider. Always confirm the total price and what it includes before paying.",
  },
  {
    q: "How do I know a business is legitimate?",
    a: "We list businesses whose details we have reviewed, and we show when information was last checked. We do not use a 'verified partner' badge. You should still confirm registration, insurance and terms directly with the provider.",
  },
  {
    q: "Which side of Victoria Falls should I visit?",
    a: "The Zimbabwe side offers a long sequence of viewpoints across the width of the Falls and the rainforest. The Zambian side offers different viewpoints and access to Livingstone Island. Many travellers visit both, but crossing a border requires a passport and may require a visa.",
  },
  {
    q: "Do I need a visa?",
    a: "Visa rules depend on your nationality and your route. Check the official immigration websites for Zimbabwe and Zambia, and any countries you transit, before you travel. We link to official sources rather than interpreting rules ourselves.",
  },
  {
    q: "Is the AI trip planner making bookings?",
    a: "No. The planner produces a suggested itinerary from the information on this site. It does not check live availability, confirm prices or make reservations.",
  },
];

export const trustPoints = [
  {
    title: "Useful information",
    text: "Destination guides, experience details and practical travel information in one place.",
  },
  {
    title: "Discover local providers",
    text: "Businesses and services with clear information about what they offer and how to contact them.",
  },
  {
    title: "Plan at your own pace",
    text: "Compare experiences, save ideas and use the trip planner to organise a suggested itinerary.",
  },
  {
    title: "Know what you're booking",
    text: "Follow booking links or contact providers directly to confirm prices, availability and arrangements.",
  },
];
