import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Fuente del logo original de Aníbal Delisa.
const serpentine = localFont({
  src: "./fonts/serpentine-d-bold.ttf",
  variable: "--font-serpentine",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Aníbal Delisa | Taller Mecánico Multimarca Montevideo | 53 años de experiencia",
    template: "%s | Aníbal Delisa",
  },
  description: site.description,
  keywords: [
    "taller mecánico Montevideo",
    "service Peugeot Montevideo",
    "service Citroën Uruguay",
    "service BYD Montevideo",
    "chapa y pintura Montevideo",
    "alineación y balanceo Montevideo",
    "mecánica multimarca Uruguay",
  ],
  authors: [{ name: site.name }],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: site.url,
    siteName: site.name,
    title: "Aníbal Delisa | Taller Mecánico Multimarca Montevideo",
    description: site.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Aníbal Delisa — Taller mecánico multimarca en Montevideo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Schema.org LocalBusiness con las dos ubicaciones.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: "+59824084755",
  email: site.locations.mecanica.email,
  foundingDate: "1973",
  areaServed: "Montevideo, Uruguay",
  image: `${site.url}/og.jpg`,
  hasMap: site.google.mapsUrl,
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.google.rating,
    reviewCount: site.google.reviewCount,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Canelones 2308 esq. Bvar Artigas",
    addressLocality: "Montevideo",
    addressCountry: "UY",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  department: [
    {
      "@type": "AutoRepair",
      name: "Aníbal Delisa — Mecánica",
      telephone: "+59824084755",
      email: site.locations.mecanica.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Canelones 2308 esq. Bvar Artigas",
        addressLocality: "Montevideo",
        addressCountry: "UY",
      },
    },
    {
      "@type": "AutoBodyShop",
      name: "Aníbal Delisa — Chapa y Pintura",
      telephone: "+59824090753",
      email: site.locations.chapa.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Charrúa 2293 esq. Dr. Mario Cassinoni",
        addressLocality: "Montevideo",
        addressCountry: "UY",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-UY"
      className={`${montserrat.variable} ${openSans.variable} ${serpentine.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-dark antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingChat />
        <WhatsAppFloat />
        <GoogleAnalytics gaId={site.ga4Id} />
      </body>
    </html>
  );
}
