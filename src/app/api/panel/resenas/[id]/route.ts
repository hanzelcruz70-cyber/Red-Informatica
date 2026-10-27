import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado } from "@/lib/panel-api";

/** Aprobar u ocultar una reseña. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const b = (await req.json().catch(() => null)) as { aprobada?: unknown } | null;
  if (typeof b?.aprobada !== "boolean") return errorJson("Datos inválidos");

  const { error } = await getSupabaseAdmin().from("resenas").update({ aprobada: b.aprobada }).eq("id", id);
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
