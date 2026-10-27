import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado, sinCache } from "@/lib/panel-api";
import { normalizarGuia } from "@/lib/panel-guias";

export async function GET() {
  if (!(await exigirSesion())) return noAutorizado();
  const { data, error } = await getSupabaseAdmin()
    .from("panel_guias")
    .select("*")
    .order("categoria", { ascending: true })
    .order("titulo", { ascending: true });
  if (error) {
    console.error("panel_guias select:", error.message);
    return errorJson("No se pudieron leer las guías. ¿Ejecutaste el SQL del panel en Supabase?", 500);
  }
  return NextResponse.json({ ok: true, guias: data }, { headers: sinCache });
}

export async function POST(req: NextRequest) {
  if (!(await exigirSesion())) return noAutorizado();
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return errorJson("Datos inválidos");
  const guia = normalizarGuia(b);
  if (!guia.titulo) return errorJson("La guía necesita un título");

  const { data, error } = await getSupabaseAdmin().from("panel_guias").insert(guia).select("*").single();
  if (error) {
    console.error("panel_guias insert:", error.message);
    return errorJson("No se pudo guardar la guía", 500);
  }
  return NextResponse.json({ ok: true, guia: data }, { status: 201 });
}
