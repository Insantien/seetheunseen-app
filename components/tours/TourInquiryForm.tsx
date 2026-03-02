"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type FormStatus = "idle" | "loading" | "success" | "error";

interface TourInquiryFormProps {
  tourSlug: string;
  tourTitle: string;
  basePrice: number;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function TourInquiryForm({ tourSlug, tourTitle, basePrice }: TourInquiryFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    numAdults: 2,
    numChildren: 0,
    preferredMonth: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          numAdults: form.numAdults,
          numChildren: form.numChildren,
          preferredMonth: form.preferredMonth,
          message: form.message,
          tourSlug,
          tourTitle,
          source: "tour-page",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-8 px-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <Check size={28} className="text-emerald-600" strokeWidth={2.5} />
        </div>
        <h3 className="font-playfair text-xl font-bold text-brand-dark mb-2">
          Enquiry Sent!
        </h3>
        <p className="font-lora text-sm text-brand-grey leading-relaxed mb-5">
          Thank you for your interest in <span className="font-semibold text-brand-dark">{tourTitle}</span>. Our travel consultant will reach out within 24 hours.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStatus("idle")}
        >
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  const inputClass = cn(
    "w-full rounded-xl px-3.5 py-2.5 text-sm font-sans",
    "bg-white border border-gray-200",
    "text-brand-dark placeholder-brand-grey/50",
    "focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
    "transition-colors duration-150"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Estimated price hint */}
      <div className="bg-brand-orange/5 rounded-xl p-3.5 flex items-center justify-between">
        <div>
          <p className="font-sans text-xs text-brand-grey uppercase tracking-wider">Starting from</p>
          <p className="font-playfair text-2xl font-bold text-brand-orange">
            ₹{basePrice.toLocaleString("en-IN")}
          </p>
        </div>
        <p className="font-sans text-xs text-brand-grey">per person</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          placeholder="Your full name"
          required
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Email Address *
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
          required
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Phone Number
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="+91 98765 43210"
          className={inputClass}
        />
      </div>

      {/* Adults + Children */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Adults
          </label>
          <select
            value={form.numAdults}
            onChange={(e) => set("numAdults", Number(e.target.value))}
            className={inputClass}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Children
          </label>
          <select
            value={form.numChildren}
            onChange={(e) => set("numChildren", Number(e.target.value))}
            className={inputClass}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Preferred Month */}
      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Preferred Month
        </label>
        <select
          value={form.preferredMonth}
          onChange={(e) => set("preferredMonth", e.target.value)}
          className={inputClass}
        >
          <option value="">Select a month</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Special Requests
        </label>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Any special requirements, dietary needs, accessibility requests..."
          rows={3}
          className={cn(inputClass, "resize-none leading-relaxed")}
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-xs font-sans">{errorMsg}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        fullWidth
        loading={status === "loading"}
        iconRight={status !== "loading" ? <Send size={15} /> : undefined}
      >
        Send Enquiry
      </Button>

      <p className="text-center font-sans text-xs text-brand-grey/60">
        No commitment — our consultant will prepare a custom quote for you.
      </p>
    </form>
  );
}
