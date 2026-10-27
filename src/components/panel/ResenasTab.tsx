"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, EyeOff, Loader2, Star, Trash2 } from "lucide-react";
import { api, btnIcono, btnPrimario, btnSecundario, formatoFecha } from "./util";

type Resena = {
  id: string;
  created_at: string;
  nombre: string;
  servicio: string;
  estrellas: number;
  comentario: string;
  aprobada: boolean;
};

type Filtro = "pendientes" | "publicadas" | "todas";

export default function ResenasTab() {
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("pendientes");
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [confirmarBorrar, setConfirmarBorrar] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setError("");
    try {
      const d = await api<{ resenas: Resena[] }>("/api/panel/resenas");
      setResenas(d.resenas);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const pendientes = resenas.filter((r) => !r.aprobada).length;

  const visibles = useMemo(
    () =>
      resenas.filter((r) =>
        filtro === "todas" ? true : filtro === "pendientes" ? !r.aprobada : r.aprobada
      ),
    [resenas, filtro]
  );

  async function cambiar(r: Resena, aprobada: boolean) {
    setOcupado(r.id);
    setError("");
    try {
      await api(`/api/panel/resenas/${r.id}`, { method: "PATCH", body: JSON.stringify({ aprobada }) });
      setResenas((lista) => lista.map((x) => (x.id === r.id ? { ...x, aprobada } : x)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setOcupado(null);
    }
  }

  async function borrar(id: string) {
    setOcupado(id);
    setError("");
    try {
      await api(`/api/panel/resenas/${id}`, { method: "DELETE" });
      setResenas((lista) => lista.filter((x) => x.id !== id));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setOcupado(null);
      setConfirmarBorrar(null);
    }
  }

  const chip = (activo: boolean) =>
    `h-9 px-space-sm rounded-lg text-body-sm font-semibold transition-colors ${
      activo ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"
    }`;

  return (
    <div className="space-y-space-md">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface">Reseñas de clientes</h2>
          <p className="text-body-sm text-on-surface-variant">
            Las reseñas nuevas no se publican hasta que las apruebes.
          </p>
        </div>
        <div className="flex gap-space-2xs">
          <button className={chip(filtro === "pendientes")} onClick={() => setFiltro("pendientes")}>
            Pendientes{pendientes > 0 ? ` (${pendientes})` : ""}
          </button>
          <button className={chip(filtro === "publicadas")} onClick={() => setFiltro("publicadas")}>
            Publicadas
          </button>
          <button className={chip(filtro === "todas")} onClick={() => setFiltro("todas")}>
            Todas
          </button>
        </div>
      </div>

      {error && <p className="p-space-sm rounded-xl bg-[#fdecec] dark:bg-[#3b1416] text-error text-body-sm">{error}</p>}

      {cargando ? (
        <div className="flex items-center gap-space-xs text-on-surface-variant text-body-sm py-space-xl justify-center">
          <Loader2 className="animate-spin" size={18} /> Cargando…
        </div>
      ) : visibles.length === 0 ? (
        <p className="py-space-xl text-center text-body-sm text-on-surface-variant">
          {filtro === "pendientes" ? "No hay reseñas pendientes." : "No hay reseñas aquí todavía."}
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {visibles.map((r) => (
            <li
              key={r.id}
              className={`p-space-md rounded-2xl bg-surface-container-lowest border ${
                r.aprobada ? "border-outline-variant/50" : "border-primary-container/50"
              } space-y-space-sm`}
            >
              <div className="flex items-start justify-between gap-space-sm">
                <div className="min-w-0">
                  <p className="font-semibold text-on-surface truncate">{r.nombre}</p>
                  <p className="text-label-md font-label-md text-on-surface-variant">
                    {r.servicio} · {formatoFecha(r.created_at)}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-label-md font-label-md px-space-xs py-0.5 rounded-md ${
                    r.aprobada ? "bg-[#e3f7ec] dark:bg-[#0f3321] text-[#0f7a3d] dark:text-[#7be0a5]" : "bg-primary-fixed text-primary"
                  }`}
                >
                  {r.aprobada ? "Publicada" : "Pendiente"}
                </span>
              </div>
              <div className="flex gap-0.5" aria-label={`${r.estrellas} de 5 estrellas`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i <= r.estrellas ? "fill-[#f5b301] text-[#f5b301]" : "text-outline-variant"}
                  />
                ))}
              </div>
              <p className="text-body-sm text-on-surface whitespace-pre-line">{r.comentario}</p>
              <div className="flex items-center gap-space-xs pt-space-2xs">
                {r.aprobada ? (
                  <button className={btnSecundario} disabled={ocupado === r.id} onClick={() => cambiar(r, false)}>
                    <EyeOff size={16} /> Ocultar
                  </button>
                ) : (
                  <button className={btnPrimario} disabled={ocupado === r.id} onClick={() => cambiar(r, true)}>
                    <Check size={16} /> Aprobar
                  </button>
                )}
                {confirmarBorrar === r.id ? (
                  <>
                    <button
                      className={`${btnSecundario} text-error`}
                      disabled={ocupado === r.id}
                      onClick={() => borrar(r.id)}
                    >
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
    </div>
  );
}
