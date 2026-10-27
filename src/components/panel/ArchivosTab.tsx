"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Download,
  ExternalLink,
  File as FileIcon,
  Link2,
  Loader2,
  Pencil,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import {
  api,
  btnIcono,
  btnPrimario,
  btnSecundario,
  formatoFecha,
  formatoTamano,
  inputCls,
  normalizar,
  textareaCls,
} from "./util";

type Archivo = {
  id: string;
  created_at: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  tipo: "archivo" | "enlace";
  ruta: string | null;
  url: string | null;
  tamano: number | null;
  mime: string | null;
};

type Subida = { id: string; nombre: string; progreso: number; estado: "subiendo" | "listo" | "error"; error?: string };

function subirConProgreso(url: string, file: File, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("x-upsert", "false");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else {
        let msg = `Error ${xhr.status}`;
        try {
          const d = JSON.parse(xhr.responseText);
          msg = d.message ?? d.error ?? msg;
        } catch {}
        if (xhr.status === 413 || /exceeded|too large|size/i.test(msg))
          msg = "El archivo supera el tamaño máximo permitido por Supabase. Usa 'Agregar enlace' para archivos grandes.";
        reject(new Error(msg));
      }
    };
    xhr.onerror = () => reject(new Error("Error de red"));
    const fd = new FormData();
    fd.append("cacheControl", "3600");
    fd.append("", file);
    xhr.send(fd);
  });
}

