/* ═══════════════════════════════════════════════════════
   See the Unseen — Shared TypeScript Types
   ═══════════════════════════════════════════════════════ */

// ─── Enums & Unions ───────────────────────────────────────

export type Region =
  | "india"
  | "asia"
  | "europe"
  | "middle-east-africa"
  | "americas-oceania";

export type GroupType = "solo" | "couple" | "family" | "group";

export type TourStatus =
  | "draft"
  | "published"
  | "featured"
  | "archived";

export type InquiryStatus =
  | "RECEIVED"
  | "IN_REVIEW"
  | "QUOTE_SENT"
  | "CONFIRMED"
  | "CLOSED";

export type Month =
  | "jan" | "feb" | "mar" | "apr" | "may" | "jun"
  | "jul" | "aug" | "sep" | "oct" | "nov" | "dec";

export type ExperienceTypeSlug =
  | "scenic-escapes"
  | "blue-escapes"
  | "earths-marvels"
  | "family-thrills"
  | "legendary-journeys"
  | "signature-stays"
  | "outdoor-thrills"
  | "festive-getaways"
  | "wellness-reset";

// ─── Sanity Image ─────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// ─── Sanity Slug ──────────────────────────────────────────

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// ─── Portable Text ────────────────────────────────────────

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
};

// ─── Experience Type ──────────────────────────────────────

export interface ExperienceType {
  _id: string;
  _type: "experienceType";
  title: string;
  slug: SanitySlug;
  number: number; // 01–09 display order
  tagline: string;
  heroImage: SanityImage;
  description: PortableTextBlock[];
  subCategories: Array<{
    title: string;
    description: string;
  }>;
  featuredTours?: Tour[];
  brochureFile?: { asset: { _ref: string; url: string } };
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Destination ──────────────────────────────────────────

export interface Destination {
  _id: string;
  _type: "destination";
  title: string;
  slug: SanitySlug;
  region: Region;
  isDomestic: boolean;
  heroImage: SanityImage;
  tagline: string;
  overview: PortableTextBlock[];
  highlights: string[];
  bestTimeToVisit: string;
  guideFile?: { asset: { _ref: string; url: string } };
  relatedTours?: Tour[];
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Itinerary ────────────────────────────────────────────

export interface AccommodationOption {
  tierName: string; // e.g. "Standard", "Deluxe", "Ultra-Luxury"
  starRating: number;
  roomType: string;
  priceSupplement?: number; // INR per person
  locations: Array<{
    city: string;
    hotelName: string;
    nights: number;
  }>;
  notes?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: PortableTextBlock[];
  accommodation: {
    category: string;
    representativeHotels: string[];
    city: string;
  };
}

// ─── Add-on Service ───────────────────────────────────────

export interface AddOnService {
  _id: string;
  _type: "addOnService";
  title: string;
  slug: SanitySlug;
  icon: string;
  shortDescription: string;
  details: PortableTextBlock[];
  sortOrder: number;
}

// ─── Tour ─────────────────────────────────────────────────

export interface Tour {
  _id: string;
  _type: "tour";
  title: string;
  slug: SanitySlug;
  status: TourStatus;
  heroImage: SanityImage;
  gallery?: SanityImage[];
  videoUrl?: string;
  experienceTypes: ExperienceType[];
  destinations: Destination[];
  subCategory?: string;
  duration: number; // days
  groupTypes: GroupType[];
  bestMonths: Month[];
  tags: string[];
  isDomestic: boolean;
  pricePerAdult: number; // INR
  shortDescription: string;
  overview: PortableTextBlock[];
  itinerary: ItineraryDay[];
  accommodationOptions?: AccommodationOption[];
  inclusions: string[];
  exclusions: string[];
  addOns?: AddOnService[];
  importantNotes?: PortableTextBlock[];
  brochureFile?: { asset: { _ref: string; url: string } };
  seoTitle?: string;
  seoDescription?: string;
  sortOrder?: number;
}

// ─── Tour Card (lightweight, for listings) ────────────────

export interface TourCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  heroImage: SanityImage;
  duration: number;
  pricePerAdult: number;
  shortDescription: string;
  experienceTypes: Pick<ExperienceType, "_id" | "title" | "slug">[];
  destinations: Pick<Destination, "_id" | "title" | "slug">[];
  tags: string[];
  isDomestic: boolean;
}

// ─── Blog Post ────────────────────────────────────────────

export type BlogCategory =
  | "destination"
  | "experience-type"
  | "travel-tips"
  | "company-news";

export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: SanitySlug;
  status: "draft" | "published" | "scheduled";
  publishedAt: string;
  scheduledAt?: string;
  author: {
    name: string;
    photo: SanityImage;
    bio: string;
  };
  category: BlogCategory;
  tags: string[];
  relatedDestinations?: Pick<Destination, "_id" | "title" | "slug">[];
  relatedExperienceTypes?: Pick<ExperienceType, "_id" | "title" | "slug">[];
  heroImage: SanityImage;
  excerpt: string;
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
}

// ─── Hero Slide ───────────────────────────────────────────

export interface HeroSlide {
  _key: string;
  image: SanityImage;
  experienceType: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaLink: string;
}

// ─── Site Settings (Sanity singleton) ─────────────────────

export interface SiteSettings {
  _type: "siteSettings";
  featuredTours: TourCard[];
  heroSlides: HeroSlide[];
  announcementBanner?: {
    text: string;
    link: string;
    active: boolean;
  };
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
  };
}

// ─── Inquiry (for form submission) ────────────────────────

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  tourId?: string;
  tourTitle?: string;
  destinationId?: string;
  numAdults: number;
  numChildren: number;
  preferredMonth?: string;
  preferredDates?: string;
  message?: string;
  source?: string;
}

// ─── API Response Wrappers ────────────────────────────────

export interface ApiSuccess<T = unknown> {
  ok: true;
  data: T;
}

export interface ApiError {
  ok: false;
  error: string;
  details?: unknown;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

// ─── Tour Filter State ────────────────────────────────────

export interface TourFilters {
  experienceType?: string;
  destination?: string;
  duration?: { min?: number; max?: number };
  priceRange?: { min?: number; max?: number };
  groupType?: GroupType;
  month?: Month;
  isDomestic?: boolean;
  searchQuery?: string;
  sortBy?: "price-asc" | "price-desc" | "duration-asc" | "featured";
}
