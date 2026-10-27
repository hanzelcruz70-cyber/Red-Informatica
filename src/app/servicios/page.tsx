import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Reparación de computadoras y laptops, optimización de PC, instalación de software y diseño web en Sébaco, Matagalpa.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <PageShell>
      <Services />
      <Process />
      <FAQ />
    </PageShell>
  );
}
