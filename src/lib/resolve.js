import { experiences, stays, restaurants, guides, interests } from "@/data/site";

export function findExperience(slug) {
  return experiences.find((item) => item.slug === slug) || null;
}

export function findStay(slug) {
  return stays.find((item) => item.slug === slug) || null;
}

export function findRestaurant(slug) {
  return restaurants.find((item) => item.slug === slug) || null;
}

export function findGuide(slug) {
  return guides.find((item) => item.slug === slug) || null;
}

export function findInterest(slug) {
  return interests.find((item) => item.slug === slug) || null;
}

export function resolveRelated(slug) {
  const experience = findExperience(slug);
  if (experience) {
    return {
      kind: "experience",
      title: experience.title,
      href: `/things-to-do/${experience.slug}`,
      image: experience.image,
      excerpt: experience.blurb,
      meta: experience.duration,
    };
  }

  const guide = findGuide(slug);
  if (guide) {
    return {
      kind: "guide",
      title: guide.title,
      href: `/guides/${guide.slug}`,
      image: guide.image,
      excerpt: guide.excerpt,
      meta: guide.readTime,
    };
  }

  const stay = findStay(slug);
  if (stay) {
    return {
      kind: "stay",
      title: stay.name,
      href: `/places-to-stay/${stay.slug}`,
      image: stay.image,
      excerpt: stay.blurb,
      meta: stay.type,
    };
  }

  const restaurant = findRestaurant(slug);
  if (restaurant) {
    return {
      kind: "restaurant",
      title: restaurant.name,
      href: `/restaurants/${restaurant.slug}`,
      image: restaurant.image,
      excerpt: restaurant.blurb,
      meta: restaurant.type,
    };
  }

  return null;
}

export function uniqueExperiences(slugs = []) {
  return slugs.map(findExperience).filter(Boolean);
}
