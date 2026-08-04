import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { SiteShell } from "@/components/layout";
import { Providers } from "@/components/providers/Providers";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo";
import { SITE_SETTINGS } from "@/data/settings";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300"],
  style: ["normal", "italic"],
  adjustFontFallback: true,
  /** Display face for hero LCP — preload */
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500"],
  adjustFontFallback: true,
  /** Defer body font so it does not compete with LCP media */
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_SETTINGS.url),
  title: {
    default: SITE_SETTINGS.name,
    template: `%s · ${SITE_SETTINGS.name}`,
  },
  description: SITE_SETTINGS.description,
  applicationName: SITE_SETTINGS.name,
  authors: [{ name: SITE_SETTINGS.name, url: SITE_SETTINGS.url }],
  creator: SITE_SETTINGS.name,
  publisher: SITE_SETTINGS.name,
  openGraph: {
    type: "website",
    locale: SITE_SETTINGS.locale,
    siteName: SITE_SETTINGS.name,
    title: SITE_SETTINGS.name,
    description: SITE_SETTINGS.description,
    url: SITE_SETTINGS.url,
    images: [
      {
        url: SITE_SETTINGS.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SITE_SETTINGS.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SETTINGS.name,
    description: SITE_SETTINGS.description,
    images: [SITE_SETTINGS.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: SITE_SETTINGS.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
