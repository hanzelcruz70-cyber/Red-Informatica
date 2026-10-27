import PageShell from "@/components/PageShell";

export default function LegalPage({
  etiqueta,
  titulo,
  actualizado,
  children,
}: {
  etiqueta: string;
  titulo: string;
  actualizado: string;
  children: React.ReactNode;
}) {
  return (
    <PageShell cta={false}>
        <article className="max-w-[48rem] mx-auto px-gutter-mobile md:px-gutter-tablet py-space-3xl">
          <header className="space-y-space-xs mb-space-xl">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">{etiqueta}</span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">{titulo}</h1>
            <p className="font-label-md text-label-md text-on-surface-variant">Última actualización: {actualizado}</p>
          </header>
          <div className="legal space-y-space-lg text-on-surface-variant font-body-md text-body-md">{children}</div>
        </article>
    </PageShell>
  );
}

export function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-space-sm">
      <h2 className="font-headline-sm text-headline-sm text-on-surface">{titulo}</h2>
      {children}
    </section>
  );
}
