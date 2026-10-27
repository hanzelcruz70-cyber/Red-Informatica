import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Cases from "@/components/Cases";

export const metadata: Metadata = {
  title: "Casos reales",
  description: "Videos de trabajos reales: laptops que pasaron de 12 minutos a 53 segundos para encender, limpieza de archivos basura e instalaciones a distancia.",
  alternates: { canonical: "/casos" },
};

export default function CasosPage() {
  return (
    <PageShell>
      <Cases />
    </PageShell>
  );
}