export default function ArchivosTab() {
  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroCat, setFiltroCat] = useState("Todas");

  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [subidas, setSubidas] = useState<Subida[]>([]);
  const [arrastrando, setArrastrando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [modoEnlace, setModoEnlace] = useState(false);
  const [enlace, setEnlace] = useState({ nombre: "", url: "" });

  const [editando, setEditando] = useState<string | null>(null);
  const [borrando, setBorrando] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setError("");
    try {
      const d = await api<{ archivos: Archivo[] }>("/api/panel/archivos");
      setArchivos(d.archivos);
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
    () => Array.from(new Set(archivos.map((a) => a.categoria))).sort((a, b) => a.localeCompare(b)),
    [archivos]
  );

  const visibles = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return archivos.filter(
      (a) =>
        (filtroCat === "Todas" || a.categoria === filtroCat) &&
        (!q || normalizar(`${a.nombre} ${a.descripcion} ${a.categoria}`).includes(q))
    );
  }, [archivos, busqueda, filtroCat]);

  async function subirArchivos(files: FileList | File[]) {
    const lista = Array.from(files);
    for (const file of lista) {
      const sid = crypto.randomUUID();
      setSubidas((s) => [{ id: sid, nombre: file.name, progreso: 0, estado: "subiendo" }, ...s]);
      const set = (patch: Partial<Subida>) =>
        setSubidas((s) => s.map((x) => (x.id === sid ? { ...x, ...patch } : x)));
      try {
        const prep = await api<{ ruta: string; url: string }>("/api/panel/archivos/subir", {
          method: "POST",
          body: JSON.stringify({ nombre: file.name }),
        });
        await subirConProgreso(prep.url, file, (p) => set({ progreso: p }));
        const d = await api<{ archivo: Archivo }>("/api/panel/archivos", {
          method: "POST",
          body: JSON.stringify({
            tipo: "archivo",
            nombre: file.name,
            ruta: prep.ruta,
            tamano: file.size,
            mime: file.type,
            categoria: categoria || "General",
            descripcion,
          }),
        });
        setArchivos((a) => [d.archivo, ...a]);
        set({ estado: "listo", progreso: 100 });
        setTimeout(() => setSubidas((s) => s.filter((x) => x.id !== sid)), 4000);
      } catch (e) {
        set({ estado: "error", error: (e as Error).message });
      }
    }
    setDescripcion("");
  }

  async function guardarEnlace(e: React.FormEvent) {
    e.preventDefault();
    try {
      const d = await api<{ archivo: Archivo }>("/api/panel/archivos", {
        method: "POST",
        body: JSON.stringify({
          tipo: "enlace",
          nombre: enlace.nombre,
          url: enlace.url,
          categoria: categoria || "General",
          descripcion,
        }),
      });
      setArchivos((a) => [d.archivo, ...a]);
      setEnlace({ nombre: "", url: "" });
      setDescripcion("");
      setModoEnlace(false);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function eliminar(id: string) {
    try {
      await api(`/api/panel/archivos/${id}`, { method: "DELETE" });
      setArchivos((a) => a.filter((x) => x.id !== id));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBorrando(null);
    }
  }

  async function guardarEdicion(a: Archivo) {
    try {
      await api(`/api/panel/archivos/${a.id}`, {
        method: "PATCH",
        body: JSON.stringify({ nombre: a.nombre, descripcion: a.descripcion, categoria: a.categoria }),
      });
      setArchivos((list) => list.map((x) => (x.id === a.id ? a : x)));
      setEditando(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="grid lg:grid-cols-[22rem_1fr] gap-space-lg items-start">
      {/* Subida */}
      <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-space-md space-y-space-sm lg:sticky lg:top-32">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-on-surface">{modoEnlace ? "Agregar enlace" : "Subir archivos"}</h2>
          <button onClick={() => setModoEnlace((v) => !v)} className="text-body-sm text-primary hover:underline">
            {modoEnlace ? "Subir archivo" : "Agregar enlace"}
          </button>
        </div>

        <label className="block">
          <span className="block text-label-md font-label-md uppercase text-on-surface-variant mb-space-2xs">Categoría</span>
          <input
            list="cats-archivos"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Ej: Activadores, Office, Drivers…"
            className={inputCls}
          />
          <datalist id="cats-archivos">
            {categorias.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        <label className="block">
          <span className="block text-label-md font-label-md uppercase text-on-surface-variant mb-space-2xs">Nota (opcional)</span>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={2}
            placeholder="Versión, para qué sirve, contraseña del .zip…"
            className={textareaCls}
          />
        </label>

        {modoEnlace ? (
          <form onSubmit={guardarEnlace} className="space-y-space-sm">
            <input
              required
              value={enlace.nombre}
              onChange={(e) => setEnlace({ ...enlace, nombre: e.target.value })}
              placeholder="Nombre (ej: Office 2021 ISO)"
              className={inputCls}
            />
            <input
              required
              type="url"
              value={enlace.url}
              onChange={(e) => setEnlace({ ...enlace, url: e.target.value })}
              placeholder="https://drive.google.com/…"
              className={inputCls}
            />
            <button className={`${btnPrimario} w-full`}>
              <Link2 size={16} /> Guardar enlace
            </button>
            <p className="text-body-sm text-on-surface-variant">
              Útil para instaladores muy pesados que tengas en Drive, MEGA, etc.
            </p>
          </form>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setArrastrando(true);
            }}
            onDragLeave={() => setArrastrando(false)}
            onDrop={(e) => {
              e.preventDefault();
              setArrastrando(false);
              if (e.dataTransfer.files.length) subirArchivos(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-space-lg text-center transition-colors ${
              arrastrando ? "border-primary bg-primary-fixed/40" : "border-outline-variant hover:border-primary-container hover:bg-surface-container-low"
            }`}
          >
            <UploadCloud className="mx-auto text-primary-container mb-space-xs" size={32} />
            <p className="text-body-sm font-semibold text-on-surface">Arrastra aquí o toca para elegir</p>
            <p className="text-body-sm text-on-surface-variant">.exe, .zip, .iso, .pdf…</p>
            <input
              ref={inputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => {
                if (e.target.files?.length) subirArchivos(e.target.files);
                e.target.value = "";
              }}
            />
          </div>
        )}

        {subidas.length > 0 && (
          <ul className="space-y-space-xs">
            {subidas.map((s) => (
              <li key={s.id} className="text-body-sm">
                <div className="flex items-center gap-space-xs">
                  {s.estado === "subiendo" && <Loader2 size={14} className="animate-spin text-primary shrink-0" />}
                  {s.estado === "listo" && <Check size={14} className="text-secondary shrink-0" />}
                  {s.estado === "error" && <X size={14} className="text-error shrink-0" />}
                  <span className="truncate flex-1">{s.nombre}</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">{s.progreso}%</span>
                  {s.estado === "error" && (
                    <button onClick={() => setSubidas((l) => l.filter((x) => x.id !== s.id))} aria-label="Quitar">
                      <X size={14} />
                    </button>
                  )}
                </div>
                <div className="h-1.5 mt-1 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className={`h-full transition-all ${s.estado === "error" ? "bg-error" : "bg-primary-container"}`}
                    style={{ width: `${s.progreso}%` }}
                  />
                </div>
                {s.error && <p className="text-error mt-1">{s.error}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Lista */}
      <section className="min-w-0">
        <div className="flex flex-col sm:flex-row gap-space-sm mb-space-md">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar archivos…"
              className={`${inputCls} pl-9`}
            />
          </div>
          <select value={filtroCat} onChange={(e) => setFiltroCat(e.target.value)} className={`${inputCls} sm:w-48`}>
            <option>Todas</option>
            {categorias.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {error && <p className="mb-space-md text-body-sm text-error bg-[#ffdad6] dark:bg-[#3b1416]/50 rounded-xl p-space-sm">{error}</p>}

        {cargando ? (
          <div className="flex justify-center py-space-2xl text-on-surface-variant">
            <Loader2 className="animate-spin" />
          </div>
        ) : visibles.length === 0 ? (
          <div className="text-center py-space-2xl text-on-surface-variant">
            <FileIcon className="mx-auto mb-space-xs opacity-50" size={32} />
            <p className="text-body-sm">{archivos.length ? "Nada coincide con la búsqueda." : "Aún no has subido archivos."}</p>
          </div>
        ) : (
          <ul className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 divide-y divide-outline-variant/50">
            {visibles.map((a) =>
              editando === a.id ? (
                <FilaEdicion key={a.id} archivo={a} categorias={categorias} onCancel={() => setEditando(null)} onSave={guardarEdicion} />
              ) : (
                <li key={a.id} className="flex items-start gap-space-sm p-space-sm sm:p-space-md">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                    {a.tipo === "enlace" ? <Link2 size={18} /> : <FileIcon size={18} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-on-surface break-all leading-snug">{a.nombre}</p>
                    {a.descripcion && <p className="text-body-sm text-on-surface-variant whitespace-pre-wrap mt-0.5">{a.descripcion}</p>}
                    <p className="font-label-md text-label-md text-on-surface-variant mt-space-2xs flex flex-wrap gap-x-space-sm gap-y-1">
                      <span className="px-1.5 rounded bg-surface-container text-on-surface">{a.categoria}</span>
                      {a.tipo === "archivo" ? <span>{formatoTamano(a.tamano)}</span> : <span>Enlace externo</span>}
                      <span>{formatoFecha(a.created_at)}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={`/api/panel/archivos/${a.id}/descargar`}
                      target={a.tipo === "enlace" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`${btnSecundario} h-9 px-space-sm`}
                    >
                      {a.tipo === "enlace" ? <ExternalLink size={16} /> : <Download size={16} />}
                      <span className="hidden md:inline">{a.tipo === "enlace" ? "Abrir" : "Descargar"}</span>
                    </a>
                    <button onClick={() => setEditando(a.id)} className={btnIcono} aria-label="Editar">
                      <Pencil size={16} />
                    </button>
                    {borrando === a.id ? (
                      <button
                        onClick={() => eliminar(a.id)}
                        onBlur={() => setBorrando(null)}
                        autoFocus
                        className="h-9 px-space-sm rounded-lg bg-error text-on-error text-body-sm font-semibold"
                      >
                        ¿Borrar?
                      </button>
                    ) : (
                      <button onClick={() => setBorrando(a.id)} className={`${btnIcono} hover:text-error`} aria-label="Eliminar">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </section>
    </div>
  );
}

function FilaEdicion({
  archivo,
  categorias,
  onCancel,
  onSave,
}: {
  archivo: Archivo;
  categorias: string[];
  onCancel: () => void;
  onSave: (a: Archivo) => void;
}) {
  const [a, setA] = useState(archivo);
  return (
    <li className="p-space-md space-y-space-sm bg-surface-container-low">
      <input value={a.nombre} onChange={(e) => setA({ ...a, nombre: e.target.value })} className={inputCls} placeholder="Nombre" />
      <input
        list="cats-archivos-edit"
        value={a.categoria}
        onChange={(e) => setA({ ...a, categoria: e.target.value })}
        className={inputCls}
        placeholder="Categoría"
      />
      <datalist id="cats-archivos-edit">
        {categorias.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <textarea
        value={a.descripcion}
        onChange={(e) => setA({ ...a, descripcion: e.target.value })}
        rows={2}
        className={textareaCls}
        placeholder="Nota"
      />
      <div className="flex gap-space-xs justify-end">
        <button onClick={onCancel} className={btnSecundario}>
          Cancelar
        </button>
        <button onClick={() => onSave(a)} className={btnPrimario}>
          Guardar
        </button>
      </div>
    </li>
  );
}
