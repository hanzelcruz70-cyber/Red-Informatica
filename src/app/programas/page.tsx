import type { Metadata } from "next";
import { metaPagina } from "@/lib/site";
import PageShell from "@/components/PageShell";
import Programs from "@/components/Programs";

export const metadata: Metadata = metaPagina("/programas", "Instalación de programas en Sébaco: Office, AutoCAD y Adobe", "Instalamos Windows, Office, Adobe (Photoshop, Illustrator, Premiere), AutoCAD, Revit, Lumion, SketchUp y antivirus en Sébaco, Matagalpa o a distancia.");

export default function ProgramasPage() {
  return (
    <PageShell>
      <Programs />
    </PageShell>
  );
}
