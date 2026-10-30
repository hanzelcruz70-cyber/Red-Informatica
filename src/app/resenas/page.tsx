import type { Metadata } from "next";
import { metaPagina } from "@/lib/site";
import PageShell from "@/components/PageShell";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = metaPagina(
  "/resenas",
  "Reseñas de clientes en Google",
  "Reseñas reales de clientes de Red Informática en Sébaco, tomadas de nuestra ficha de Google Maps."
);

export default function ResenasPage() {
  return (
    <PageShell>
      <Reviews />
    </PageShell>
  );
}
