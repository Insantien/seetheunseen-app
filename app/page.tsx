/**
 * Homepage — See the Unseen
 * Composes all home section components.
 * Data will be fetched from Sanity CMS when credentials are configured.
 */

import HeroSlider from "@/components/home/HeroSlider";
import TrustBar from "@/components/home/TrustBar";
import ExperienceTypes from "@/components/home/ExperienceTypes";
import FeaturedTours from "@/components/home/FeaturedTours";
import DestinationExplorer from "@/components/home/DestinationExplorer";
import FindJourneyCTA from "@/components/home/FindJourneyCTA";
import WhyUs from "@/components/home/WhyUs";
import Reviews from "@/components/home/Reviews";
import InstagramBlog from "@/components/home/InstagramBlog";
import Newsletter from "@/components/home/Newsletter";
import LeadCapturePopup from "@/components/home/LeadCapturePopup";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Slider — full viewport */}
      <HeroSlider />

      {/* 2. Trust Bar — certifications strip */}
      <TrustBar />

      {/* 3. Experience Types — 9 category grid */}
      <ExperienceTypes />

      {/* 4. Featured Tours — horizontally scrollable cards */}
      <FeaturedTours />

      {/* 5. Destination Explorer — mosaic grid */}
      <DestinationExplorer />

      {/* 6. Find Your Journey CTA — quiz section */}
      <FindJourneyCTA />

      {/* 7. Why Us — USP cards */}
      <WhyUs />

      {/* 8. Reviews — guest testimonials */}
      <Reviews />

      {/* 9. Instagram feed + Journal posts */}
      <InstagramBlog />

      {/* 10. Newsletter — email capture */}
      <Newsletter />

      {/* Floating modal — lead capture popup (appears after 4 s on first visit) */}
      <LeadCapturePopup />
    </>
  );
}
