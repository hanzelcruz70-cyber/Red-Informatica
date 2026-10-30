import type { Metadata } from "next";
import { metaPagina } from "@/lib/site";
import PageShell from "@/components/PageShell";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = metaPagina("/servicios", "Reparación de computadoras y laptops en Sébaco", "Reparación de computadoras y laptops, cambio a disco SSD, ampliación de RAM, formateo, limpieza y optimización de PC en Sébaco, Matagalpa. Diagnóstico en 24 a 48 horas.");

export default function ServiciosPage() {
  return (
    <PageShell>
      <Services />
      <Process />
      <FAQ />
    </PageShell>
  );
}
