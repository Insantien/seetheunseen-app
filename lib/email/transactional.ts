/**
 * Transactional email via Google Workspace SMTP (stunstravel.in)
 * Uses Nodemailer under the hood.
 * Marketing emails are handled separately via HubSpot.
 */

import nodemailer from "nodemailer";

// ─── Transport ────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,     // e.g. hello@stunstravel.in
    pass: process.env.SMTP_PASSWORD, // Google Workspace app password
  },
});

const FROM_ADDRESS = `"See the Unseen" <${process.env.SMTP_USER}>`;

// ─── Types ────────────────────────────────────────────────

interface InquiryEmailData {
  fullName: string;
  email: string;
  phone: string;
  tourTitle?: string;
  numAdults: number;
  numChildren: number;
  preferredMonth?: string;
  message?: string;
  referenceNo: string;
}

// ─── Templates ────────────────────────────────────────────

/**
 * Send a confirmation email to the customer after they submit an inquiry.
 */
export async function sendInquiryConfirmation(data: InquiryEmailData) {
  const subject = `We've received your inquiry — Ref #${data.referenceNo}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject}</title>
    </head>
    <body style="margin:0;padding:0;background:#F7F8FA;font-family:Georgia,serif;color:#333;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#FF8C42,#FF6F61);padding:32px 40px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-family:Georgia,serif;font-size:24px;font-weight:700;letter-spacing:0.5px;">
                  See the Unseen
                </h1>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:13px;letter-spacing:1px;text-transform:uppercase;">
                  Luxury Travel Experiences
                </p>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Dear ${data.fullName},</p>
                <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">
                  Thank you for reaching out. We've received your travel inquiry and one of our expert travel designers will be in touch within <strong>24 hours</strong>.
                </p>

                <!-- Reference Box -->
                <div style="background:#F7F8FA;border-left:3px solid #FF8C42;border-radius:4px;padding:16px 20px;margin:0 0 24px;">
                  <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#999;">Reference Number</p>
                  <p style="margin:0;font-size:20px;font-weight:700;color:#FF8C42;font-family:Georgia,serif;">${data.referenceNo}</p>
                </div>

                <!-- Summary -->
                <h3 style="font-family:Georgia,serif;font-size:16px;color:#333;margin:0 0 12px;border-bottom:1px solid #eee;padding-bottom:8px;">Your Inquiry Summary</h3>
                <table style="width:100%;border-collapse:collapse;">
                  ${data.tourTitle ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Tour</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:14px;font-weight:600;">${data.tourTitle}</td></tr>` : ""}
                  <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Travellers</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:14px;">${data.numAdults} adult${data.numAdults !== 1 ? "s" : ""}${data.numChildren ? `, ${data.numChildren} child${data.numChildren !== 1 ? "ren" : ""}` : ""}</td></tr>
                  ${data.preferredMonth ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Preferred Month</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:14px;">${data.preferredMonth}</td></tr>` : ""}
                  <tr><td style="padding:8px 0;color:#666;font-size:14px;">Contact</td><td style="padding:8px 0;font-size:14px;">${data.phone}</td></tr>
                </table>

                <p style="font-size:15px;line-height:1.7;margin:24px 0 0;color:#555;">
                  In the meantime, feel free to explore more of our curated experiences at
                  <a href="https://seetheunseen.in" style="color:#FF8C42;text-decoration:none;">seetheunseen.in</a>.
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background:#F7F8FA;padding:24px 40px;text-align:center;border-top:1px solid #eee;">
                <p style="margin:0 0 4px;font-size:13px;color:#999;">See the Unseen Travels</p>
                <p style="margin:0;font-size:12px;color:#bbb;">seetheunseen.in · hello@stunstravel.in</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: FROM_ADDRESS,
    to: data.email,
    subject,
    html,
  });
}

/**
 * Send an internal alert to the team when a new inquiry is submitted.
 */
