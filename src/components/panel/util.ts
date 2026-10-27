"use client";

/** fetch JSON que manda al login si la sesión caducó. */
export async function api<T = Record<string, unknown>>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  if (r.status === 401) {
    window.location.href = "/panel/login";
    throw new Error("Sesión expirada");
  }
  const d = await r.json().catch(() => ({}));
  if (!r.ok || d.ok === false) throw new Error(d.error ?? `Error ${r.status}`);
  return d as T;
}

export function formatoTamano(bytes: number | null | undefined) {
  if (bytes == null) return "";
  if (bytes < 1024) return `${bytes} B`;
  const u = ["KB", "MB", "GB"];
  let v = bytes / 1024;
  let i = 0;
  while (v >= 1024 && i < u.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v < 10 ? 1 : 0)} ${u[i]}`;
}

export function formatoFecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-NI", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function normalizar(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export const inputCls =
  "w-full h-10 px-space-sm rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container text-body-sm";

export const textareaCls =
  "w-full px-space-sm py-space-xs rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container text-body-sm";

export const btnPrimario =
  "inline-flex items-center justify-center gap-space-xs h-10 px-space-md rounded-xl bg-primary-container hover:bg-primary text-on-primary text-body-sm font-semibold transition-colors disabled:opacity-60";

export const btnSecundario =
  "inline-flex items-center justify-center gap-space-xs h-10 px-space-md rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface text-body-sm font-medium transition-colors disabled:opacity-60";

export const btnIcono =
  "inline-flex items-center justify-center h-9 w-9 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors";
