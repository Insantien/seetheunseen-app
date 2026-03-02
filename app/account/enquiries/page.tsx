"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { InquiryStatus } from "@/types";

// ─── Mock data ────────────────────────────────────────────────────────────────

interface MockEnquiry {
  id: string;
  refNo: string;
  tourName: string;
  destination: string;
  duration: string;
  adults: number;
  children: number;
  preferredMonth: string;
  status: InquiryStatus;
  submittedAt: string;
  notes?: string;
}

const MOCK_ENQUIRIES: MockEnquiry[] = [
  {
    id: "1",
    refNo: "STU-001",
    tourName: "Enchanting Rajasthan Circuit",
    destination: "Rajasthan, India",
    duration: "8 Days / 7 Nights",
    adults: 2,
    children: 0,
    preferredMonth: "March 2026",
    status: "RECEIVED",
    submittedAt: "2026-01-15",
    notes: "Prefer heritage hotels and private transfers.",
  },
  {
    id: "2",
    refNo: "STU-002",
    tourName: "Kerala Backwater Trail",
    destination: "Kerala, India",
    duration: "6 Days / 5 Nights",
    adults: 2,
    children: 1,
    preferredMonth: "February 2026",
    status: "IN_REVIEW",
    submittedAt: "2026-01-20",
  },
  {
    id: "3",
    refNo: "STU-003",
    tourName: "Japan Cherry Blossom",
    destination: "Tokyo, Kyoto, Osaka",
    duration: "10 Days / 9 Nights",
    adults: 2,
    children: 0,
    preferredMonth: "April 2026",
    status: "QUOTE_SENT",
    submittedAt: "2026-02-01",
    notes: "Interested in tea ceremony add-on.",
  },
  {
    id: "4",
    refNo: "STU-004",
    tourName: "Maldives Overwater Bliss",
    destination: "Maldives",
    duration: "5 Days / 4 Nights",
    adults: 2,
    children: 0,
    preferredMonth: "December 2025",
    status: "CONFIRMED",
    submittedAt: "2025-11-10",
  },
  {
    id: "5",
    refNo: "STU-005",
    tourName: "Himalayan Trek & Meditation",
    destination: "Himachal Pradesh, India",
    duration: "7 Days / 6 Nights",
    adults: 1,
    children: 0,
    preferredMonth: "September 2025",
    status: "CLOSED",
    submittedAt: "2025-08-05",
  },
];

// ─── Status config ────────────────────────────────────────────────────────────

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

type FilterTab = "ALL" | InquiryStatus;

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "ALL",        label: "All"        },
  { key: "RECEIVED",   label: "Received"   },
  { key: "IN_REVIEW",  label: "In Review"  },
  { key: "QUOTE_SENT", label: "Quote Sent" },
  { key: "CONFIRMED",  label: "Confirmed"  },
  { key: "CLOSED",     label: "Closed"     },
];

// ─── Timeline steps ───────────────────────────────────────────────────────────

const TIMELINE_STEPS: { status: InquiryStatus; label: string }[] = [
  { status: "RECEIVED",   label: "Received"   },
  { status: "IN_REVIEW",  label: "In Review"  },
  { status: "QUOTE_SENT", label: "Quote Sent" },
  { status: "CONFIRMED",  label: "Confirmed"  },
];

const STATUS_ORDER: Record<InquiryStatus, number> = {
  RECEIVED:   0,
  IN_REVIEW:  1,
  QUOTE_SENT: 2,
  CONFIRMED:  3,
  CLOSED:     4,
};

// ─── Enquiry card ─────────────────────────────────────────────────────────────

