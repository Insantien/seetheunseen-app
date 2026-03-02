/**
 * GROQ queries for Sanity CMS
 * All queries are written to minimise over-fetching.
 */

// ─── Reusable Fragments ──────────────────────────────────

const imageFields = `
  _type,
  asset { _ref, _type },
  alt,
  hotspot
`;

const slugField = `slug { current }`;

const tourCardFields = `
  _id,
  title,
  ${slugField},
  "heroImage": heroImage { ${imageFields} },
  duration,
  pricePerAdult,
  shortDescription,
  isDomestic,
  tags,
  "experienceTypes": experienceTypes[]-> {
    _id, title, ${slugField}
  },
  "destinations": destinations[]-> {
    _id, title, ${slugField}
  }
`;

// ─── Site Settings ────────────────────────────────────────

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    featuredTours[]-> { ${tourCardFields} },
    heroSlides[] {
      _key,
      "image": image { ${imageFields} },
      experienceType,
      headline,
      subheadline,
      ctaLabel,
      ctaLink
    },
    announcementBanner,
    contactPhone,
    contactEmail,
    officeAddress,
    socialLinks
  }
`;

// ─── Tours ────────────────────────────────────────────────

export const ALL_TOURS_QUERY = `
  *[_type == "tour" && status in ["published", "featured"]] | order(sortOrder asc, _createdAt desc) {
    ${tourCardFields}
  }
`;

export const TOUR_BY_SLUG_QUERY = `
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    title,
    ${slugField},
    status,
    "heroImage": heroImage { ${imageFields} },
    "gallery": gallery[] { ${imageFields} },
    videoUrl,
    duration,
    pricePerAdult,
    shortDescription,
    isDomestic,
    tags,
    groupTypes,
    bestMonths,
    "experienceTypes": experienceTypes[]-> { _id, title, ${slugField}, number },
    "destinations": destinations[]-> { _id, title, ${slugField}, region },
    subCategory,
    overview,
    itinerary[] {
      day,
      title,
      description,
      accommodation
    },
    accommodationOptions,
    inclusions,
    exclusions,
    "addOns": addOns[]-> { _id, title, icon, shortDescription },
    importantNotes,
    "brochureFile": brochureFile.asset-> { url },
    seoTitle,
    seoDescription
  }
`;

export const FEATURED_TOURS_QUERY = `
  *[_type == "tour" && status == "featured"] | order(sortOrder asc) [0..7] {
    ${tourCardFields}
  }
`;

export const TOURS_BY_EXPERIENCE_QUERY = `
  *[_type == "tour" && status in ["published", "featured"] && $slug in experienceTypes[]->slug.current]
  | order(sortOrder asc) {
    ${tourCardFields}
  }
`;

export const TOURS_BY_DESTINATION_QUERY = `
  *[_type == "tour" && status in ["published", "featured"] && $slug in destinations[]->slug.current]
  | order(sortOrder asc) {
    ${tourCardFields}
  }
`;

// ─── Destinations ─────────────────────────────────────────

export const ALL_DESTINATIONS_QUERY = `
  *[_type == "destination"] | order(title asc) {
    _id,
    title,
    ${slugField},
    region,
    isDomestic,
    tagline,
    "heroImage": heroImage { ${imageFields} },
    "tourCount": count(*[_type == "tour" && status in ["published","featured"] && ^._id in destinations[]._ref])
  }
`;

export const DESTINATION_BY_SLUG_QUERY = `
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    title,
    ${slugField},
    region,
    isDomestic,
    tagline,
    "heroImage": heroImage { ${imageFields} },
    overview,
    highlights,
    bestTimeToVisit,
    "guideFile": guideFile.asset-> { url },
    seoTitle,
    seoDescription
  }
`;

// ─── Experience Types ─────────────────────────────────────

export const ALL_EXPERIENCE_TYPES_QUERY = `
  *[_type == "experienceType"] | order(number asc) {
    _id,
    title,
    ${slugField},
    number,
    tagline,
    "heroImage": heroImage { ${imageFields} },
    "tourCount": count(*[_type == "tour" && status in ["published","featured"] && ^._id in experienceTypes[]._ref])
  }
`;

export const EXPERIENCE_TYPE_BY_SLUG_QUERY = `
  *[_type == "experienceType" && slug.current == $slug][0] {
    _id,
    title,
    ${slugField},
    number,
    tagline,
    "heroImage": heroImage { ${imageFields} },
    description,
    subCategories,
    "featuredTours": featuredTours[]-> { ${tourCardFields} },
    "brochureFile": brochureFile.asset-> { url },
    seoTitle,
    seoDescription
  }
`;

// ─── Blog ─────────────────────────────────────────────────

export const ALL_BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    ${slugField},
    publishedAt,
    category,
    tags,
    excerpt,
    "heroImage": heroImage { ${imageFields} },
    "author": author { name, "photo": photo { ${imageFields} } }
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    ${slugField},
    publishedAt,
    category,
    tags,
    excerpt,
    body,
    "heroImage": heroImage { ${imageFields} },
    "author": author {
      name,
      bio,
      "photo": photo { ${imageFields} }
    },
    "relatedDestinations": relatedDestinations[]-> { _id, title, ${slugField} },
    "relatedExperienceTypes": relatedExperienceTypes[]-> { _id, title, ${slugField} },
    seoTitle,
    seoDescription,
    "ogImage": ogImage { ${imageFields} }
  }
`;

// ─── Quiz Results ─────────────────────────────────────────

/**
 * Returns tours matching a subset of experience type slugs,
 * ordered by relevance (number of matching types), for quiz results.
 */
export const QUIZ_RESULTS_QUERY = `
  *[_type == "tour" && status in ["published", "featured"] && count(
    experienceTypes[@->slug.current in $experienceSlugs]
  ) > 0] | order(sortOrder asc) [0..11] {
    ${tourCardFields},
    "matchCount": count(experienceTypes[@->slug.current in $experienceSlugs])
  }
`;