export async function sendInquiryAlert(data: InquiryEmailData) {
  const subject = `New Inquiry: ${data.tourTitle ?? "General"} — ${data.fullName} (Ref ${data.referenceNo})`;

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#333;max-width:600px;">
      <h2 style="color:#FF8C42;">New Inquiry Received</h2>
      <table style="border-collapse:collapse;width:100%;">
        <tr><td style="padding:8px;border:1px solid #eee;background:#f9f9f9;width:140px;"><strong>Reference</strong></td><td style="padding:8px;border:1px solid #eee;">${data.referenceNo}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;background:#f9f9f9;"><strong>Name</strong></td><td style="padding:8px;border:1px solid #eee;">${data.fullName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;background:#f9f9f9;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #eee;">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;background:#f9f9f9;"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #eee;">${data.phone}</td></tr>
        ${data.tourTitle ? `<tr><td style="padding:8px;border:1px solid #eee;background:#f9f9f9;"><strong>Tour</strong></td><td style="padding:8px;border:1px solid #eee;">${data.tourTitle}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #eee;background:#f9f9f9;"><strong>Travellers</strong></td><td style="padding:8px;border:1px solid #eee;">${data.numAdults} adult(s), ${data.numChildren} child(ren)</td></tr>
        ${data.preferredMonth ? `<tr><td style="padding:8px;border:1px solid #eee;background:#f9f9f9;"><strong>Month</strong></td><td style="padding:8px;border:1px solid #eee;">${data.preferredMonth}</td></tr>` : ""}
        ${data.message ? `<tr><td style="padding:8px;border:1px solid #eee;background:#f9f9f9;"><strong>Message</strong></td><td style="padding:8px;border:1px solid #eee;">${data.message}</td></tr>` : ""}
      </table>
      <p style="margin-top:16px;"><a href="${process.env.NEXTAUTH_URL}/admin/inquiries" style="color:#FF8C42;">View in Admin Dashboard →</a></p>
    </div>
  `;

  return transporter.sendMail({
    from: FROM_ADDRESS,
    to: process.env.INQUIRY_ALERT_EMAIL ?? process.env.SMTP_USER!,
    subject,
    html,
  });
}

/**
 * Send a magic-link / OTP sign-in email (used by NextAuth Email provider).
 */
export async function sendSignInEmail({
  url,
  email,
}: {
  url: string;
  email: string;
}) {
  const subject = "Sign in to See the Unseen";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /></head>
    <body style="margin:0;padding:0;background:#F7F8FA;font-family:Georgia,serif;color:#333;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;padding:40px 0;">
        <tr><td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
            <tr>
              <td style="background:linear-gradient(135deg,#FF8C42,#FF6F61);padding:28px 40px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">See the Unseen</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:40px;text-align:center;">
                <h2 style="font-family:Georgia,serif;font-size:22px;margin:0 0 16px;">Sign in to your account</h2>
                <p style="font-size:15px;line-height:1.7;color:#555;margin:0 0 32px;">
                  Click the button below to sign in. This link expires in 24 hours and can only be used once.
                </p>
                <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#FF8C42,#FF6F61);color:white;text-decoration:none;font-weight:600;padding:14px 36px;border-radius:9999px;font-size:15px;">
                  Sign In →
                </a>
                <p style="margin:24px 0 0;font-size:13px;color:#aaa;">
                  If you didn't request this email, you can safely ignore it.
                </p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: FROM_ADDRESS,
    to: email,
    subject,
    html,
  });
}

/**
 * Send a brochure download notification to the user.
 */
export async function sendBrochureEmail({
  email,
  name,
  contentTitle,
  downloadUrl,
}: {
  email: string;
  name: string;
  contentTitle: string;
  downloadUrl: string;
}) {
  const subject = `Your "${contentTitle}" brochure is ready`;

  const html = `
    <div style="font-family:Georgia,serif;color:#333;max-width:600px;margin:0 auto;padding:40px 20px;">
      <h2 style="color:#FF8C42;">Your Brochure is Ready</h2>
      <p>Dear ${name},</p>
      <p>Your brochure for <strong>${contentTitle}</strong> is ready to download.</p>
      <p style="text-align:center;margin:32px 0;">
        <a href="${downloadUrl}" style="background:linear-gradient(135deg,#FF8C42,#FF6F61);color:white;text-decoration:none;padding:14px 32px;border-radius:9999px;font-weight:600;font-size:15px;">
          Download Brochure
        </a>
      </p>
      <p style="color:#999;font-size:13px;">This link is valid for 7 days.</p>
    </div>
  `;

  return transporter.sendMail({
    from: FROM_ADDRESS,
    to: email,
    subject,
    html,
  });
}
