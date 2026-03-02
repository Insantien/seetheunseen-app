-- ═══════════════════════════════════════════════════════════
--  See the Unseen — Database Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

CREATE TYPE "InquiryStatus" AS ENUM (
  'RECEIVED', 'IN_REVIEW', 'QUOTE_SENT', 'CONFIRMED', 'CLOSED'
);

CREATE TABLE "User" (
  "id"            TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name"          TEXT,
  "email"         TEXT NOT NULL UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  "image"         TEXT,
  "phone"         TEXT,
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

CREATE TABLE "Account" (
  "id"                TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId"            TEXT NOT NULL,
  "type"              TEXT NOT NULL,
  "provider"          TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token"     TEXT,
  "access_token"      TEXT,
  "expires_at"        INTEGER,
  "token_type"        TEXT,
  "scope"             TEXT,
  "id_token"          TEXT,
  "session_state"     TEXT,
  PRIMARY KEY ("id"),
  UNIQUE ("provider", "providerAccountId"),
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "Session" (
  "id"           TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId"       TEXT NOT NULL,
  "expires"      TIMESTAMPTZ NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token"      TEXT NOT NULL UNIQUE,
  "expires"    TIMESTAMPTZ NOT NULL,
  UNIQUE ("identifier", "token")
);

CREATE TABLE "Wishlist" (
  "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId"    TEXT NOT NULL,
  "tourId"    TEXT NOT NULL,
  "tourSlug"  TEXT NOT NULL,
  "tourTitle" TEXT NOT NULL,
  "tourImage" TEXT,
  "addedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  UNIQUE ("userId", "tourId"),
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "Inquiry" (
  "id"               TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "referenceNo"      TEXT NOT NULL UNIQUE,
  "userId"           TEXT,
  "fullName"         TEXT NOT NULL,
  "email"            TEXT NOT NULL,
  "phone"            TEXT NOT NULL,
  "tourId"           TEXT,
  "tourTitle"        TEXT,
  "destinationId"    TEXT,
  "destinationTitle" TEXT,
  "numAdults"        INTEGER NOT NULL DEFAULT 1,
  "numChildren"      INTEGER NOT NULL DEFAULT 0,
  "preferredMonth"   TEXT,
  "preferredDates"   TEXT,
  "message"          TEXT,
  "source"           TEXT,
  "utmSource"        TEXT,
  "utmMedium"        TEXT,
  "utmCampaign"      TEXT,
  "status"           "InquiryStatus" NOT NULL DEFAULT 'RECEIVED',
  "hubspotDealId"    TEXT,
  "internalNotes"    TEXT,
  "createdAt"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);

CREATE TABLE "BrochureDownload" (
  "id"           TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId"       TEXT,
  "email"        TEXT NOT NULL,
  "name"         TEXT NOT NULL,
  "type"         TEXT NOT NULL,
  "contentId"    TEXT NOT NULL,
  "contentSlug"  TEXT NOT NULL,
  "downloadedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);

CREATE TABLE "NewsletterSubscriber" (
  "id"          TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "email"       TEXT NOT NULL UNIQUE,
  "name"        TEXT,
  "confirmedAt" TIMESTAMPTZ,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

-- Indexes
CREATE INDEX "idx_inquiry_email"   ON "Inquiry"("email");
CREATE INDEX "idx_inquiry_status"  ON "Inquiry"("status");
CREATE INDEX "idx_inquiry_created" ON "Inquiry"("createdAt" DESC);
CREATE INDEX "idx_wishlist_user"   ON "Wishlist"("userId");

-- Auto-update updatedAt trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW."updatedAt" = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "User_updated_at"    BEFORE UPDATE ON "User"    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER "Inquiry_updated_at" BEFORE UPDATE ON "Inquiry" FOR EACH ROW EXECUTE FUNCTION update_updated_at();
