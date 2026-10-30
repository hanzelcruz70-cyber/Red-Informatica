import Image from "next/image";
import { Star } from "lucide-react";
import { RESENAS_GOOGLE } from "@/lib/resenas-google";
import { GOOGLE_MAPS_URL, GOOGLE_RESENAS_URL } from "@/lib/site";

function GoogleG({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`${className} shrink-0`} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export default function Reviews() {
  const total = RESENAS_GOOGLE.length;

  return (
    <section id="resenas" className="w-full py-space-3xl bg-surface scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl space-y-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
          <div className="max-w-2xl space-y-space-2xs">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Reseñas</span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Lo que dicen nuestros clientes</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Estas son capturas de reseñas reales de nuestra ficha de <strong>Google Maps</strong>. Cada una está ligada a
              una cuenta de Google y puedes comprobarlas todas allí.
            </p>
          </div>
          {total > 0 && (
            <div className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-surface-container-lowest shadow-sm shrink-0">
              <GoogleG />
              <div>
                <div className="flex gap-0.5" role="img" aria-label="5 de 5 estrellas">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-[18px] h-[18px] fill-[#f5b301] text-[#f5b301]" aria-hidden="true" />
                  ))}
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  {total} {total === 1 ? "reseña" : "reseñas"} en Google Maps
                </span>
              </div>
            </div>
          )}
        </div>

        <ul className="columns-1 md:columns-2 xl:columns-3 gap-space-md [&>li]:mb-space-md">
          {RESENAS_GOOGLE.map((r) => (
            <li key={r.img} className="break-inside-avoid">
              <figure className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-outline-variant/40 bg-surface-container-lowest">
                <Image
                  src={r.img}
                  width={r.ancho}
                  height={r.alto}
                  alt={`Reseña de 5 estrellas en Google de ${r.nombre}: ${r.texto}`}
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                  className="w-full h-auto"
                />
              </figure>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-sm">
            <GoogleG />
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">¿Ya trabajamos contigo?</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tu reseña en Google ayuda a que más personas de Sébaco nos encuentren. Solo toma un minuto.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-space-sm shrink-0">
            {GOOGLE_MAPS_URL && (
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-space-md rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface font-body-sm text-body-sm font-semibold transition-colors"
              >
                Ver todas en Google
              </a>
            )}
            {GOOGLE_RESENAS_URL && (
              <a
                href={GOOGLE_RESENAS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-sm text-body-sm font-semibold transition-colors"
              >
                Déjanos tu reseña en Google
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
