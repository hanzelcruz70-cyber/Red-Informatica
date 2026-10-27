import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Proyectos web",
  description: "Páginas web y aplicaciones desarrolladas por RED INFORMÁTICA para negocios reales.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  return (
    <PageShell>
      <Projects />
    </PageShell>
  );
}
