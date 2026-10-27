import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RED INFORMÁTICA | Soporte Técnico, Reparación y Diseño Web",
    template: "%s | RED INFORMÁTICA",
  },
  description:
    "Soporte técnico informático, reparación de hardware, optimización de sistemas, instalación de software y diseño web profesional. Diagnóstico express y garantía por escrito.",
  keywords: [
    "soporte técnico",
    "reparación de computadoras",
    "optimización PC",
    "instalación de software",
    "diseño web",
    "Nicaragua",
    "Sébaco",
    "Matagalpa",
    "instalación de programas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_NI",
    siteName: "RED INFORMÁTICA",
    title: "RED INFORMÁTICA | Soluciones Tecnológicas Integrales",
    description:
      "Soporte técnico, reparación avanzada de hardware, optimización de sistemas y desarrollo web profesional.",
    url: siteUrl,
  },
  robots: { index: true, follow: true },
  verification: {
    google: "Y1SjT4bsLW7WUn-fkQpkfNqyBDPEw6grN1aAB6hqkK8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "RED INFORMÁTICA",
  description:
    "Soporte técnico informático, reparación de computadoras y laptops, optimización de sistemas, instalación de software y diseño web profesional.",
  email: "redinformaticatotal@gmail.com",
  telephone: "+50589188813",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sébaco",
    addressRegion: "Matagalpa",
    addressCountry: "NI",
  },
  areaServed: ["Sébaco", "Matagalpa", "Nicaragua"],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61594252049186",
    "https://www.tiktok.com/@red_informatica",
    "https://maps.app.goo.gl/5Pwhh4GSEkdMJ47F8",
  ],
  hasMap: "https://maps.app.goo.gl/5Pwhh4GSEkdMJ47F8",
  geo: { "@type": "GeoCoordinates", latitude: 12.8579, longitude: -86.1089 },
  priceRange: "$$",
  knowsAbout: [
    "Reparación de computadoras",
    "Optimización de sistemas",
    "Instalación de software",
    "Diseño y desarrollo web",
  ],
};

const TEMA_SCRIPT = `try{var t=localStorage.getItem("tema");if(t==="oscuro"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#002eb4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${hanken.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Aplica el tema guardado (o el del sistema) antes de pintar, para evitar parpadeo. */}
        <script dangerouslySetInnerHTML={{ __html: TEMA_SCRIPT }} />
      </head>
      <body className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
