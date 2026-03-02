"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Heart, FileText, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { InquiryStatus } from "@/types";

// ─── Mock data ────────────────────────────────────────────────────────────────

interface MockEnquiry {
  refNo: string;
  tourName: string;
  date: string;
  status: InquiryStatus;
}

const MOCK_ENQUIRIES: MockEnquiry[] = [
  {
    refNo: "STU-001",
    tourName: "Enchanting Rajasthan Circuit",
    date: "2026-01-15",
    status: "RECEIVED",
  },
  {
    refNo: "STU-002",
    tourName: "Kerala Backwater Trail",
    date: "2026-01-20",
    status: "IN_REVIEW",
  },
  {
    refNo: "STU-003",
    tourName: "Japan Cherry Blossom",
    date: "2026-02-01",
    status: "QUOTE_SENT",
  },
];

interface MockWishlistTour {
  id: string;
  name: string;
  gradientFrom: string;
  gradientTo: string;
  slug: string;
}

const MOCK_WISHLIST: MockWishlistTour[] = [
  {
    id: "1",
    name: "Enchanting Rajasthan Circuit",
    gradientFrom: "from-amber-600",
    gradientTo: "to-orange-400",
    slug: "enchanting-rajasthan-circuit",
  },
  {
    id: "2",
    name: "Bali Sacred Temples",
    gradientFrom: "from-emerald-700",
    gradientTo: "to-teal-400",
    slug: "bali-sacred-temples",
  },
  {
    id: "3",
    name: "Swiss Alps Winter Escape",
    gradientFrom: "from-blue-700",
    gradientTo: "to-sky-400",
    slug: "swiss-alps-winter-escape",
  },
];

// ─── Status badge helper ──────────────────────────────────────────────────────

const STATUS_BADGE: Record<
  InquiryStatus,
  { label: string; variant: "grey" | "orange" | "coral" | "green" | "dark" }
> = {
  RECEIVED:   { label: "Received",   variant: "grey"   },
  IN_REVIEW:  { label: "In Review",  variant: "orange"  },
  QUOTE_SENT: { label: "Quote Sent", variant: "coral"   },
  CONFIRMED:  { label: "Confirmed",  variant: "green"   },
  CLOSED:     { label: "Closed",     variant: "dark"    },
};

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm">
      <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", colorClass)}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-brand-dark font-playfair">{value}</p>
        <p className="text-xs text-brand-grey mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountDashboard() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "Traveller";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-brand-dark">
          Welcome back, {firstName}!
        </h1>
        <p className="text-brand-grey text-sm mt-1">
          Here&apos;s what&apos;s happening with your travel plans
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          icon={<FileText className="h-5 w-5 text-brand-orange" />}
          label="Enquiries Sent"
          value={3}
          colorClass="bg-brand-orange/10"
        />
        <StatCard
          icon={<Heart className="h-5 w-5 text-brand-coral" />}
          label="Tours Wishlisted"
          value={5}
          colorClass="bg-brand-coral/10"
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5 text-emerald-600" />}
          label="Confirmed Trips"
          value={0}
          colorClass="bg-emerald-50"
        />
      </div>

      {/* Recent Enquiries */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-xl font-bold text-brand-dark">
            Recent Enquiries
          </h2>
          <Link
            href="/account/enquiries"
            className="text-sm text-brand-orange hover:underline font-medium"
          >
            View All →
          </Link>
        </div>

        {/* Table (desktop) */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-brand-grey uppercase tracking-wider">
                    Ref No
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-brand-grey uppercase tracking-wider">
                    Tour
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-brand-grey uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-brand-grey uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-brand-grey uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_ENQUIRIES.map((enq) => {
                  const badge = STATUS_BADGE[enq.status];
                  return (
                    <tr key={enq.refNo} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-brand-grey">
                          {enq.refNo}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-brand-dark">
                        {enq.tourName}
                      </td>
                      <td className="px-5 py-4 text-brand-grey">
                        {formatDate(enq.date)}
                      </td>
                      <td className="px-5 py-4">
                        <Badge label={badge.label} variant={badge.variant} dot />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href="/account/enquiries"
                          className="text-xs font-medium text-brand-orange hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Card list (mobile) */}
          <div className="md:hidden divide-y divide-gray-100">
            {MOCK_ENQUIRIES.map((enq) => {
              const badge = STATUS_BADGE[enq.status];
              return (
                <div key={enq.refNo} className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-sm text-brand-dark">{enq.tourName}</p>
                    <Badge label={badge.label} variant={badge.variant} size="sm" dot />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-grey">{enq.refNo}</span>
                    <span className="text-xs text-brand-grey">{formatDate(enq.date)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wishlisted Tours */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-xl font-bold text-brand-dark">
            Wishlisted Tours
          </h2>
          <Link
            href="/account/wishlist"
            className="text-sm text-brand-orange hover:underline font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MOCK_WISHLIST.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm group"
            >
              {/* Gradient placeholder */}
              <div
                className={cn(
                  "h-32 bg-gradient-to-br",
                  tour.gradientFrom,
                  tour.gradientTo
                )}
              />
              <div className="p-4">
                <p className="font-playfair text-sm font-semibold text-brand-dark mb-3 line-clamp-2">
                  {tour.name}
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/tours/${tour.slug}`}
                    className={cn(
                      "flex-1 text-center text-xs font-semibold py-2 rounded-full border border-brand-orange text-brand-orange",
                      "hover:bg-brand-orange hover:text-white transition-colors"
                    )}
                  >
                    View Tour
                  </Link>
                  <button
                    className="p-2 rounded-full border border-gray-200 text-red-400 hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Button as="a" href="/tours" variant="brand" size="lg">
          Explore More Tours
        </Button>
      </div>
    </div>
  );
}
