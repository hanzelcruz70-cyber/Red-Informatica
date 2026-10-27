import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado } from "@/lib/panel-api";

/** Publicar/ocultar una reseña o guardar tu respuesta pública. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const b = (await req.json().catch(() => null)) as { aprobada?: unknown; respuesta?: unknown } | null;
  const cambios: Record<string, boolean | string> = {};
  if (typeof b?.aprobada === "boolean") cambios.aprobada = b.aprobada;
  if (typeof b?.respuesta === "string") cambios.respuesta = b.respuesta.replace(/[<>]/g, "").trim().slice(0, 800);
  if (!Object.keys(cambios).length) return errorJson("Datos inválidos");

  const { error } = await getSupabaseAdmin().from("resenas").update(cambios).eq("id", id);
  if (error) return errorJson("No se pudo actualizar la reseña", 500);
  revalidatePath("/resenas");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const { error } = await getSupabaseAdmin().from("resenas").delete().eq("id", id);
  if (error) return errorJson("No se pudo eliminar", 500);
  revalidatePath("/resenas");
  return NextResponse.json({ ok: true });
}
