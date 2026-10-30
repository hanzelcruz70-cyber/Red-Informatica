import type { Metadata } from "next";
import { metaPagina } from "@/lib/site";
import PageShell from "@/components/PageShell";
import Cases from "@/components/Cases";

export const metadata: Metadata = metaPagina("/casos", "Casos reales de reparación y optimización de PC", "Videos de trabajos reales en Sébaco: una laptop que pasó de 12 minutos a 53 segundos para encender, limpieza de archivos basura e instalaciones a distancia.");

export default function CasosPage() {
  return (
    <PageShell>
      <Cases />
    </PageShell>
  );
}
