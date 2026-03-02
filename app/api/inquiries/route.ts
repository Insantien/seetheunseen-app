/**
 * POST /api/inquiries — Submit a new travel inquiry
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { authOptions } from "@/lib/auth";
import {
  sendInquiryConfirmation,
  sendInquiryAlert,
} from "@/lib/email/transactional";

const InquirySchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  tourId: z.string().optional(),
  tourTitle: z.string().optional(),
  destinationId: z.string().optional(),
  destinationTitle: z.string().optional(),
  numAdults: z.number().int().min(1).max(30).default(1),
  numChildren: z.number().int().min(0).max(20).default(0),
  preferredMonth: z.string().optional(),
  preferredDates: z.string().optional(),
  message: z.string().max(2000).optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

function generateRefNo(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `STU-${ts}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = InquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const session = await getServerSession(authOptions);
    const referenceNo = generateRefNo();

    // Persist to DB
    const inquiry = await prisma.inquiry.create({
      data: {
        referenceNo,
        userId: session?.user?.id ?? null,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        tourId: data.tourId,
        tourTitle: data.tourTitle,
        destinationId: data.destinationId,
        destinationTitle: data.destinationTitle,
        numAdults: data.numAdults,
        numChildren: data.numChildren,
        preferredMonth: data.preferredMonth,
        preferredDates: data.preferredDates,
        message: data.message,
        source: data.source,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
      },
    });

    // Send emails (fire-and-forget — don't block the response)
    Promise.allSettled([
      sendInquiryConfirmation({ ...data, referenceNo }),
      sendInquiryAlert({ ...data, referenceNo }),
    ]).catch(console.error);

    // Sync to HubSpot (fire-and-forget)
    if (process.env.HUBSPOT_ACCESS_TOKEN) {
      syncToHubSpot({ ...data, referenceNo, inquiryId: inquiry.id }).catch(
        console.error
      );
    }

    return NextResponse.json({ ok: true, data: { referenceNo, id: inquiry.id } }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/inquiries]", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/* ─── HubSpot Deal Sync ─── */
async function syncToHubSpot(data: {
  fullName: string;
  email: string;
  phone: string;
  tourTitle?: string;
  preferredMonth?: string;
  referenceNo: string;
  inquiryId: string;
}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
  };

  // 1. Upsert contact
  const contactRes = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        inputs: [
          {
            idProperty: "email",
            id: data.email,
            properties: {
              email: data.email,
              firstname: data.fullName.split(" ")[0],
              lastname: data.fullName.split(" ").slice(1).join(" "),
              phone: data.phone,
            },
          },
        ],
      }),
    }
  );
  const contactData = await contactRes.json();
  const contactId = contactData.results?.[0]?.id;

  // 2. Create deal
  const dealRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
    method: "POST",
    headers,
    body: JSON.stringify({
      properties: {
        dealname: `${data.fullName} — ${data.tourTitle ?? "General Inquiry"} (${data.referenceNo})`,
        dealstage: "appointmentscheduled",
        pipeline: "default",
        preferred_travel_month: data.preferredMonth ?? "",
        inquiry_reference: data.referenceNo,
      },
    }),
  });
  const dealData = await dealRes.json();
  const dealId = dealData.id;

  // 3. Associate deal with contact
  if (contactId && dealId) {
    await fetch(
      `https://api.hubapi.com/crm/v4/objects/deals/${dealId}/associations/contacts/${contactId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          associationCategory: "HUBSPOT_DEFINED",
          associationTypeId: 3,
        }),
      }
    );
  }

  // 4. Store HubSpot deal ID in DB
  if (dealId) {
    await prisma.inquiry.update({
      where: { id: data.inquiryId },
      data: { hubspotDealId: dealId },
    });
  }
}
