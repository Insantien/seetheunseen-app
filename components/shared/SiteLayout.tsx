"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

/**
 * Conditionally renders Navbar + Footer.
 * The Sanity Studio at /studio renders its own full-page UI,
 * so we skip the site chrome there.
 */
export function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
