import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado } from "@/lib/panel-api";
import { normalizarGuia } from "@/lib/panel-guias";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return errorJson("Datos inválidos");
  const guia = normalizarGuia(b);
  if (!guia.titulo) return errorJson("La guía necesita un título");

  const { data, error } = await getSupabaseAdmin()
    .from("panel_guias")
    .update({ ...guia, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) return errorJson("No se pudo actualizar la guía", 500);
  return NextResponse.json({ ok: true, guia: data });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const { error } = await getSupabaseAdmin().from("panel_guias").delete().eq("id", id);
  if (error) return errorJson("No se pudo eliminar", 500);
  return NextResponse.json({ ok: true });
}
