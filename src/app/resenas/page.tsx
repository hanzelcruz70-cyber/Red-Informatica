import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Reseñas de clientes",
  description: "Opiniones reales de clientes de RED INFORMÁTICA y formulario para dejar tu reseña.",
  alternates: { canonical: "/resenas" },
};

// Las reseñas aprobadas se refrescan cada 5 minutos (o al instante al aprobarlas en el panel).
export const revalidate = 300;

export default function ResenasPage() {
  return (
    <PageShell>
      <Reviews />
    </PageShell>
  );
}
