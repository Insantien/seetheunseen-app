"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type Status = "idle" | "loading" | "success" | "error";

const SOURCES = [
  "General Enquiry",
  "Custom Itinerary",
  "Group / Corporate Travel",
  "Visa Assistance",
  "Partnership / Press",
  "Other",
];

export function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: SOURCES[0],
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string, value: string) =>
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
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          source: "contact",
          numAdults: 1,
          numChildren: 0,
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
      <div className="flex flex-col items-center text-center py-12 px-6 bg-white rounded-2xl border border-gray-100">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <Check size={32} className="text-emerald-600" strokeWidth={2.5} />
        </div>
        <h3 className="font-playfair text-2xl font-bold text-brand-dark mb-2">
          Message Sent!
        </h3>
        <p className="font-lora text-brand-grey leading-relaxed mb-6 max-w-sm">
          Thank you for reaching out. One of our travel consultants will get
          back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your full name"
            required
            className={cn(
              "w-full rounded-xl px-4 py-3 text-sm font-sans",
              "bg-white border border-gray-200",
              "text-brand-dark placeholder-brand-grey/50",
              "focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
              "transition-colors duration-150"
            )}
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98765 43210"
            className={cn(
              "w-full rounded-xl px-4 py-3 text-sm font-sans",
              "bg-white border border-gray-200",
              "text-brand-dark placeholder-brand-grey/50",
              "focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
              "transition-colors duration-150"
            )}
          />
        </div>
      </div>

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
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm font-sans",
            "bg-white border border-gray-200",
            "text-brand-dark placeholder-brand-grey/50",
            "focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
            "transition-colors duration-150"
          )}
        />
      </div>

      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Subject
        </label>
        <select
          value={form.subject}
          onChange={(e) => set("subject", e.target.value)}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm font-sans",
            "bg-white border border-gray-200",
            "text-brand-dark",
            "focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
            "transition-colors duration-150"
          )}
        >
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Message *
        </label>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your dream trip — destination, dates, group size, special requests..."
          required
          rows={5}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm font-sans font-lora",
            "bg-white border border-gray-200",
            "text-brand-dark placeholder-brand-grey/50",
            "focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
            "transition-colors duration-150 resize-none leading-relaxed"
          )}
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm font-sans">{errorMsg}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        fullWidth
        loading={status === "loading"}
        iconRight={status !== "loading" ? <Send size={16} /> : undefined}
      >
        Send Message
      </Button>

      <p className="text-center font-sans text-xs text-brand-grey/60">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-brand-orange">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
