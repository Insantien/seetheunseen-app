import type { Metadata } from "next";
import { DestinationDetailClient } from "@/components/destinations/DestinationDetailClient";

export const metadata: Metadata = {
  title: "Destination | See the Unseen",
};

export default function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <DestinationDetailClient slug={params.slug} />;
}
