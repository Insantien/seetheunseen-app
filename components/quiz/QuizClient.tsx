"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { formatINR } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import {
  User,
  Heart,
  Users,
  Briefcase,
  Mountain,
  Waves,
  Compass,
  Leaf,
  Crown,
  Sparkles,
  Landmark,
  MapPin,
  Globe,
  Sun,
  Anchor,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Users2,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  User,
  Heart,
  Users,
  Users2,
  UsersRound: Users2,
  Briefcase,
  Mountain,
  Waves,
  Compass,
  Leaf,
  Crown,
  Sparkles,
  Landmark,
  MapPin,
  Globe,
  Globe2: Globe,
  Sun,
  Anchor,
};

interface StepOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

interface Step {
  id: number;
  question: string;
  type: "single" | "multi";
  options: StepOption[];
}

const STEPS: Step[] = [
  {
    id: 1,
    question: "Who are you travelling with?",
    type: "single",
    options: [
      {
        id: "solo",
        label: "Solo Explorer",
        icon: "User",
        description: "Just me and my curiosity",
      },
      {
        id: "couple",
        label: "Romantic Couple",
        icon: "Heart",
        description: "A trip for two",
      },
      {
        id: "family",
        label: "Family with Kids",
        icon: "Users",
        description: "Making memories together",
      },
      {
        id: "friends",
        label: "Group of Friends",
        icon: "UsersRound",
        description: "Adventures with the crew",
      },
      {
        id: "corporate",
        label: "Corporate Group",
        icon: "Briefcase",
        description: "Team travel & retreats",
      },
    ],
  },
  {
    id: 2,
    question: "What kind of experience calls to you?",
    type: "multi",
    options: [
      { id: "scenic", label: "Scenic & Cultural", icon: "Mountain" },
      { id: "beach", label: "Beach & Ocean", icon: "Waves" },
      { id: "adventure", label: "Adventure & Outdoors", icon: "Compass" },
      { id: "wellness", label: "Wellness & Retreat", icon: "Leaf" },
      { id: "luxury", label: "Luxury & Signature", icon: "Crown" },
      { id: "festivals", label: "Festivals & Culture", icon: "Sparkles" },
      { id: "heritage", label: "Heritage & History", icon: "Landmark" },
    ],
  },
  {
    id: 3,
    question: "Where in the world?",
    type: "single",
    options: [
      {
        id: "india",
        label: "India",
        icon: "MapPin",
        description: "Domestic escapes",
      },
      {
        id: "asia",
        label: "South & Southeast Asia",
        icon: "Globe",
        description: "Japan, Bali, Maldives...",
      },
      {
        id: "europe",
        label: "Europe",
        icon: "Globe2",
        description: "Italy, Switzerland, France...",
      },
      {
        id: "middleeast",
        label: "Middle East & Africa",
        icon: "Sun",
        description: "Dubai, Egypt, Kenya...",
      },
      {
        id: "americas",
        label: "Americas & Oceania",
        icon: "Anchor",
        description: "USA, Brazil, Australia...",
      },
      {
        id: "surprise",
        label: "Surprise Me!",
        icon: "Sparkles",
        description: "I'm open to anything",
      },
    ],
  },
  {
    id: 4,
    question: "How long can you travel?",
    type: "single",
    options: [
      { id: "short", label: "3–5 Days", description: "Short Escape" },
      { id: "week", label: "6–8 Days", description: "Perfect Week" },
      { id: "deep", label: "9–12 Days", description: "Deep Dive" },
      { id: "grand", label: "13+ Days", description: "Grand Journey" },
    ],
  },
  {
    id: 5,
    question: "When are you planning to go?",
    type: "single",
    options: [
      { id: "jan", label: "January" },
      { id: "feb", label: "February" },
      { id: "mar", label: "March" },
      { id: "apr", label: "April" },
      { id: "may", label: "May" },
      { id: "jun", label: "June" },
      { id: "jul", label: "July" },
      { id: "aug", label: "August" },
      { id: "sep", label: "September" },
      { id: "oct", label: "October" },
      { id: "nov", label: "November" },
      { id: "dec", label: "December" },
    ],
  },
  {
    id: 6,
    question: "What's your budget per person?",
    type: "single",
    options: [
      { id: "budget", label: "Under ₹75,000", description: "Value explorer" },
      {
        id: "mid",
        label: "₹75,000 – ₹1,50,000",
        description: "Comfortable travel",
      },
      {
        id: "premium",
        label: "₹1,50,000 – ₹3,00,000",
        description: "Premium experience",
      },
      {
        id: "luxury",
        label: "₹3,00,000+",
        description: "Ultimate luxury",
      },
    ],
  },
];

