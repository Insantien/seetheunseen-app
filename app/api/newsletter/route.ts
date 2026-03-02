/**
 * POST /api/newsletter — Subscribe to newsletter
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const Schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email, name } = parsed.data;

    // Upsert (silently succeed if already subscribed)
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { name: name ?? undefined },
      create: { email, name, confirmedAt: new Date() },
    });

    // Sync to HubSpot marketing list (fire-and-forget)
    if (process.env.HUBSPOT_ACCESS_TOKEN) {
      fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: [
            {
              idProperty: "email",
              id: email,
              properties: {
                email,
                firstname: name ?? "",
                newsletter_subscribed: "true",
              },
            },
          ],
        }),
      }).catch(console.error);
    }

    return NextResponse.json({ ok: true, data: { subscribed: true } });
  } catch (error) {
    console.error("[POST /api/newsletter]", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
