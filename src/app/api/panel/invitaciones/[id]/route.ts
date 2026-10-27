import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado } from "@/lib/panel-api";

/** Borra una invitación que todavía no se usó. */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const { error } = await getSupabaseAdmin().from("resena_invitaciones").delete().eq("id", id).is("usada_at", null);
  if (error) return errorJson("No se pudo eliminar", 500);
  return NextResponse.json({ ok: true });
}
