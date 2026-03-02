import type { Metadata } from "next";
import { ExperienceDetailClient } from "@/components/experiences/ExperienceDetailClient";

export const metadata: Metadata = {
  title: "Experience | See the Unseen",
};

export default function ExperienceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ExperienceDetailClient slug={params.slug} />;
}
