import { NextResponse } from "next/server";
import { obtenerSesion } from "@/lib/panel-auth";

export const BUCKET = "panel-archivos";

export function noAutorizado() {
  return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
}

export function errorJson(mensaje: string, status = 400) {
  return NextResponse.json({ ok: false, error: mensaje }, { status });
}

/** Lanza 401 si no hay sesión válida. */
export async function exigirSesion() {
  const s = await obtenerSesion();
  return s;
}

export const sinCache = { "Cache-Control": "no-store, max-age=0" };
