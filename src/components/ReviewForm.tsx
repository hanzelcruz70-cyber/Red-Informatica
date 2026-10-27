"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { SERVICIOS_RESENA } from "@/lib/resenas-servicios";

type Estado = { tipo: "idle" | "enviando" | "ok" | "error"; mensaje?: string };

const inputCls =
  "w-full h-11 px-space-sm rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary";

export default function ReviewForm() {
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
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: String(fd.get("nombre") ?? ""),
          servicio: String(fd.get("servicio") ?? ""),
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
      form.reset();
      setEstrellas(0);
    } catch {
      setEstado({ tipo: "error", mensaje: "Error de conexión. Intenta de nuevo." });
    }
  }

  const activas = hover || estrellas;

  return (
    <form onSubmit={enviar} className="relative rounded-2xl bg-surface-container-lowest shadow-md p-space-lg md:p-space-xl space-y-space-md">
      <div className="space-y-space-2xs">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Deja tu reseña</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          La revisamos y la publicamos en un máximo de 48 horas.
        </p>
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
                className={`w-8 h-8 transition-colors ${i <= activas ? "fill-[#f5b301] text-[#f5b301]" : "text-outline-variant"}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-space-2xs">
        <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="resena-nombre">
          Tu nombre *
        </label>
        <input id="resena-nombre" name="nombre" required minLength={2} maxLength={60} placeholder="Ej. María López" className={inputCls} />
      </div>

      <div className="space-y-space-2xs">
        <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="resena-servicio">
          Servicio que recibiste *
        </label>
        <select id="resena-servicio" name="servicio" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            Selecciona una opción
          </option>
          {SERVICIOS_RESENA.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
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
          rows={4}
          placeholder="¿Cómo te fue con el servicio?"
          className="w-full px-space-sm py-space-xs rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary"
        />
      </div>

      <p className="font-label-md text-label-md text-on-surface-variant">
        Al enviar aceptas que publiquemos tu nombre y comentario según nuestra{" "}
        <a href="/privacidad" className="text-primary underline hover:no-underline">
          política de privacidad
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={estado.tipo === "enviando"}
        className="w-full h-12 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-semibold transition-colors disabled:opacity-60"
      >
        {estado.tipo === "enviando" ? "Enviando…" : "Enviar reseña"}
      </button>

      {estado.tipo === "ok" && (
        <p role="status" className="p-space-sm rounded-lg bg-[#e3f7ec] dark:bg-[#0f3321] text-[#0f7a3d] dark:text-[#7be0a5] font-body-sm text-body-sm">
          {estado.mensaje}
        </p>
      )}
      {estado.tipo === "error" && (
        <p role="alert" className="p-space-sm rounded-lg bg-[#fdecec] dark:bg-[#3b1416] text-error font-body-sm text-body-sm">
          {estado.mensaje}
        </p>
      )}
    </form>
  );
}
