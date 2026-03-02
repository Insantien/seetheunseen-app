import type { Metadata } from "next";
import { ToursPageClient } from "@/components/tours/ToursPageClient";

export const metadata: Metadata = {
  title: "Explore Tours | See the Unseen",
  description:
    "Browse our handcrafted collection of luxury tours across India, Asia & beyond. Filter by destination, experience type, duration and more to find your perfect journey.",
};

export default function ToursPage() {
  return <ToursPageClient />;
}