function EnquiryCard({
  enquiry,
  isExpanded,
  onToggle,
}: {
  enquiry: MockEnquiry;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const badge = STATUS_BADGE[enquiry.status];
  const currentStep = STATUS_ORDER[enquiry.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Card header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 hover:bg-gray-50/50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-brand-grey">{enquiry.refNo}</span>
              <Badge label={badge.label} variant={badge.variant} size="sm" dot />
            </div>
            <h3 className="font-playfair font-semibold text-brand-dark text-base mb-0.5">
              {enquiry.tourName}
            </h3>
            <p className="text-xs text-brand-grey">
              {enquiry.destination} &middot; {enquiry.duration}
            </p>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-brand-grey">
              <span>
                <span className="font-medium text-brand-charcoal">Adults:</span>{" "}
                {enquiry.adults}
              </span>
              {enquiry.children > 0 && (
                <span>
                  <span className="font-medium text-brand-charcoal">Children:</span>{" "}
                  {enquiry.children}
                </span>
              )}
              <span>
                <span className="font-medium text-brand-charcoal">Month:</span>{" "}
                {enquiry.preferredMonth}
              </span>
              <span>
                <span className="font-medium text-brand-charcoal">Submitted:</span>{" "}
                {formatDate(enquiry.submittedAt)}
              </span>
            </div>
          </div>

          <div className="shrink-0 mt-1 text-brand-grey">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded view */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-5 py-5">
          {/* Status timeline */}
          {enquiry.status !== "CLOSED" && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-brand-grey uppercase tracking-wider mb-4">
                Progress
              </p>
              <div className="flex items-center gap-0">
                {TIMELINE_STEPS.map((step, idx) => {
                  const stepOrder = STATUS_ORDER[step.status];
                  const isDone = currentStep > stepOrder;
                  const isCurrent = currentStep === stepOrder;
                  const isLast = idx === TIMELINE_STEPS.length - 1;

                  return (
                    <div key={step.status} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        {isDone ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        ) : isCurrent ? (
                          <div className="h-6 w-6 rounded-full bg-brand-orange flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white" />
                          </div>
                        ) : (
                          <Circle className="h-6 w-6 text-gray-300" />
                        )}
                        <span
                          className={cn(
                            "mt-1.5 text-[10px] font-medium text-center whitespace-nowrap",
                            isCurrent ? "text-brand-orange" : isDone ? "text-emerald-600" : "text-gray-400"
                          )}
                        >
                          {step.label}
                        </span>
                      </div>
                      {!isLast && (
                        <div
                          className={cn(
                            "flex-1 h-0.5 mb-4 mx-1",
                            isDone ? "bg-emerald-400" : "bg-gray-200"
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Details table */}
          <div className="rounded-xl border border-gray-100 overflow-hidden mb-4">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Reference", enquiry.refNo],
                  ["Tour", enquiry.tourName],
                  ["Destination", enquiry.destination],
                  ["Duration", enquiry.duration],
                  ["Adults", String(enquiry.adults)],
                  ["Children", String(enquiry.children)],
                  ["Preferred Month", enquiry.preferredMonth],
                  ["Status", STATUS_BADGE[enquiry.status].label],
                  ["Submitted", formatDate(enquiry.submittedAt)],
                  ...(enquiry.notes ? [["Notes", enquiry.notes]] : []),
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="px-4 py-2.5 text-xs font-semibold text-brand-grey bg-gray-50/50 w-36">
                      {label}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-brand-dark">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contact link */}
          <a
            href={`mailto:hello@seetheunseen.in?subject=Enquiry ${enquiry.refNo}: ${enquiry.tourName}`}
            className="text-sm text-brand-orange hover:underline font-medium"
          >
            Contact us about this enquiry →
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EnquiriesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeFilter === "ALL"
      ? MOCK_ENQUIRIES
      : MOCK_ENQUIRIES.filter((e) => e.status === activeFilter);

  function toggleExpanded(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-brand-dark">
          My Enquiries
        </h1>
        <p className="text-brand-grey text-sm mt-1">
          Track the status of all your tour enquiries
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TABS.map((tab) => {
          const count =
            tab.key === "ALL"
              ? MOCK_ENQUIRIES.length
              : MOCK_ENQUIRIES.filter((e) => e.status === tab.key).length;

          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveFilter(tab.key);
                setExpandedId(null);
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-150",
                activeFilter === tab.key
                  ? "bg-brand-orange text-white shadow-sm"
                  : "bg-white text-brand-charcoal hover:bg-gray-100 border border-gray-200"
              )}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={cn(
                    "ml-1.5 text-xs",
                    activeFilter === tab.key ? "text-white/80" : "text-brand-grey"
                  )}
                >
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Enquiry cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <p className="text-brand-grey">No enquiries found for this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enquiry) => (
            <EnquiryCard
              key={enquiry.id}
              enquiry={enquiry}
              isExpanded={expandedId === enquiry.id}
              onToggle={() => toggleExpanded(enquiry.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
