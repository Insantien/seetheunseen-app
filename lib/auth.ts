/**
 * NextAuth v4 configuration
 * Providers: Google, Facebook, Email (magic link via SMTP)
 * Adapter:   Prisma (Supabase PostgreSQL)
 */

import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/db/prisma";
import { sendSignInEmail } from "@/lib/email/transactional";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    EmailProvider({
      server: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: `"See the Unseen" <${process.env.SMTP_USER}>`,
      // Custom magic-link email template
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await sendSignInEmail({ url, email });
      },
    }),
  ],

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    error: "/login",       // Error code passed in query string as ?error=
    verifyRequest: "/login?verify=1", // After email magic link is sent
  },

  callbacks: {
    /**
     * Attach user ID and additional fields to the session object
     * so they're accessible via useSession() and getServerSession()
     */
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Fetch phone from DB if not on the OAuth profile
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { phone: true },
        });
        (session.user as { id: string; phone?: string | null }).phone =
          dbUser?.phone ?? null;
      }
      return session;
    },
  },

  events: {
    /**
     * Sync new users to HubSpot as contacts on first sign-in.
     * Runs asynchronously (fire-and-forget) to avoid blocking the auth flow.
     */
    async createUser({ user }) {
      if (user.email && process.env.HUBSPOT_ACCESS_TOKEN) {
        try {
          await fetch(
            "https://api.hubapi.com/crm/v3/objects/contacts",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
              },
              body: JSON.stringify({
                properties: {
                  email: user.email,
                  firstname: user.name?.split(" ")[0] ?? "",
                  lastname: user.name?.split(" ").slice(1).join(" ") ?? "",
                  website_signup: "true",
                },
              }),
            }
          );
        } catch {
          // Non-critical: don't fail auth if HubSpot is down
          console.warn("[Auth] HubSpot contact sync failed for", user.email);
        }
      }
    },
  },

  debug: process.env.NODE_ENV === "development",
};

/* ─── Type augmentation for session.user.id ─── */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string | null;
    };
  }
}
