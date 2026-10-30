import type { Metadata } from "next";
import { metaPagina } from "@/lib/site";
import PageShell from "@/components/PageShell";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = metaPagina("/resenas", "Reseñas de clientes", "Opiniones reales de clientes de Red Informática en Sébaco, verificadas con enlace único y reseñas de Google Maps.");

// Las reseñas aprobadas se refrescan cada 5 minutos (o al instante al aprobarlas en el panel).
export const revalidate = 300;

export default function ResenasPage() {
  return (
    <PageShell>
      <Reviews />
    </PageShell>
  );
}
