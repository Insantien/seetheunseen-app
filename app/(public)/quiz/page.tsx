import type { Metadata } from "next";
import { QuizClient } from "@/components/quiz/QuizClient";

export const metadata: Metadata = {
  title: "Find Your Journey | See the Unseen",
  description:
    "Answer 6 quick questions and discover your perfect luxury travel experience.",
};

export default function QuizPage() {
  return <QuizClient />;
}
