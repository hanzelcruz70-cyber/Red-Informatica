import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Contact from "@/components/Contact";
import MapSection from "@/components/MapSection";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Solicita un diagnóstico o cotización. Escríbenos por WhatsApp al +505 8918-8813 o llena el formulario.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <PageShell cta={false}>
      <Contact />
      <MapSection />
    </PageShell>
  );
}
