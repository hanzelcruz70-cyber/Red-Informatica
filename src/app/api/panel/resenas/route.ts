import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado, sinCache } from "@/lib/panel-api";

export async function GET() {
  if (!(await exigirSesion())) return noAutorizado();
  const { data, error } = await getSupabaseAdmin()
    .from("resenas")
    .select("id, created_at, nombre, servicio, estrellas, comentario, aprobada")
    .order("aprobada", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) {
    console.error("resenas select:", error.message);
    return errorJson("No se pudieron leer las reseñas. ¿Ejecutaste resenas-schema.sql en Supabase?", 500);
  }
  return NextResponse.json({ ok: true, resenas: data }, { headers: sinCache });
}
