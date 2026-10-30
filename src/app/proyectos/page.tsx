import type { Metadata } from "next";
import { metaPagina } from "@/lib/site";
import PageShell from "@/components/PageShell";
import Projects from "@/components/Projects";

export const metadata: Metadata = metaPagina("/proyectos", "Diseño de páginas web en Nicaragua", "Páginas web y aplicaciones desarrolladas por Red Informática (Sébaco) para negocios reales en Nicaragua.");

export default function ProyectosPage() {
  return (
    <PageShell>
      <Projects />
    </PageShell>
  );
}
