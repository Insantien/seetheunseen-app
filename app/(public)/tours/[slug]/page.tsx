import type { Metadata } from "next";
import { TourDetailClient } from "@/components/tours/TourDetailClient";

export const metadata: Metadata = {
  title: "Tour Details | See the Unseen",
  description:
    "Explore the full itinerary, accommodation options, inclusions and reviews for this handcrafted luxury tour.",
};

export default function TourDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <TourDetailClient slug={params.slug} />;
}
