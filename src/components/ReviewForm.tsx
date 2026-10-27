"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";

type Estado = { tipo: "idle" | "enviando" | "ok" | "error"; mensaje?: string };

const inputCls =
  "w-full h-11 px-space-sm rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary";

/** Formulario de reseña para un cliente invitado con enlace único. */
export default function ReviewForm({ token, cliente, servicio }: { token: string; cliente: string; servicio: string }) {
  const [estrellas, setEstrellas] = useState(0);
  const [hover, setHover] = useState(0);
  const [estado, setEstado] = useState<Estado>({ tipo: "idle" });

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!estrellas) {
      setEstado({ tipo: "error", mensaje: "Elige de 1 a 5 estrellas." });
      return;
    }
    setEstado({ tipo: "enviando" });
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          nombre: String(fd.get("nombre") ?? ""),
          ciudad: String(fd.get("ciudad") ?? ""),
          comentario: String(fd.get("comentario") ?? ""),
          estrellas,
          web: String(fd.get("web") ?? ""),
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) {
        setEstado({ tipo: "error", mensaje: d.error ?? "No se pudo enviar. Intenta de nuevo." });
        return;
      }
      setEstado({ tipo: "ok", mensaje: d.message });
    } catch {
      setEstado({ tipo: "error", mensaje: "Error de conexión. Intenta de nuevo." });
    }
  }

  if (estado.tipo === "ok") {
    return (
      <div className="rounded-2xl bg-surface-container-lowest shadow-md p-space-xl text-center space-y-space-sm">
        <BadgeCheck className="w-12 h-12 text-[#0f7a3d] dark:text-[#7be0a5] mx-auto" aria-hidden="true" />
        <h2 className="font-headline-sm text-headline-sm text-on-surface">{estado.mensaje}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Muchas gracias por confiar en RED INFORMÁTICA.</p>
        <Link href="/resenas" className="inline-flex text-primary font-semibold hover:underline">
          Ver todas las reseñas
        </Link>
      </div>
    );
  }

  const activas = hover || estrellas;

  return (
    <form onSubmit={enviar} className="relative rounded-2xl bg-surface-container-lowest shadow-md p-space-lg md:p-space-xl space-y-space-md">
      <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-[#e3f7ec] dark:bg-[#0f3321] text-[#0f7a3d] dark:text-[#7be0a5] font-body-sm text-body-sm">
        <BadgeCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span>
          Reseña verificada · Servicio: <strong>{servicio}</strong>
        </span>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="resena-web">No completar este campo</label>
        <input id="resena-web" name="web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="space-y-space-2xs">
        <legend className="font-body-sm text-body-sm font-semibold text-on-surface">Tu calificación *</legend>
        <div className="flex gap-space-2xs" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setEstrellas(i)}
              onMouseEnter={() => setHover(i)}
              aria-label={`${i} ${i === 1 ? "estrella" : "estrellas"}`}
              aria-pressed={estrellas === i}
              className="p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Star
                className={`w-9 h-9 transition-colors ${i <= activas ? "fill-[#f5b301] text-[#f5b301]" : "text-outline-variant"}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <div className="space-y-space-2xs">
          <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="resena-nombre">
            Tu nombre *
          </label>
          <input id="resena-nombre" name="nombre" required minLength={2} maxLength={60} defaultValue={cliente} className={inputCls} />
        </div>
        <div className="space-y-space-2xs">
          <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="resena-ciudad">
            Ciudad
          </label>
          <input id="resena-ciudad" name="ciudad" maxLength={60} placeholder="Ej. Sébaco" className={inputCls} />
        </div>
      </div>

      <div className="space-y-space-2xs">
        <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="resena-comentario">
          Tu comentario *
        </label>
        <textarea
          id="resena-comentario"
          name="comentario"
          required
          minLength={10}
          maxLength={800}
          rows={5}
          placeholder="¿Cómo te fue con el servicio?"
          className="w-full px-space-sm py-space-xs rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary"
        />
      </div>

      <p className="font-label-md text-label-md text-on-surface-variant">
        Al enviar aceptas que publiquemos tu nombre, ciudad y comentario según nuestra{" "}
        <a href="/privacidad" className="text-primary underline hover:no-underline">
          política de privacidad
        </a>
        . Este enlace solo se puede usar una vez.
      </p>

      <button
        type="submit"
        disabled={estado.tipo === "enviando"}
        className="w-full h-12 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-semibold transition-colors disabled:opacity-60"
      >
        {estado.tipo === "enviando" ? "Enviando…" : "Publicar mi reseña"}
      </button>

      {estado.tipo === "error" && (
        <p role="alert" className="p-space-sm rounded-lg bg-[#fdecec] dark:bg-[#3b1416] text-error font-body-sm text-body-sm">
          {estado.mensaje}
        </p>
      )}
    </form>
  );
}
