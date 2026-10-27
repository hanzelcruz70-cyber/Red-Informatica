import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado, sinCache } from "@/lib/panel-api";
import { CAMPOS_RESENA } from "@/lib/resenas";

export async function GET() {
  if (!(await exigirSesion())) return noAutorizado();
  const { data, error } = await getSupabaseAdmin()
    .from("resenas")
    .select(CAMPOS_RESENA)
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) {
    console.error("resenas select:", error.message);
    return errorJson("No se pudieron leer las reseñas. ¿Ejecutaste resenas-verificadas.sql en Supabase?", 500);
  }
  return NextResponse.json({ ok: true, resenas: data }, { headers: sinCache });
}
