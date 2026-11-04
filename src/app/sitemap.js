import { experiences, stays, restaurants, guides, interests } from "@/data/site";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const staticPaths = [
    "",
    "/guides",
    "/things-to-do",
    "/events",
    "/travel",
    "/restaurants",
    "/places-to-stay",
    "/interests",
    "/explore",
    "/businesses",
    "/landmarks",
    "/itineraries",
    "/plan",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/disclosure",
    "/list-your-business",
  ];

  const dynamicPaths = [
    ...guides.map((item) => `/guides/${item.slug}`),
    ...experiences.map((item) => `/things-to-do/${item.slug}`),
    ...stays.map((item) => `/places-to-stay/${item.slug}`),
    ...restaurants.map((item) => `/restaurants/${item.slug}`),
    ...interests.map((item) => `/interests/${item.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
