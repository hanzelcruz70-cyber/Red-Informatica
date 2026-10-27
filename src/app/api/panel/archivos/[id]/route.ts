import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { BUCKET, errorJson, exigirSesion, noAutorizado } from "@/lib/panel-api";

const TABLA = "panel_archivos";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return errorJson("Datos inválidos");

  const cambios: Record<string, string> = {};
  if (typeof b.nombre === "string" && b.nombre.trim()) cambios.nombre = b.nombre.trim().slice(0, 200);
  if (typeof b.descripcion === "string") cambios.descripcion = b.descripcion.trim().slice(0, 2000);
  if (typeof b.categoria === "string") cambios.categoria = b.categoria.trim().slice(0, 60) || "General";

  const { error } = await getSupabaseAdmin().from(TABLA).update(cambios).eq("id", id);
  if (error) return errorJson("No se pudo actualizar", 500);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const sb = getSupabaseAdmin();

  const { data: fila } = await sb.from(TABLA).select("ruta").eq("id", id).single();
  if (fila?.ruta) {
    const { error: e1 } = await sb.storage.from(BUCKET).remove([fila.ruta]);
    if (e1) console.error("storage remove:", e1.message);
  }
  const { error } = await sb.from(TABLA).delete().eq("id", id);
  if (error) return errorJson("No se pudo eliminar", 500);
  return NextResponse.json({ ok: true });
}
