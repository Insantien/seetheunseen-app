"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { CheckCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
// Local types for profile preferences (not in shared types)
type TourCategory = string;
type GroupSize = string;
type BudgetRange = string;
type TravelFrequency = string;

// ─── Avatar ───────────────────────────────────────────────────────────────────

function LargeAvatar({ name }: { name?: string | null }) {
  const initials = name
    ? name.trim().split(/\s+/).map((w) => w[0]?.toUpperCase()).join("").slice(0, 2)
    : "?";

  return (
    <div className="h-20 w-20 rounded-full bg-brand-orange flex items-center justify-center">
      <span className="text-2xl font-bold text-white font-playfair">{initials}</span>
    </div>
  );
}

// ─── Chip selector ────────────────────────────────────────────────────────────

function ChipSelector<T extends string>({
  options,
  selected,
  onChange,
  multi = true,
}: {
  options: T[];
  selected: T[];
  onChange: (next: T[]) => void;
  multi?: boolean;
}) {
  function toggle(value: T) {
    if (multi) {
      onChange(
        selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value]
      );
    } else {
      onChange(selected[0] === value ? [] : [value]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-150",
              active
                ? "bg-brand-orange text-white border-brand-orange"
                : "bg-white text-brand-charcoal border-gray-200 hover:border-brand-orange hover:text-brand-orange"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-playfair text-xl font-bold text-brand-dark mb-5">{title}</h2>
      {children}
    </div>
  );
}

// ─── Field row (read-only) ────────────────────────────────────────────────────

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-brand-grey uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Editable input ───────────────────────────────────────────────────────────

function EditableInput({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
  suffix,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  readOnly?: boolean;
  suffix?: React.ReactNode;
}) {
  return (
    <FieldRow label={label}>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={readOnly}
          className={cn(
            "w-full px-4 py-3 rounded-xl border text-sm text-brand-dark",
            "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange",
            "transition-all duration-200",
            readOnly
              ? "bg-gray-50 border-gray-200 cursor-default text-brand-grey"
              : "bg-white border-gray-200 hover:border-gray-300"
          )}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
    </FieldRow>
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────

const EXPERIENCE_OPTIONS: TourCategory[] = [
  "Cultural",
  "Adventure",
  "Wildlife",
  "Wellness",
  "Culinary",
  "Spiritual",
  "Photography",
  "Luxury",
  "Honeymoon",
];

const DESTINATION_OPTIONS = [
  "India",
  "Japan",
  "Europe",
  "Maldives",
  "Bali",
  "Switzerland",
];

const FREQUENCY_OPTIONS: TravelFrequency[] = [
  "Once a year",
  "Twice a year",
  "3–4 times a year",
  "5+ times a year",
];

const GROUP_SIZE_OPTIONS: GroupSize[] = ["Solo", "Couple", "Family", "Group"];

const BUDGET_OPTIONS: BudgetRange[] = [
  "Under ₹75K",
  "₹75K–₹1.5L",
  "₹1.5L–₹3L",
  "₹3L+",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  // ── Personal info state ──
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // ── Preferences state ──
  const [experiences, setExperiences] = useState<TourCategory[]>(["Cultural", "Luxury"]);
  const [destinations, setDestinations] = useState<string[]>(["India", "Japan"]);
  const [frequency, setFrequency] = useState<TravelFrequency[]>(["Twice a year"]);
  const [groupSize, setGroupSize] = useState<GroupSize[]>(["Couple"]);
  const [budget, setBudget] = useState<BudgetRange[]>(["₹1.5L–₹3L"]);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [savedPrefs, setSavedPrefs] = useState(false);

  async function handleSavePersonal(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800)); // simulated request
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleSavePreferences(e: React.FormEvent) {
    e.preventDefault();
    setSavingPrefs(true);
    await new Promise((r) => setTimeout(r, 800));
    setSavingPrefs(false);
    setSavedPrefs(true);
    setTimeout(() => setSavedPrefs(false), 3000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-brand-dark">My Profile</h1>
        <p className="text-brand-grey text-sm mt-1">
          Manage your account details and travel preferences
        </p>
      </div>

      {/* ── Personal Information ── */}
      <SectionCard title="Personal Information">
        <form onSubmit={handleSavePersonal} className="space-y-5">
          {/* Avatar + name row */}
          <div className="flex items-center gap-4 mb-2">
            <LargeAvatar name={name || user?.name} />
            <div>
              <p className="font-semibold text-brand-dark text-sm">
                {name || user?.name || "Your Name"}
              </p>
              <p className="text-xs text-brand-grey">{user?.email}</p>
            </div>
          </div>

          <EditableInput
            label="Full Name"
            value={name}
            onChange={setName}
          />

          <EditableInput
            label="Email Address"
            value={user?.email ?? ""}
            readOnly
            suffix={
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle className="h-3.5 w-3.5" />
                Verified
              </span>
            }
          />

          <EditableInput
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            type="tel"
          />

          <div className="flex items-center gap-3 pt-1">
            <Button
              type="submit"
              variant="brand"
              size="sm"
              loading={saving}
            >
              {saved ? "Saved!" : "Save Changes"}
            </Button>
            {saved && (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                Changes saved
              </span>
            )}
          </div>
        </form>
      </SectionCard>

      {/* ── Travel Preferences ── */}
      <SectionCard title="Travel Preferences">
        <form onSubmit={handleSavePreferences} className="space-y-6">
          {/* Experiences */}
          <FieldRow label="Preferred Experiences">
            <ChipSelector<TourCategory>
              options={EXPERIENCE_OPTIONS}
              selected={experiences}
              onChange={setExperiences}
            />
          </FieldRow>

          {/* Destinations */}
          <FieldRow label="Preferred Destinations">
            <ChipSelector<string>
              options={DESTINATION_OPTIONS}
              selected={destinations}
              onChange={setDestinations}
            />
          </FieldRow>

          {/* Travel frequency */}
          <FieldRow label="Travel Frequency">
            <div className="relative">
              <select
                value={frequency[0] ?? ""}
                onChange={(e) => setFrequency(e.target.value ? [e.target.value as TravelFrequency] : [])}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-brand-dark",
                  "bg-white appearance-none cursor-pointer",
                  "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange",
                  "transition-all duration-200"
                )}
              >
                <option value="">Select frequency</option>
                {FREQUENCY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg className="h-4 w-4 text-brand-grey" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </FieldRow>

          {/* Group size */}
          <FieldRow label="Group Size">
            <ChipSelector<GroupSize>
              options={GROUP_SIZE_OPTIONS}
              selected={groupSize}
              onChange={setGroupSize}
              multi={false}
            />
          </FieldRow>

          {/* Budget range */}
          <FieldRow label="Budget Range">
            <ChipSelector<BudgetRange>
              options={BUDGET_OPTIONS}
              selected={budget}
              onChange={setBudget}
              multi={false}
            />
          </FieldRow>

          <div className="flex items-center gap-3 pt-1">
            <Button
              type="submit"
              variant="brand"
              size="sm"
              loading={savingPrefs}
            >
              {savedPrefs ? "Saved!" : "Save Preferences"}
            </Button>
            {savedPrefs && (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                Preferences saved
              </span>
            )}
          </div>
        </form>
      </SectionCard>

      {/* ── Account & Security ── */}
      <SectionCard title="Account &amp; Security">
        <div className="space-y-4">
          {/* Email row */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-xs font-semibold text-brand-grey uppercase tracking-wider mb-0.5">
                Email
              </p>
              <p className="text-sm text-brand-dark">{user?.email}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <CheckCircle className="h-3.5 w-3.5" />
              Verified
            </span>
          </div>

          {/* Sign-in method */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-xs font-semibold text-brand-grey uppercase tracking-wider mb-0.5">
                Sign-In Method
              </p>
              <p className="text-sm text-brand-dark">Magic Link / OAuth</p>
            </div>
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold",
                "bg-blue-50 text-blue-700"
              )}
            >
              Google
            </span>
          </div>

          {/* Sign out */}
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-400"
              iconLeft={<LogOut className="h-4 w-4" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
