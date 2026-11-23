import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/config";
import { demoNoindex } from "@/config/security";
import { tokens } from "@/config/tokens";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "en_AU", type: "website" },
  // DEMO_NOINDEX=true keeps preview deployments out of search results (also robots.txt + X-Robots-Tag).
  ...(demoNoindex && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = { themeColor: tokens.charcoal };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh bg-charcoal font-sans text-white">
        <a
          href="#main"
          className="sr-only z-[60] rounded-btn bg-safety px-4 py-3 font-bold text-charcoal focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
