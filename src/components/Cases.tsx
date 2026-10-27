import { CheckCircle2 } from "lucide-react";

const CASOS = [
  {
    video: "/casos/laptop-lenta.mp4",
    poster: "/casos/laptop-lenta.jpg",
    etiqueta: "OPTIMIZACIÓN · WINDOWS · OFFICE",
    titulo: "Laptop que tardaba 12 minutos en encender",
    problema:
      "Una laptop con Intel Pentium B950 de 2 núcleos y 4 GB de RAM tenía Windows 11, un sistema demasiado pesado para ese equipo. Se quedaba en pantalla negra y tardaba 12 minutos en arrancar.",
    trabajo: ["Cambio a Windows 10, más liviano para el equipo", "Optimización completa del sistema", "Instalación de Office"],
    antes: { valor: "12 min", texto: "para encender" },
    despues: { valor: "53 s", texto: "para encender" },
  },
  {
    video: "/casos/office-limpieza.mp4",
    poster: "/casos/office-limpieza.jpg",
    etiqueta: "OFFICE · LIMPIEZA DE BASURA",
    titulo: "Más de 1,300 archivos basura en una sola carpeta",
    problema:
      "Un cliente trajo 2 laptops para instalar Office. Al revisar la primera notamos que estaba lenta: solo en una de las carpetas de archivos temporales había más de 1,300 archivos basura.",
    trabajo: ["Instalación de Word, Excel y PowerPoint", "Limpieza de las carpetas con archivos basura", "Ajustes de rendimiento del sistema"],
    antes: { valor: "+1,300", texto: "archivos basura en una carpeta" },
    despues: { valor: "Limpia", texto: "y con Office instalado" },
  },
  {
    video: "/casos/slide-remoto.mp4",
    poster: "/casos/slide-remoto.jpg",
    etiqueta: "INSTALACIÓN A DISTANCIA",
    titulo: "Slide instalado sin que el cliente tocara nada",
    problema:
      "El cliente necesitaba Slide (Rocscience) para análisis de taludes y ya tenía el programa, pero no se manejaba bien con la computadora.",
    trabajo: ["Conexión a distancia con TeamViewer", "Instalación y configuración de Slide", "Programa probado y funcionando"],
    antes: { valor: "Sin instalar", texto: "no sabía cómo hacerlo" },
    despues: { valor: "Listo", texto: "100% a distancia" },
  },
];

export default function Cases() {
  return (
    <section id="casos" className="w-full py-space-3xl bg-surface-container-low/60 scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="max-w-2xl space-y-space-2xs mb-space-2xl">
          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Casos reales</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Trabajos reales, resultados medibles</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Así quedaron algunas computadoras de nuestros clientes. Muchas compus son buenas: solo necesitan una
            buena optimización.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {CASOS.map((c) => (
            <article key={c.video} className="rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col">
              <div className="bg-inverse-surface">
                <video
                  className="w-full aspect-[9/16] max-h-[560px] object-contain mx-auto"
                  src={c.video}
                  poster={c.poster}
                  controls
                  playsInline
                  preload="none"
                  aria-label={`Video: ${c.titulo}`}
                />
              </div>
              <div className="p-space-lg flex-1 flex flex-col gap-space-md">
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-primary font-bold">{c.etiqueta}</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{c.titulo}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{c.problema}</p>
                </div>

                <div className="grid grid-cols-2 gap-space-xs">
                  <div className="rounded-lg bg-[#fdecec] dark:bg-[#3b1416] p-space-sm">
                    <div className="font-label-sm text-label-sm text-error font-bold">ANTES</div>
                    <div className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">{c.antes.valor}</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant leading-tight">{c.antes.texto}</div>
                  </div>
                  <div className="rounded-lg bg-[#e3f7ec] dark:bg-[#0f3321] p-space-sm">
                    <div className="font-label-sm text-label-sm text-[#0f7a3d] dark:text-[#7be0a5] font-bold">DESPUÉS</div>
                    <div className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">{c.despues.valor}</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant leading-tight">{c.despues.texto}</div>
                  </div>
                </div>

                <ul className="space-y-space-2xs font-body-sm text-body-sm text-on-surface mt-auto">
                  {c.trabajo.map((t) => (
                    <li key={t} className="flex items-start gap-space-xs">
                      <CheckCircle2 className="w-[18px] h-[18px] text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
