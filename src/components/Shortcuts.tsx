import Link from "next/link";
import { ArrowRight, CalendarCheck, PlayCircle, Star, Wrench } from "lucide-react";

const ATAJOS = [
  {
    href: "/servicios",
    titulo: "Servicios",
    texto: "Reparación, optimización, instalación de software y páginas web.",
    icono: Wrench,
    color: "bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white shadow-sm",
  },
  {
    href: "/programas",
    titulo: "Programas",
    texto: "Office, Adobe, AutoCAD, Revit y muchos más. Reserva tu instalación.",
    icono: CalendarCheck,
    color: "bg-gradient-to-br from-[#22C55E] to-[#15803D] text-white shadow-sm",
  },
  {
    href: "/casos",
    titulo: "Casos reales",
    texto: "Mira en video cómo quedaron las compus de nuestros clientes.",
    icono: PlayCircle,
    color: "bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white shadow-sm",
  },
  {
    href: "/resenas",
    titulo: "Reseñas",
    texto: "Lo que dicen nuestros clientes y deja tu propia opinión.",
    icono: Star,
    color: "bg-gradient-to-br from-[#FBBF24] to-[#D97706] text-white shadow-sm",
  },
];

/** Accesos rápidos de la página de inicio hacia cada sección. */
export default function Shortcuts() {
  return (
    <section className="w-full py-space-3xl bg-surface-container-low/60">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="max-w-2xl space-y-space-2xs mb-space-xl">
          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Explora</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">¿Qué necesitas hoy?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {ATAJOS.map(({ href, titulo, texto, icono: Icono, color }) => (
            <Link
              key={href}
              href={href}
              className="group p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-sm"
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                <Icono className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">{titulo}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex-1">{texto}</p>
              <span className="inline-flex items-center gap-space-2xs text-primary font-body-sm text-body-sm font-semibold">
                Ver más
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
