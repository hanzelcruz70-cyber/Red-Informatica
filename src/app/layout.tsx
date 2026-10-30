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
    default: "Red Informática Sébaco | Soporte Técnico y Reparación de Computadoras",
    template: "%s | Red Informática Sébaco",
  },
  description:
    "Red Informática en Sébaco, Matagalpa: soporte técnico, reparación y optimización de computadoras y laptops, instalación de programas (Office, Adobe, AutoCAD) y diseño web. Atención en taller y a distancia.",
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
    "Red Informática",
    "Red Informática Sébaco",
    "técnico de computadoras Sébaco",
    "reparación de laptops Matagalpa",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_NI",
    siteName: "Red Informática",
    title: "Red Informática Sébaco | Soporte Técnico y Reparación de Computadoras",
    description:
      "Reparación de computadoras y laptops, optimización de PC, instalación de programas y diseño web en Sébaco, Matagalpa.",
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
  name: "Red Informática",
  alternateName: ["RED INFORMÁTICA", "Red Informática Sébaco"],
  image: `${siteUrl}/logo.png`,
  logo: `${siteUrl}/logo.png`,
  description:
    "Soporte técnico informático, reparación de computadoras y laptops, optimización de sistemas, instalación de software y diseño web profesional.",
  email: "redinformaticatotal@gmail.com",
  telephone: "+50589188813",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Barrio Tomás Borge, de la escuelita Tomás Borge una cuadra al sur",
    postalCode: "62200",
    addressLocality: "Sébaco",
    addressRegion: "Matagalpa",
    addressCountry: "NI",
  },
  areaServed: [
    { "@type": "City", name: "Sébaco" },
    { "@type": "City", name: "Matagalpa" },
    { "@type": "Country", name: "Nicaragua" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Red Informática",
    itemListElement: [
      "Reparación de computadoras y laptops",
      "Cambio a disco SSD y ampliación de memoria RAM",
      "Formateo, limpieza y optimización de PC",
      "Instalación de Windows, Office, Adobe y AutoCAD",
      "Soporte técnico a distancia",
      "Diseño y desarrollo de páginas web",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
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

const webSiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Red Informática",
  alternateName: ["RED INFORMÁTICA", "Red Informática Sébaco"],
  url: siteUrl,
  inLanguage: "es",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }}
        />
        {children}
      </body>
    </html>
  );
}
