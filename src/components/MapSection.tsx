import { MapPin, Navigation, Star } from "lucide-react";
import { GOOGLE_MAPS_EMBED, GOOGLE_MAPS_URL, GOOGLE_RESENAS_URL } from "@/lib/site";

/** Ubicación del taller con el mapa de Google. */
export default function MapSection() {
  return (
    <section id="ubicacion" className="w-full py-space-3xl bg-surface scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-4 space-y-space-md">
            <div className="space-y-space-2xs">
              <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Ubicación</span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Visítanos en Sébaco</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Trae tu computadora a nuestro taller o, si estás lejos, te atendemos a distancia.
              </p>
            </div>
            <div className="flex items-center gap-space-sm p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#EA4335] text-white shadow-sm flex items-center justify-center shrink-0"><MapPin className="w-5 h-5" aria-hidden="true" /></div>
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">RED INFORMÁTICA</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Sébaco, Matagalpa, Nicaragua</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-space-sm">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs h-11 px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-sm text-body-sm font-semibold transition-colors"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                Cómo llegar
              </a>
              <a
                href={GOOGLE_RESENAS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs h-11 px-space-md rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface font-body-sm text-body-sm font-semibold transition-colors"
              >
                <Star className="w-4 h-4" aria-hidden="true" />
                Reseñar en Google
              </a>
            </div>
          </div>
          <div className="lg:col-span-8 rounded-2xl overflow-hidden shadow-md bg-surface-container aspect-[4/3] md:aspect-[16/9]">
            <iframe
              src={GOOGLE_MAPS_EMBED}
              title="Mapa de RED INFORMÁTICA en Sébaco"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
