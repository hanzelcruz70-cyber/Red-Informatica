import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Programs from "@/components/Programs";

export const metadata: Metadata = {
  title: "Programas que instalamos",
  description: "Instalación de Office, Adobe, AutoCAD, Revit, Lumion, SketchUp y más. Reserva tu instalación en Sébaco o a distancia.",
  alternates: { canonical: "/programas" },
};

export default function ProgramasPage() {
  return (
    <PageShell>
      <Programs />
    </PageShell>
  );
}
