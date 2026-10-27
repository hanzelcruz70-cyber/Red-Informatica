import { Quote, Star } from "lucide-react";
import { obtenerResenasAprobadas } from "@/lib/resenas";
import ReviewForm from "@/components/ReviewForm";

function Estrellas({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${n} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-[18px] h-[18px] ${i <= n ? "fill-[#f5b301] text-[#f5b301]" : "text-outline-variant"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function fecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-NI", { month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function Reviews() {
  const resenas = await obtenerResenasAprobadas(12);
  const promedio = resenas.length ? resenas.reduce((s, r) => s + r.estrellas, 0) / resenas.length : 0;

  return (
    <section id="resenas" className="w-full py-space-3xl bg-surface scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-2xl">
          <div className="max-w-2xl space-y-space-2xs">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Reseñas</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Lo que dicen nuestros clientes</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Opiniones reales de personas que ya trabajaron con nosotros.
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-7">
            {resenas.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-outline-variant p-space-xl text-center space-y-space-xs">
                <Quote className="w-10 h-10 text-primary mx-auto" aria-hidden="true" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Sé el primero en dejar tu reseña</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Si ya te ayudamos con tu computadora, cuéntanos cómo te fue. Tu opinión ayuda a otros clientes.
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {resenas.map((r) => (
                  <li key={r.id} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
                    <Estrellas n={r.estrellas} />
                    <p className="font-body-md text-body-md text-on-surface whitespace-pre-line">“{r.comentario}”</p>
                    <div className="mt-auto pt-space-xs flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center shrink-0">
                        {r.nombre.trim().charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-body-sm text-body-sm font-bold text-on-surface truncate">{r.nombre}</div>
                        <div className="font-label-md text-label-md text-on-surface-variant">
                          {r.servicio}
                          {r.servicio && " · "}
                          {fecha(r.created_at)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-5">
            <ReviewForm />
          </div>
        </div>
      </div>
    </section>
  );
}
