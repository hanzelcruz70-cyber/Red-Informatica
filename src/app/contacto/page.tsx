import type { Metadata } from "next";
import { metaPagina } from "@/lib/site";
import PageShell from "@/components/PageShell";
import Contact from "@/components/Contact";
import MapSection from "@/components/MapSection";

export const metadata: Metadata = metaPagina("/contacto", "Contacto y ubicación del taller en Sébaco", "Escríbenos por WhatsApp al +505 8918-8813 o llena el formulario. Taller en Barrio Tomás Borge, Sébaco, Matagalpa. Diagnóstico y cotización sin compromiso.");

export default function ContactoPage() {
  return (
    <PageShell cta={false}>
      <Contact />
      <MapSection />
    </PageShell>
  );
}
