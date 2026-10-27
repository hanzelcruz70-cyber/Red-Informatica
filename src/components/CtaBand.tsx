import Link from "next/link";
import { waLink } from "@/lib/site";

/** Banda final de contacto que aparece al pie de cada página. */
export default function CtaBand() {
  return (
    <section className="w-full py-space-2xl">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="rounded-2xl bg-[#002eb4] dark:bg-[#132a7a] text-white px-space-lg py-space-xl md:px-space-2xl flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
          <div className="space-y-space-2xs max-w-2xl">
            <h2 className="font-headline-md text-headline-sm md:text-headline-md">¿Tu compu está lenta o necesitas un programa?</h2>
            <p className="font-body-md text-body-md text-white/80">
              Escríbenos y te decimos cómo lo resolvemos, en nuestro taller en Sébaco o a distancia.
            </p>
          </div>
          <div className="flex flex-wrap gap-space-sm shrink-0">
            <a
              href={waLink("Hola, quiero solicitar un diagnóstico de RED INFORMÁTICA.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-space-lg rounded-lg bg-[#25D366] hover:bg-[#1fb457] text-white font-body-md text-body-md font-semibold transition-colors"
            >
              Escríbenos por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center h-12 px-space-lg rounded-lg bg-white/10 hover:bg-white/20 text-white font-body-md text-body-md font-semibold transition-colors"
            >
              Formulario de contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
