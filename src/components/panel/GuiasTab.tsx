"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import type { Guia, Paso } from "@/lib/panel-guias";
import { api, btnIcono, btnPrimario, btnSecundario, formatoFecha, inputCls, normalizar, textareaCls } from "./util";

type Borrador = Omit<Guia, "id" | "created_at" | "updated_at"> & { id?: string };

const vacia = (): Borrador => ({
  titulo: "",
  categoria: "",
  descripcion: "",
  notas: "",
  pasos: [{ titulo: "", detalle: "", comando: "" }],
});

export default function GuiasTab({ discreto }: { discreto: boolean }) {
  const [guias, setGuias] = useState<Guia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [borrador, setBorrador] = useState<Borrador | null>(null);

  const cargar = useCallback(async () => {
    try {
      const d = await api<{ guias: Guia[] }>("/api/panel/guias");
      setGuias(d.guias);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const categorias = useMemo(
    () => Array.from(new Set(guias.map((g) => g.categoria))).sort((a, b) => a.localeCompare(b)),
    [guias]
  );

  const agrupadas = useMemo(() => {
    const q = normalizar(busqueda.trim());
    const filtradas = guias.filter(
      (g) =>
        !q ||
        normalizar(
          `${g.titulo} ${g.categoria} ${g.descripcion} ${g.pasos.map((p) => `${p.titulo} ${p.detalle}`).join(" ")}`
        ).includes(q)
    );
    const map = new Map<string, Guia[]>();
    for (const g of filtradas) {
      if (!map.has(g.categoria)) map.set(g.categoria, []);
      map.get(g.categoria)!.push(g);
    }
    return Array.from(map.entries());
  }, [guias, busqueda]);

  const actual = guias.find((g) => g.id === seleccion) ?? null;

  async function guardar(b: Borrador) {
    const { id, ...datos } = b;
    const d = id
      ? await api<{ guia: Guia }>(`/api/panel/guias/${id}`, { method: "PUT", body: JSON.stringify(datos) })
      : await api<{ guia: Guia }>("/api/panel/guias", { method: "POST", body: JSON.stringify(datos) });
    setGuias((list) => (id ? list.map((g) => (g.id === id ? d.guia : g)) : [...list, d.guia]));
    setSeleccion(d.guia.id);
    setBorrador(null);
  }

  async function eliminar(id: string) {
    try {
      await api(`/api/panel/guias/${id}`, { method: "DELETE" });
      setGuias((l) => l.filter((g) => g.id !== id));
      setSeleccion(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  const mostrandoDetalle = Boolean(borrador || actual);

  return (
    <div className="grid lg:grid-cols-[20rem_1fr] gap-space-lg items-start">
      {/* Lista */}
      <aside className={`${mostrandoDetalle ? "hidden lg:block" : ""} lg:sticky lg:top-32 space-y-space-sm`}>
        <button onClick={() => { setBorrador(vacia()); setSeleccion(null); }} className={`${btnPrimario} w-full`}>
          <Plus size={16} /> Nueva guía
        </button>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar guías…" className={`${inputCls} pl-9`} />
        </div>

        {error && <p className="text-body-sm text-error">{error}</p>}

        {cargando ? (
          <div className="flex justify-center py-space-xl text-on-surface-variant">
            <Loader2 className="animate-spin" />
          </div>
        ) : agrupadas.length === 0 ? (
          <p className="text-body-sm text-on-surface-variant text-center py-space-xl">
            {guias.length ? "Nada coincide." : "Aún no tienes guías. Crea la primera."}
          </p>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-space-xs max-h-[calc(100vh-16rem)] overflow-y-auto">
            {agrupadas.map(([cat, lista]) => (
              <div key={cat} className="mb-space-xs last:mb-0">
                <p className="px-space-sm pt-space-xs pb-1 font-label-md text-label-md uppercase text-on-surface-variant">{cat}</p>
                {lista.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { setSeleccion(g.id); setBorrador(null); }}
                    className={`w-full text-left px-space-sm py-space-xs rounded-xl text-body-sm transition-colors ${
                      seleccion === g.id && !borrador
                        ? "bg-primary-fixed text-on-primary-fixed font-semibold"
                        : "text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    {g.titulo}
                    <span className="block font-label-md text-label-md text-on-surface-variant font-normal">
                      {g.pasos.length} paso{g.pasos.length === 1 ? "" : "s"}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Detalle */}
      <section className={`${mostrandoDetalle ? "" : "hidden lg:block"} min-w-0`}>
        {borrador ? (
          <Editor
            inicial={borrador}
            categorias={categorias}
            onCancel={() => setBorrador(null)}
            onSave={guardar}
          />
        ) : actual ? (
          <Visor
            guia={actual}
            discreto={discreto}
            onVolver={() => setSeleccion(null)}
            onEditar={() => setBorrador({ ...actual, pasos: actual.pasos.length ? actual.pasos : [{ titulo: "", detalle: "", comando: "" }] })}
            onEliminar={() => eliminar(actual.id)}
          />
        ) : (
          <div className="hidden lg:flex flex-col items-center justify-center text-center py-space-4xl text-on-surface-variant">
            <BookOpen size={40} className="opacity-40 mb-space-sm" />
            <p className="text-body-md">Elige una guía de la lista o crea una nueva.</p>
          </div>
        )}
      </section>
    </div>
  );
}

/* ───────────── Visor ───────────── */

function Visor({
  guia,
  discreto,
  onVolver,
  onEditar,
  onEliminar,
}: {
  guia: Guia;
  discreto: boolean;
  onVolver: () => void;
  onEditar: () => void;
  onEliminar: () => void;
}) {
  const [confirmar, setConfirmar] = useState(false);
  const [hechos, setHechos] = useState<Set<number>>(new Set());

  useEffect(() => {
    setHechos(new Set());
    setConfirmar(false);
  }, [guia.id]);

  function toggle(i: number) {
    setHechos((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  }

  return (
    <article className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60">
      <header className="p-space-md sm:p-space-lg border-b border-outline-variant/50">
        <button onClick={onVolver} className="lg:hidden inline-flex items-center gap-1 text-body-sm text-primary mb-space-sm">
          <ArrowLeft size={16} /> Guías
        </button>
        <div className="flex items-start gap-space-sm">
          <div className="min-w-0 flex-1">
            <p className="font-label-md text-label-md uppercase text-primary">{guia.categoria}</p>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mt-1">{guia.titulo}</h2>
            {guia.descripcion && <p className="text-body-sm text-on-surface-variant mt-space-xs whitespace-pre-wrap">{guia.descripcion}</p>}
            <p className="font-label-md text-label-md text-on-surface-variant mt-space-xs">Actualizada {formatoFecha(guia.updated_at)}</p>
          </div>
          <div className="flex gap-1 shrink-0">
            <button onClick={onEditar} className={btnIcono} aria-label="Editar guía">
              <Pencil size={16} />
            </button>
            {confirmar ? (
              <button onClick={onEliminar} onBlur={() => setConfirmar(false)} autoFocus className="h-9 px-space-sm rounded-lg bg-error text-on-error text-body-sm font-semibold">
                ¿Borrar?
              </button>
            ) : (
              <button onClick={() => setConfirmar(true)} className={`${btnIcono} hover:text-error`} aria-label="Eliminar guía">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
        {guia.pasos.length > 0 && (
          <div className="mt-space-md flex items-center gap-space-sm">
            <div className="h-1.5 flex-1 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full bg-secondary transition-all" style={{ width: `${(hechos.size / guia.pasos.length) * 100}%` }} />
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant">
              {hechos.size}/{guia.pasos.length}
            </span>
          </div>
        )}
      </header>

      <ol className="p-space-md sm:p-space-lg space-y-space-md">
        {guia.pasos.map((p, i) => (
          <li key={i} className="flex gap-space-sm">
            <button
              onClick={() => toggle(i)}
              aria-label={hechos.has(i) ? "Marcar como pendiente" : "Marcar como hecho"}
              className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center font-label-lg text-label-lg border-2 transition-colors ${
                hechos.has(i) ? "bg-secondary border-secondary text-on-secondary" : "border-primary-container text-primary hover:bg-primary-fixed"
              }`}
            >
              {hechos.has(i) ? <Check size={16} /> : i + 1}
            </button>
            <div className={`min-w-0 flex-1 pt-1 ${hechos.has(i) ? "opacity-60" : ""}`}>
              {p.titulo && <p className="font-semibold text-on-surface">{p.titulo}</p>}
              {p.detalle && <p className="text-body-sm text-on-surface-variant whitespace-pre-wrap mt-0.5">{p.detalle}</p>}
              {p.comando && <BloqueComando texto={p.comando} discreto={discreto} />}
            </div>
          </li>
        ))}
      </ol>

      {guia.notas && (
        <footer className="mx-space-md sm:mx-space-lg mb-space-lg p-space-md rounded-xl bg-surface-container-low">
          <p className="font-label-md text-label-md uppercase text-on-surface-variant mb-space-2xs">Notas</p>
          <p className="text-body-sm text-on-surface whitespace-pre-wrap">{guia.notas}</p>
        </footer>
      )}
    </article>
  );
}

function BloqueComando({ texto, discreto }: { texto: string; discreto: boolean }) {
  const [visible, setVisible] = useState(!discreto);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => setVisible(!discreto), [discreto]);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = texto;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  }

  return (
    <div className="mt-space-xs rounded-xl bg-inverse-surface text-inverse-on-surface overflow-hidden">
      <div className="flex items-center justify-end gap-1 px-space-xs pt-space-xs">
        <button
          onClick={() => setVisible((v) => !v)}
          className="inline-flex items-center gap-1 h-7 px-2 rounded-md text-label-md font-label-md hover:bg-white/10"
        >
          {visible ? <EyeOff size={13} /> : <Eye size={13} />}
          {visible ? "Ocultar" : "Mostrar"}
        </button>
        <button onClick={copiar} className="inline-flex items-center gap-1 h-7 px-2 rounded-md text-label-md font-label-md hover:bg-white/10">
          {copiado ? <Check size={13} /> : <Copy size={13} />}
          {copiado ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre
        className={`px-space-sm pb-space-sm pt-1 font-label-lg text-[13px] leading-5 whitespace-pre-wrap break-all select-text transition-[filter] ${
          visible ? "" : "blur-[6px] select-none pointer-events-none"
        }`}
        aria-hidden={!visible}
      >
        {visible ? texto : texto.replace(/[^\s]/g, "•")}
      </pre>
    </div>
  );
}

/* ───────────── Editor ───────────── */

function Editor({
  inicial,
  categorias,
  onCancel,
  onSave,
}: {
  inicial: Borrador;
  categorias: string[];
  onCancel: () => void;
  onSave: (b: Borrador) => Promise<void>;
}) {
  const [b, setB] = useState<Borrador>(inicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const setPaso = (i: number, patch: Partial<Paso>) =>
    setB((x) => ({ ...x, pasos: x.pasos.map((p, j) => (j === i ? { ...p, ...patch } : p)) }));

  const mover = (i: number, d: -1 | 1) =>
    setB((x) => {
      const j = i + d;
      if (j < 0 || j >= x.pasos.length) return x;
      const pasos = [...x.pasos];
      [pasos[i], pasos[j]] = [pasos[j], pasos[i]];
      return { ...x, pasos };
    });

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      await onSave(b);
    } catch (err) {
      setError((err as Error).message);
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-space-md sm:p-space-lg space-y-space-md">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">{b.id ? "Editar guía" : "Nueva guía"}</h2>
        <button type="button" onClick={onCancel} className={btnIcono} aria-label="Cerrar">
          <X size={18} />
        </button>
      </div>

      <div className="grid sm:grid-cols-[1fr_14rem] gap-space-sm">
        <label className="block">
          <span className="block text-label-md font-label-md uppercase text-on-surface-variant mb-space-2xs">Título</span>
          <input required value={b.titulo} onChange={(e) => setB({ ...b, titulo: e.target.value })} placeholder="Ej: Activar Office 2021" className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-label-md font-label-md uppercase text-on-surface-variant mb-space-2xs">Categoría</span>
          <input list="cats-guias" value={b.categoria} onChange={(e) => setB({ ...b, categoria: e.target.value })} placeholder="Office, Windows…" className={inputCls} />
          <datalist id="cats-guias">
            {categorias.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
      </div>

      <label className="block">
        <span className="block text-label-md font-label-md uppercase text-on-surface-variant mb-space-2xs">Descripción</span>
        <textarea value={b.descripcion} onChange={(e) => setB({ ...b, descripcion: e.target.value })} rows={2} placeholder="Cuándo usar esta guía, requisitos…" className={textareaCls} />
      </label>

      <div>
        <p className="text-label-md font-label-md uppercase text-on-surface-variant mb-space-xs">Pasos</p>
        <ol className="space-y-space-sm">
          {b.pasos.map((p, i) => (
            <li key={i} className="rounded-xl border border-outline-variant/70 p-space-sm bg-surface-container-low/60 space-y-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="h-7 w-7 shrink-0 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-lg text-label-lg">{i + 1}</span>
                <input value={p.titulo} onChange={(e) => setPaso(i, { titulo: e.target.value })} placeholder="Qué hacer en este paso" className={inputCls} />
                <button type="button" onClick={() => mover(i, -1)} disabled={i === 0} className={`${btnIcono} disabled:opacity-30`} aria-label="Subir paso">
                  <ChevronUp size={16} />
                </button>
                <button type="button" onClick={() => mover(i, 1)} disabled={i === b.pasos.length - 1} className={`${btnIcono} disabled:opacity-30`} aria-label="Bajar paso">
                  <ChevronDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setB((x) => ({ ...x, pasos: x.pasos.filter((_, j) => j !== i) }))}
                  className={`${btnIcono} hover:text-error`}
                  aria-label="Quitar paso"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea value={p.detalle} onChange={(e) => setPaso(i, { detalle: e.target.value })} rows={2} placeholder="Detalles (opcional)" className={textareaCls} />
              <textarea
                value={p.comando}
                onChange={(e) => setPaso(i, { comando: e.target.value })}
                rows={2}
                spellCheck={false}
                placeholder="Comando, clave o texto para copiar (opcional)"
                className={`${textareaCls} font-label-lg text-[13px] bg-inverse-surface text-inverse-on-surface placeholder:text-tertiary-fixed-dim border-transparent`}
              />
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => setB((x) => ({ ...x, pasos: [...x.pasos, { titulo: "", detalle: "", comando: "" }] }))}
          className={`${btnSecundario} mt-space-sm w-full border-dashed`}
        >
          <Plus size={16} /> Agregar paso
        </button>
      </div>

      <label className="block">
        <span className="block text-label-md font-label-md uppercase text-on-surface-variant mb-space-2xs">Notas</span>
        <textarea value={b.notas} onChange={(e) => setB({ ...b, notas: e.target.value })} rows={3} placeholder="Problemas comunes, soluciones, recordatorios…" className={textareaCls} />
      </label>

      {error && <p className="text-body-sm text-error">{error}</p>}

      <div className="flex justify-end gap-space-xs pt-space-xs">
        <button type="button" onClick={onCancel} className={btnSecundario}>
          Cancelar
        </button>
        <button disabled={guardando} className={btnPrimario}>
          {guardando && <Loader2 size={16} className="animate-spin" />}
          Guardar guía
        </button>
      </div>
    </form>
  );
}