const MOCK_TOURS = [
  {
    title: "Enchanting Rajasthan Circuit",
    dest: "Rajasthan, India",
    days: 10,
    price: 85000,
    match: 98,
    gradient: "from-amber-700 to-orange-900",
  },
  {
    title: "Kerala Backwater & Spice Trail",
    dest: "Kerala, India",
    days: 7,
    price: 65000,
    match: 94,
    gradient: "from-green-700 to-emerald-900",
  },
  {
    title: "Japan Cherry Blossom Tour",
    dest: "Japan",
    days: 12,
    price: 185000,
    match: 91,
    gradient: "from-pink-600 to-rose-900",
  },
  {
    title: "Maldives Overwater Paradise",
    dest: "Maldives",
    days: 6,
    price: 145000,
    match: 88,
    gradient: "from-sky-500 to-cyan-900",
  },
  {
    title: "Bali Wellness & Spiritual Retreat",
    dest: "Bali, Indonesia",
    days: 9,
    price: 120000,
    match: 85,
    gradient: "from-green-600 to-lime-900",
  },
  {
    title: "Swiss Alps & Rhine Cruise",
    dest: "Switzerland",
    days: 10,
    price: 240000,
    match: 82,
    gradient: "from-blue-600 to-indigo-900",
  },
];

function getGridClass(stepIndex: number): string {
  switch (stepIndex) {
    case 0:
      return "grid grid-cols-2 md:grid-cols-3 gap-3";
    case 1:
      return "grid grid-cols-2 md:grid-cols-4 gap-3";
    case 2:
      return "grid grid-cols-2 md:grid-cols-3 gap-3";
    case 3:
      return "grid grid-cols-2 gap-3";
    case 4:
      return "grid grid-cols-3 md:grid-cols-4 gap-2";
    case 5:
      return "grid grid-cols-2 gap-3";
    default:
      return "grid grid-cols-2 gap-3";
  }
}

function isCompact(stepIndex: number): boolean {
  return stepIndex === 4;
}

interface TourCardProps {
  tour: (typeof MOCK_TOURS)[number];
  size?: "lg" | "md" | "sm";
}

