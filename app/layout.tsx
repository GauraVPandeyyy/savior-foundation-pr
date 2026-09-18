import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SAVIOR Healthcare Foundation | Heart Care & Community Health",
    template: "%s | SAVIOR Healthcare Foundation",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [
      { url: "/brand/logo-full.png", alt: "SAVIOR Healthcare Foundation" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/brand/logo-full.png"],
  },
  robots: site.hasLiveDomain
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: { icon: "/brand/favicon.png", apple: "/brand/app-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    foundingDate: "2022",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "L 11/280, Sector-G, LDA, Kanpur Road, LDA Colony S.O",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226012",
      addressCountry: "IN",
    },
    logo: `${site.url}/brand/logo-full.png`,
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sourceSans.variable} ${sourceSerif.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJson) }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
