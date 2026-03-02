import type { Metadata } from "next";
import { DestinationsPageClient } from "@/components/destinations/DestinationsPageClient";

export const metadata: Metadata = {
  title: "Destinations | See the Unseen",
  description:
    "Explore handcrafted journeys to the world's most extraordinary destinations.",
};

export default function DestinationsPage() {
  return <DestinationsPageClient />;
}
