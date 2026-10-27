import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado, sinCache } from "@/lib/panel-api";

const TABLA = "panel_archivos";

export async function GET() {
  if (!(await exigirSesion())) return noAutorizado();
  const { data, error } = await getSupabaseAdmin()
    .from(TABLA)
    .select("id, created_at, nombre, descripcion, categoria, tipo, ruta, url, tamano, mime")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) {
    console.error("panel_archivos select:", error.message);
    return errorJson("No se pudo leer la lista. ¿Ejecutaste el SQL del panel en Supabase?", 500);
  }
  return NextResponse.json({ ok: true, archivos: data }, { headers: sinCache });
}

/** Paso 2 de la subida (o registro de un enlace externo): guarda los datos del archivo. */
export async function POST(req: NextRequest) {
  if (!(await exigirSesion())) return noAutorizado();
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return errorJson("Datos inválidos");

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const tipo = b.tipo === "enlace" ? "enlace" : "archivo";
  const nombre = str(b.nombre, 200);
  const descripcion = str(b.descripcion, 2000);
  const categoria = str(b.categoria, 60) || "General";

  if (!nombre) return errorJson("Ponle un nombre");

  let ruta: string | null = null;
  let url: string | null = null;
  let tamano: number | null = null;
  let mime: string | null = null;

  if (tipo === "archivo") {
    ruta = str(b.ruta, 400);
    if (!ruta || ruta.includes("..")) return errorJson("Ruta inválida");
    tamano = typeof b.tamano === "number" && b.tamano >= 0 ? Math.round(b.tamano) : null;
    mime = str(b.mime, 120) || null;
  } else {
    url = str(b.url, 2000);
    if (!/^https?:\/\//i.test(url)) return errorJson("El enlace debe empezar con http:// o https://");
  }

  const { data, error } = await getSupabaseAdmin()
    .from(TABLA)
    .insert({ nombre, descripcion, categoria, tipo, ruta, url, tamano, mime })
    .select("id, created_at, nombre, descripcion, categoria, tipo, ruta, url, tamano, mime")
    .single();

  if (error) {
    console.error("panel_archivos insert:", error.message);
    return errorJson("No se pudo guardar", 500);
  }
  return NextResponse.json({ ok: true, archivo: data }, { status: 201 });
}
