export type Paso = { titulo: string; detalle: string; comando: string };

export type Guia = {
  id: string;
  created_at: string;
  updated_at: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  pasos: Paso[];
  notas: string;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Limpia y valida lo que llega del navegador. */
export function normalizarGuia(b: Record<string, unknown>) {
  const titulo = str(b.titulo, 200);
  const pasosIn = Array.isArray(b.pasos) ? b.pasos.slice(0, 100) : [];
  const pasos: Paso[] = pasosIn
    .map((p) => {
      const o = (p ?? {}) as Record<string, unknown>;
      return {
        titulo: str(o.titulo, 300),
        detalle: str(o.detalle, 5000),
        comando: typeof o.comando === "string" ? o.comando.slice(0, 5000).replace(/\s+$/, "") : "",
      };
    })
    .filter((p) => p.titulo || p.detalle || p.comando);

  return {
    titulo,
    categoria: str(b.categoria, 60) || "General",
    descripcion: str(b.descripcion, 2000),
    notas: str(b.notas, 10000),
    pasos,
  };
}
