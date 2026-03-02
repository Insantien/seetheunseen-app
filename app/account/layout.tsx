"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Heart,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

// ─── Nav links config ─────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Dashboard",     href: "/account",           icon: LayoutDashboard },
  { label: "My Enquiries",  href: "/account/enquiries", icon: FileText        },
  { label: "My Wishlist",   href: "/account/wishlist",  icon: Heart           },
  { label: "My Profile",   href: "/account/profile",   icon: User            },
];

// ─── Avatar helper ────────────────────────────────────────────────────────────

function Avatar({ name, size = "md" }: { name?: string | null; size?: "sm" | "md" | "lg" }) {
  const initials = name
    ? name.trim().split(/\s+/).map((w) => w[0]?.toUpperCase()).join("").slice(0, 2)
    : "?";

  const sizeClasses = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };

  return (
    <div
      className={cn(
        "rounded-full bg-brand-orange flex items-center justify-center font-bold text-white shrink-0",
        sizeClasses[size]
      )}
    >
      {initials}
    </div>
  );
}

// ─── Sidebar nav link ─────────────────────────────────────────────────────────

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-l-none rounded-r-full",
        "border-r-2 transition-all duration-150",
        active
          ? "bg-brand-orange/10 text-brand-orange border-brand-orange"
          : "text-brand-charcoal border-transparent hover:bg-gray-100 hover:text-brand-dark"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}

// ─── Bottom tab (mobile) ──────────────────────────────────────────────────────

function BottomTab({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-0.5 flex-1 py-2 text-[10px] font-medium transition-colors",
        active ? "text-brand-orange" : "text-brand-grey"
      )}
    >
      <Icon className={cn("h-5 w-5", active && "stroke-brand-orange")} />
      {label}
    </Link>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-orange border-r-transparent" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  const user = session?.user;

  return (
    <div className="min-h-screen bg-brand-light">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex-col z-30">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <Link
            href="/"
            className="font-playfair text-lg font-bold text-brand-orange tracking-wide"
          >
            See the Unseen
          </Link>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <Avatar name={user?.name} size="md" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-brand-dark truncate">
              {user?.name ?? "Traveller"}
            </p>
            <p className="text-xs text-brand-grey truncate">{user?.email}</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              active={pathname === link.href}
            />
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-full",
              "text-red-500 hover:bg-red-50 transition-colors duration-150"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 h-14">
        <Link
          href="/"
          className="font-playfair text-base font-bold text-brand-orange"
        >
          See the Unseen
        </Link>
        <div className="flex items-center gap-3">
          <Avatar name={user?.name} size="sm" />
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-14 inset-x-0 z-30 bg-white border-b border-gray-100 shadow-lg">
          <div className="px-4 py-3">
            <p className="text-sm font-semibold text-brand-dark">{user?.name ?? "Traveller"}</p>
            <p className="text-xs text-brand-grey">{user?.email}</p>
          </div>
          <nav className="px-4 pb-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "bg-brand-orange/10 text-brand-orange"
                    : "text-brand-charcoal hover:bg-gray-100"
                )}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign Out
            </button>
          </nav>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="md:pl-64 pt-14 md:pt-0 min-h-screen">
        <div className="p-6 bg-brand-light min-h-screen">{children}</div>
      </main>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 flex safe-area-inset-bottom">
        {NAV_LINKS.map((link) => (
          <BottomTab
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            active={pathname === link.href}
          />
        ))}
      </nav>
    </div>
  );
}
