import { BadgeCheck, MessageSquareText, Quote, Star } from "lucide-react";
import { obtenerResenasPublicadas } from "@/lib/resenas";
import { GOOGLE_MAPS_URL, GOOGLE_RESENAS_URL } from "@/lib/site";

function Estrellas({ n, size = 18 }: { n: number; size?: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${n} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= n ? "fill-[#f5b301] text-[#f5b301]" : "text-outline-variant"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function fecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-NI", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

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

export default async function Reviews() {
  const resenas = await obtenerResenasPublicadas(24);
  const promedio = resenas.length ? resenas.reduce((s, r) => s + r.estrellas, 0) / resenas.length : 0;
  const hayGoogle = Boolean(GOOGLE_RESENAS_URL || GOOGLE_MAPS_URL);

  return (
    <section id="resenas" className="w-full py-space-3xl bg-surface scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl space-y-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
          <div className="max-w-2xl space-y-space-2xs">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Reseñas</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Lo que dicen nuestros clientes</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Aquí ves dos tipos de reseñas, y las dos son de clientes reales: las de <strong>cliente verificado</strong>,
              que llegan con un enlace personal que les enviamos al terminar cada trabajo, y las <strong>reseñas de Google</strong>,
              que puedes comprobar en nuestra ficha de Google Maps.
            </p>
          </div>
          {resenas.length > 0 && (
            <div className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-surface-container-lowest shadow-sm shrink-0">
              <span className="font-headline-md text-headline-md text-on-surface">{promedio.toFixed(1)}</span>
              <div>
                <Estrellas n={Math.round(promedio)} />
                <span className="font-label-md text-label-md text-on-surface-variant">
                  {resenas.length} {resenas.length === 1 ? "reseña" : "reseñas"}
                </span>
              </div>
            </div>
          )}
        </div>

        {hayGoogle && (
          <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex items-start gap-space-sm">
              <GoogleG />
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">También estamos en Google</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Lee nuestras reseñas en Google Maps, donde cada opinión está ligada a una cuenta real de Google.
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
                  Ver reseñas en Google
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
        )}

        {resenas.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-outline-variant p-space-xl text-center space-y-space-xs">
            <Quote className="w-10 h-10 text-primary mx-auto" aria-hidden="true" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Pronto verás aquí las primeras reseñas</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              Si ya trabajamos contigo, pídenos tu enlace para dejar tu reseña verificada.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {resenas.map((r) => (
              <li key={r.id} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between gap-space-xs">
                  <Estrellas n={r.estrellas} />
                  {r.origen === "google" ? (
                    <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-semibold">
                      <GoogleG className="w-4 h-4" />
                      Reseña de Google
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-[#e3f7ec] dark:bg-[#0f3321] text-[#0f7a3d] dark:text-[#7be0a5] font-label-md text-label-md font-semibold">
                      <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                      Cliente verificado
                    </span>
                  )}
                </div>
                {r.comentario ? (
                  <p className="font-body-md text-body-md text-on-surface whitespace-pre-line">“{r.comentario}”</p>
                ) : (
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">Calificó con {r.estrellas} {r.estrellas === 1 ? "estrella" : "estrellas"} sin comentario.</p>
                )}
                {r.respuesta && (
                  <div className="rounded-lg bg-surface-container p-space-sm space-y-1">
                    <div className="flex items-center gap-1 font-label-md text-label-md font-semibold text-primary">
                      <MessageSquareText className="w-4 h-4" aria-hidden="true" />
                      Respuesta de RED INFORMÁTICA
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-pre-line">{r.respuesta}</p>
                  </div>
                )}
                <div className="mt-auto pt-space-xs flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center shrink-0">
                    {r.nombre.trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-body-sm text-body-sm font-bold text-on-surface truncate">
                      {r.nombre}
                      {r.ciudad && <span className="font-normal text-on-surface-variant"> · {r.ciudad}</span>}
                    </div>
                    <div className="font-label-md text-label-md text-on-surface-variant">
                      {r.origen === "google" ? "Google Maps" : r.servicio} · {fecha(r.fecha_resena ? `${r.fecha_resena}T12:00:00` : r.created_at)}
                    </div>
                  </div>
                  {r.origen === "google" && GOOGLE_MAPS_URL && (
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto shrink-0 font-label-md text-label-md font-semibold text-primary hover:underline"
                    >
                      Ver en Google
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
