import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import { Providers } from "@/components/shared/Providers";
import { SiteLayout } from "@/components/shared/SiteLayout";
import "./globals.css";

/* ─── Google Fonts (next/font injects CSS vars on <html>) ─── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--nf-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--nf-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--nf-inter",
  display: "swap",
});

/* ─── Site-wide Metadata ─── */
export const metadata: Metadata = {
  title: {
    default: "See the Unseen | Luxury Travel Experiences",
    template: "%s | See the Unseen",
  },
  description:
    "Curated luxury travel experiences across India, Asia & beyond. Expert-designed tours, authentic encounters, and extraordinary moments crafted for discerning travellers.",
  keywords: [
    "luxury travel",
    "India tours",
    "curated travel experiences",
    "bespoke tours",
    "See the Unseen",
    "scenic escapes",
    "blue escapes",
    "wellness travel",
  ],
  authors: [{ name: "See the Unseen Travels" }],
  creator: "See the Unseen Travels",
  metadataBase: new URL("https://seetheunseen.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://seetheunseen.in",
    siteName: "See the Unseen",
    title: "See the Unseen | Luxury Travel Experiences",
    description:
      "Curated luxury travel experiences across India, Asia & beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "See the Unseen | Luxury Travel Experiences",
    description:
      "Curated luxury travel experiences across India, Asia & beyond.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <Providers>
          <SiteLayout>
            {children}
          </SiteLayout>
        </Providers>
      </body>
    </html>
  );
}