function ResultTourCard({ tour, size = "md" }: TourCardProps) {
  if (size === "lg") {
    return (
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md">
        <div
          className={cn(
            "bg-gradient-to-br h-64 flex flex-col justify-end p-6",
            tour.gradient
          )}
        >
          <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
            <Check className="w-3 h-3" /> {tour.match}% Match
          </span>
          <h3 className="text-white font-playfair text-2xl font-bold leading-tight">
            {tour.title}
          </h3>
          <p className="text-white/80 text-sm mt-1">{tour.dest}</p>
        </div>
        <div className="bg-white p-6">
          <div className="flex items-center gap-4 text-brand-grey text-sm mb-4">
            <span>{tour.days} days</span>
            <span>&bull;</span>
            <span className="text-brand-dark font-semibold text-base">
              {formatINR(tour.price)} / person
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="/tours" size="md" variant="brand">
              View Tour
            </Button>
            <Button as="a" href="/contact" size="md" variant="outline">
              Get a Quote
            </Button>
            <Button as="a" href="/contact" size="md" variant="ghost">
              Speak to Expert
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (size === "md") {
    return (
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div
          className={cn(
            "bg-gradient-to-br h-40 flex flex-col justify-end p-4",
            tour.gradient
          )}
        >
          <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full w-fit mb-2">
            {tour.match}% Match
          </span>
          <h3 className="text-white font-semibold text-base leading-tight">
            {tour.title}
          </h3>
          <p className="text-white/75 text-xs mt-0.5">{tour.dest}</p>
        </div>
        <div className="bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-brand-grey text-sm">{tour.days} days</span>
            <span className="text-brand-dark font-semibold text-sm">
              {formatINR(tour.price)}
            </span>
          </div>
          <Button as="a" href="/tours" size="sm" variant="outline" fullWidth>
            View Tour
          </Button>
        </div>
      </div>
    );
  }

  // sm
  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={cn(
          "bg-gradient-to-br h-28 flex flex-col justify-end p-3",
          tour.gradient
        )}
      >
        <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full w-fit mb-1">
          {tour.match}%
        </span>
        <h3 className="text-white font-semibold text-sm leading-tight">
          {tour.title}
        </h3>
        <p className="text-white/75 text-xs">{tour.dest}</p>
      </div>
      <div className="bg-white p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-brand-grey text-xs">{tour.days} days</span>
          <span className="text-brand-dark font-semibold text-xs">
            {formatINR(tour.price)}
          </span>
        </div>
        <Button as="a" href="/tours" size="sm" variant="outline" fullWidth>
          View Tour
        </Button>
      </div>
    </div>
  );
}

function ResultsScreen({
  answers,
  onReset,
}: {
  answers: Record<number, string | string[]>;
  onReset: () => void;
}) {
  const companionAnswer = answers[1];
  const companion =
    typeof companionAnswer === "string" ? companionAnswer : "solo";
  const companionLabel =
    STEPS[0].options.find((o) => o.id === companion)?.label ?? "Solo Explorer";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange to-brand-coral mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-brand-dark mb-3">
          Your Perfect Journeys Await
        </h1>
        <p className="text-brand-grey font-lora text-lg max-w-xl mx-auto">
          Based on your answers — travelling as{" "}
          <span className="text-brand-orange font-semibold">{companionLabel}</span>{" "}
          — here are the experiences curated just for you.
        </p>
      </div>

      {/* Tier 1 — Ideal Trip */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-brand-orange" />
          <h2 className="font-playfair text-xl font-bold text-brand-dark">
            Your Ideal Trip
          </h2>
        </div>
        <ResultTourCard tour={MOCK_TOURS[0]} size="lg" />
      </div>

      {/* Tier 2 — Highly Recommended */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-brand-coral" />
          <h2 className="font-playfair text-xl font-bold text-brand-dark">
            Highly Recommended
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultTourCard tour={MOCK_TOURS[1]} size="md" />
          <ResultTourCard tour={MOCK_TOURS[2]} size="md" />
        </div>
      </div>

      {/* Tier 3 — You Might Also Like */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-brand-grey" />
          <h2 className="font-playfair text-xl font-bold text-brand-dark">
            You Might Also Like
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultTourCard tour={MOCK_TOURS[3]} size="sm" />
          <ResultTourCard tour={MOCK_TOURS[4]} size="sm" />
          <ResultTourCard tour={MOCK_TOURS[5]} size="sm" />
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-brand-grey hover:text-brand-dark transition-colors text-sm font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          Start Again
        </button>
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-coral transition-colors text-sm font-semibold"
        >
          Browse All Tours
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function QuizClient() {
  const [step, setStep] = useState(0); // 0-5 = steps, 6 = results
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  const currentStep = STEPS[step];
  const totalSteps = STEPS.length;
  const isResults = step === totalSteps;

  const currentAnswer = answers[step + 1];

  function isSelected(optionId: string): boolean {
    if (!currentAnswer) return false;
    if (Array.isArray(currentAnswer)) return currentAnswer.includes(optionId);
    return currentAnswer === optionId;
  }

  function hasSelection(): boolean {
    if (!currentAnswer) return false;
    if (Array.isArray(currentAnswer)) return currentAnswer.length > 0;
    return true;
  }

  function handleSelect(optionId: string) {
    const stepId = step + 1;
    if (currentStep.type === "multi") {
      const prev = (answers[stepId] as string[] | undefined) ?? [];
      let next: string[];
      if (prev.includes(optionId)) {
        next = prev.filter((id) => id !== optionId);
      } else {
        if (prev.length >= 3) {
          // replace oldest
          next = [...prev.slice(1), optionId];
        } else {
          next = [...prev, optionId];
        }
      }
      setAnswers((a) => ({ ...a, [stepId]: next }));
    } else {
      setAnswers((a) => ({ ...a, [stepId]: optionId }));
    }
  }

  function handleContinue() {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      setStep(totalSteps); // go to results
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  function handleReset() {
    setStep(0);
    setAnswers({});
  }

  const progressPercent = isResults
    ? 100
    : Math.round(((step) / totalSteps) * 100);

  if (isResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light to-white">
        <ResultsScreen answers={answers} onReset={handleReset} />
      </div>
    );
  }

  const compact = isCompact(step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-brand-grey">
              Step {step + 1} of {totalSteps}
            </span>
            <span className="text-sm text-brand-grey">
              {currentStep.type === "multi" ? "Select up to 3" : ""}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-orange to-brand-coral rounded-full transition-all duration-500"
              style={{ width: `${progressPercent + Math.round(100 / totalSteps)}%` }}
            />
          </div>
        </div>

        {/* Step card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-brand-dark mb-8">
            {currentStep.question}
          </h2>

          <div className={getGridClass(step)}>
            {currentStep.options.map((option) => {
              const selected = isSelected(option.id);
              const IconComponent = option.icon ? ICON_MAP[option.icon] : null;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={cn(
                    "relative border-2 rounded-xl text-left transition-all duration-200",
                    compact ? "p-3" : "p-4",
                    selected
                      ? "border-brand-orange bg-brand-orange/10"
                      : "border-gray-200 hover:border-brand-orange/50 hover:bg-brand-orange/5"
                  )}
                >
                  {/* Multi-select checkmark */}
                  {currentStep.type === "multi" && selected && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                  )}

                  {IconComponent && !compact && (
                    <IconComponent
                      className={cn(
                        "w-8 h-8 mb-3",
                        selected ? "text-brand-orange" : "text-brand-grey"
                      )}
                    />
                  )}

                  <div>
                    <div
                      className={cn(
                        "font-semibold text-brand-dark",
                        compact ? "text-sm" : "text-sm md:text-base"
                      )}
                    >
                      {option.label}
                    </div>
                    {option.description && !compact && (
                      <div className="text-sm text-brand-grey mt-0.5">
                        {option.description}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleBack}
              className={cn(
                "inline-flex items-center gap-2 text-brand-grey hover:text-brand-dark transition-colors text-sm font-semibold",
                step === 0 && "invisible pointer-events-none"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <Button
              onClick={handleContinue}
              disabled={!hasSelection()}
              variant="brand"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              {step === totalSteps - 1 ? "See My Results" : "Continue"}
            </Button>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "rounded-full transition-all duration-300",
                i === step
                  ? "w-6 h-2 bg-brand-orange"
                  : i < step
                  ? "w-2 h-2 bg-brand-orange/50"
                  : "w-2 h-2 bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
