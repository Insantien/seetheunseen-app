"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LoginClient() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<"google" | "facebook" | "email" | null>(null);
  const [isSent, setIsSent] = useState(false);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setIsLoading("email");
    try {
      await signIn("email", { email, callbackUrl: "/account", redirect: false });
      setIsSent(true);
    } finally {
      setIsLoading(null);
    }
  }

  async function handleGoogle() {
    setIsLoading("google");
    await signIn("google", { callbackUrl: "/account" });
  }

  async function handleFacebook() {
    setIsLoading("facebook");
    await signIn("facebook", { callbackUrl: "/account" });
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left: brand panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-stone-900 to-brand-dark overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-brand-coral/10 blur-3xl" />

        <div className="relative z-10 max-w-md px-12 text-center">
          <p className="font-playfair text-3xl italic text-white/30 mb-6">&ldquo;</p>
          <blockquote className="font-lora text-xl leading-relaxed text-white/80">
            Travel is the only thing you buy that makes you richer — not in gold,
            but in stories, people, and places that quietly become part of you.
          </blockquote>
          <p className="font-playfair text-3xl italic text-white/30 mt-6">&rdquo;</p>
          <div className="mt-10 h-px w-16 bg-brand-orange/60 mx-auto" />
          <p className="mt-6 font-sans text-sm tracking-widest text-brand-orange/80 uppercase">
            See the Unseen
          </p>
        </div>
      </div>

      {/* ── Right: login form ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link
            href="/"
            className="font-playfair text-2xl font-bold text-brand-orange tracking-wide block mb-8"
          >
            See the Unseen
          </Link>

          <h1 className="font-playfair text-3xl font-bold text-brand-dark mb-2">
            Welcome Back
          </h1>
          <p className="text-brand-grey text-sm mb-8">
            Sign in to access your travel dashboard
          </p>

          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogle}
              disabled={isLoading !== null}
              className={cn(
                "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl",
                "bg-white border border-gray-200 shadow-sm",
                "text-sm font-medium text-brand-charcoal",
                "hover:bg-gray-50 hover:shadow-md transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading === "google" ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-r-transparent" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </button>

            <button
              onClick={handleFacebook}
              disabled={isLoading !== null}
              className={cn(
                "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl",
                "bg-white border border-gray-200 shadow-sm",
                "text-sm font-medium text-brand-charcoal",
                "hover:bg-gray-50 hover:shadow-md transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading === "facebook" ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-r-transparent" />
              ) : (
                <FacebookIcon />
              )}
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-brand-grey">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email form */}
          {isSent ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
              <p className="text-emerald-800 font-semibold text-sm mb-1">
                Check your email!
              </p>
              <p className="text-emerald-700 text-sm">
                A sign-in link has been sent to{" "}
                <span className="font-medium">{email}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brand-charcoal mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border border-gray-200",
                    "text-sm text-brand-dark placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange",
                    "transition-all duration-200"
                  )}
                />
                <p className="mt-2 text-xs text-brand-grey">
                  We&apos;ll send you a secure sign-in link — no password needed
                </p>
              </div>

              <Button
                type="submit"
                variant="brand"
                fullWidth
                loading={isLoading === "email"}
                disabled={!email || isLoading !== null}
              >
                Send Sign-In Link
              </Button>
            </form>
          )}

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-brand-grey">
            New here?{" "}
            <Link
              href="/register"
              className="text-brand-orange hover:underline font-medium"
            >
              Create an account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
