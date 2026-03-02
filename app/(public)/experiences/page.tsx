import type { Metadata } from "next";
import { ExperiencesPageClient } from "@/components/experiences/ExperiencesPageClient";

export const metadata: Metadata = {
  title: "Our Experiences | See the Unseen",
};

export default function ExperiencesPage() {
  return <ExperiencesPageClient />;
}
