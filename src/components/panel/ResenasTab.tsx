"use client";

import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, Check, Copy, EyeOff, Eye, Link2, Loader2, MessageSquareText, Send, Star, Trash2 } from "lucide-react";
import { api, btnIcono, btnPrimario, btnSecundario, formatoFecha, inputCls, textareaCls } from "./util";
import { SERVICIOS_RESENA } from "@/lib/resenas-servicios";

type Resena = {
  id: string;
  created_at: string;
  nombre: string;
  ciudad: string;
  servicio: string;
  estrellas: number;
  comentario: string;
  respuesta: string;
  aprobada: boolean;
  verificada: boolean;
};

type Invitacion = {
  id: string;
  created_at: string;
  token: string;
  cliente: string;
  servicio: string;
  usada_at: string | null;
};

const enlace = (token: string) =>
  `${typeof window !== "undefined" ? window.location.origin : "https://red-informatica.com"}/resena/${token}`;

function mensajeWhatsApp(inv: Invitacion) {
  const nombre = inv.cliente.split(" ")[0];
  return `Hola ${nombre}, gracias por confiar en RED INFORMÁTICA. ¿Nos ayudas con una reseña corta sobre el servicio? Es solo un minuto: ${enlace(inv.token)}`;
}

export default function ResenasTab() {
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [invitaciones, setInvitaciones] = useState<Invitacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [creando, setCreando] = useState(false);
  const [nueva, setNueva] = useState<Invitacion | null>(null);
  const [copiado, setCopiado] = useState<string | null>(null);

  const [ocupado, setOcupado] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [confirmarBorrar, setConfirmarBorrar] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setError("");
    try {
      const [r, i] = await Promise.all([
        api<{ resenas: Resena[] }>("/api/panel/resenas"),
        api<{ invitaciones: Invitacion[] }>("/api/panel/invitaciones"),
      ]);
      setResenas(r.resenas);
      setInvitaciones(i.invitaciones);
      setRespuestas(Object.fromEntries(r.resenas.map((x) => [x.id, x.respuesta ?? ""])));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function crearInvitacion(e: React.FormEvent) {
    e.preventDefault();
    setCreando(true);
    setError("");
    try {
      const d = await api<{ invitacion: Invitacion }>("/api/panel/invitaciones", {
        method: "POST",
        body: JSON.stringify({ cliente, servicio }),
      });
      setNueva(d.invitacion);
      setInvitaciones((l) => [d.invitacion, ...l]);
      setCliente("");
      setServicio("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCreando(false);
    }
  }

  async function copiar(inv: Invitacion) {
    try {
      await navigator.clipboard.writeText(enlace(inv.token));
      setCopiado(inv.id);
      setTimeout(() => setCopiado(null), 2000);
    } catch {}
  }

  async function borrarInvitacion(id: string) {
    setOcupado(id);
    try {
      await api(`/api/panel/invitaciones/${id}`, { method: "DELETE" });
      setInvitaciones((l) => l.filter((x) => x.id !== id));
      if (nueva?.id === id) setNueva(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setOcupado(null);
    }
  }

  async function actualizar(r: Resena, cambios: Partial<Pick<Resena, "aprobada" | "respuesta">>) {
    setOcupado(r.id);
    setError("");
    try {
      await api(`/api/panel/resenas/${r.id}`, { method: "PATCH", body: JSON.stringify(cambios) });
      setResenas((l) => l.map((x) => (x.id === r.id ? { ...x, ...cambios } : x)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setOcupado(null);
    }
  }

  async function borrarResena(id: string) {
    setOcupado(id);
    try {
      await api(`/api/panel/resenas/${id}`, { method: "DELETE" });
      setResenas((l) => l.filter((x) => x.id !== id));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setOcupado(null);
      setConfirmarBorrar(null);
    }
  }

  const pendientes = invitaciones.filter((i) => !i.usada_at);

  return (
    <div className="space-y-space-xl">
      {error && <p className="p-space-sm rounded-xl bg-[#fdecec] dark:bg-[#3b1416] text-error text-body-sm">{error}</p>}

      {/* 1. Invitar */}
      <section className="rounded-2xl bg-surface-container-lowest border border-outline-variant/50 p-space-lg space-y-space-md">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface">Pedir una reseña a un cliente</h2>
          <p className="text-body-sm text-on-surface-variant">
            Al terminar un trabajo, crea un enlace único y envíaselo por WhatsApp. Solo sirve una vez y la reseña sale
            como “Cliente verificado”.
          </p>
        </div>
        <form onSubmit={crearInvitacion} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-space-sm">
          <input
            className={inputCls}
            placeholder="Nombre del cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
            minLength={2}
            maxLength={60}
          />
          <select className={inputCls} value={servicio} onChange={(e) => setServicio(e.target.value)} required>
            <option value="" disabled>
              Servicio realizado
            </option>
            {SERVICIOS_RESENA.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="submit" className={btnPrimario} disabled={creando}>
            {creando ? <Loader2 size={16} className="animate-spin" /> : <Link2 size={16} />}
            Crear enlace
          </button>
        </form>

        {nueva && (
          <div className="rounded-xl bg-primary-fixed p-space-md space-y-space-sm">
            <p className="text-body-sm font-semibold text-on-surface">Enlace para {nueva.cliente}:</p>
            <code className="block text-body-sm break-all text-on-surface">{enlace(nueva.token)}</code>
            <div className="flex flex-wrap gap-space-xs">
              <a
                className={btnPrimario}
                href={`https://wa.me/?text=${encodeURIComponent(mensajeWhatsApp(nueva))}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={16} /> Enviar por WhatsApp
              </a>
              <button type="button" className={btnSecundario} onClick={() => copiar(nueva)}>
                {copiado === nueva.id ? <Check size={16} /> : <Copy size={16} />}
                {copiado === nueva.id ? "Copiado" : "Copiar enlace"}
              </button>
            </div>
          </div>
        )}

        {pendientes.length > 0 && (
          <div className="space-y-space-xs">
            <p className="text-label-md font-label-md text-on-surface-variant uppercase">
              Enlaces enviados sin responder ({pendientes.length})
            </p>
            <ul className="divide-y divide-outline-variant/40">
              {pendientes.map((inv) => (
                <li key={inv.id} className="flex items-center gap-space-sm py-space-xs">
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm font-semibold text-on-surface truncate">{inv.cliente}</p>
                    <p className="text-label-md font-label-md text-on-surface-variant">
                      {inv.servicio} · {formatoFecha(inv.created_at)}
                    </p>
                  </div>
                  <a
                    className={btnIcono}
                    title="Reenviar por WhatsApp"
                    aria-label="Reenviar por WhatsApp"
                    href={`https://wa.me/?text=${encodeURIComponent(mensajeWhatsApp(inv))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send size={16} />
                  </a>
                  <button className={btnIcono} title="Copiar enlace" aria-label="Copiar enlace" onClick={() => copiar(inv)}>
                    {copiado === inv.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button
                    className={btnIcono}
                    title="Anular enlace"
                    aria-label="Anular enlace"
                    disabled={ocupado === inv.id}
                    onClick={() => borrarInvitacion(inv.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 2. Reseñas recibidas */}
      <section className="space-y-space-md">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface">Reseñas recibidas</h2>
          <p className="text-body-sm text-on-surface-variant">
            Las reseñas verificadas se publican solas. Puedes responderlas u ocultarlas si tienen contenido ofensivo.
          </p>
        </div>

        {cargando ? (
          <div className="flex items-center gap-space-xs text-on-surface-variant text-body-sm py-space-xl justify-center">
            <Loader2 className="animate-spin" size={18} /> Cargando…
          </div>
        ) : resenas.length === 0 ? (
          <p className="py-space-lg text-center text-body-sm text-on-surface-variant">Todavía no hay reseñas.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {resenas.map((r) => (
              <li key={r.id} className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/50 space-y-space-sm">
                <div className="flex items-start justify-between gap-space-sm">
                  <div className="min-w-0">
                    <p className="font-semibold text-on-surface truncate">
                      {r.nombre}
                      {r.ciudad && <span className="font-normal text-on-surface-variant"> · {r.ciudad}</span>}
                    </p>
                    <p className="text-label-md font-label-md text-on-surface-variant">
                      {r.servicio} · {formatoFecha(r.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {r.verificada ? (
                      <span className="inline-flex items-center gap-1 text-label-md font-label-md px-space-xs py-0.5 rounded-md bg-[#e3f7ec] dark:bg-[#0f3321] text-[#0f7a3d] dark:text-[#7be0a5]">
                        <BadgeCheck size={14} /> Verificada
                      </span>
                    ) : (
                      <span className="text-label-md font-label-md px-space-xs py-0.5 rounded-md bg-surface-container text-on-surface-variant">
                        Sin verificar (no se muestra)
                      </span>
                    )}
                    <span className={`text-label-md font-label-md ${r.aprobada ? "text-primary" : "text-on-surface-variant"}`}>
                      {r.aprobada ? "Publicada" : "Oculta"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-0.5" aria-label={`${r.estrellas} de 5 estrellas`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} className={i <= r.estrellas ? "fill-[#f5b301] text-[#f5b301]" : "text-outline-variant"} />
                  ))}
                </div>
                <p className="text-body-sm text-on-surface whitespace-pre-line">{r.comentario}</p>

                {r.verificada && (
                  <div className="space-y-space-2xs">
                    <label className="flex items-center gap-1 text-label-md font-label-md text-on-surface-variant" htmlFor={`resp-${r.id}`}>
                      <MessageSquareText size={14} /> Tu respuesta pública
                    </label>
                    <textarea
                      id={`resp-${r.id}`}
                      className={textareaCls}
                      rows={2}
                      maxLength={800}
                      placeholder="¡Gracias por tu confianza!"
                      value={respuestas[r.id] ?? ""}
                      onChange={(e) => setRespuestas((m) => ({ ...m, [r.id]: e.target.value }))}
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-space-xs pt-space-2xs">
                  {r.verificada && (respuestas[r.id] ?? "") !== (r.respuesta ?? "") && (
                    <button className={btnPrimario} disabled={ocupado === r.id} onClick={() => actualizar(r, { respuesta: respuestas[r.id] ?? "" })}>
                      <Check size={16} /> Guardar respuesta
                    </button>
                  )}
                  {r.verificada &&
                    (r.aprobada ? (
                      <button className={btnSecundario} disabled={ocupado === r.id} onClick={() => actualizar(r, { aprobada: false })}>
                        <EyeOff size={16} /> Ocultar
                      </button>
                    ) : (
                      <button className={btnSecundario} disabled={ocupado === r.id} onClick={() => actualizar(r, { aprobada: true })}>
                        <Eye size={16} /> Publicar
                      </button>
                    ))}
                  {confirmarBorrar === r.id ? (
                    <>
                      <button className={`${btnSecundario} text-error`} disabled={ocupado === r.id} onClick={() => borrarResena(r.id)}>
                        Sí, eliminar
                      </button>
                      <button className={btnSecundario} onClick={() => setConfirmarBorrar(null)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      className={`${btnIcono} ml-auto`}
                      aria-label="Eliminar reseña"
                      title="Eliminar"
                      onClick={() => setConfirmarBorrar(r.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
