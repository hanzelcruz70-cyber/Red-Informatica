import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado, sinCache } from "@/lib/panel-api";
import { CAMPOS_BASE, CAMPOS_RESENA, faltaColumnaGoogle, resenaGoogleSchema } from "@/lib/resenas";

const AVISO_SQL = "Para agregar reseñas de Google primero ejecuta resenas-google.sql en Supabase (SQL Editor → Run).";

export async function GET() {
  if (!(await exigirSesion())) return noAutorizado();
  const sb = getSupabaseAdmin();
  const r1 = await sb.from("resenas").select(CAMPOS_RESENA).order("created_at", { ascending: false }).limit(500);
  let data = r1.data as unknown[] | null;
  let error = r1.error;
  let faltaSql = false;
  if (error && faltaColumnaGoogle(error.message)) {
    faltaSql = true;
    const r2 = await sb.from("resenas").select(CAMPOS_BASE).order("created_at", { ascending: false }).limit(500);
    data = r2.data as unknown[] | null;
    error = r2.error;
  }
  if (error) {
    console.error("resenas select:", error.message);
    return errorJson("No se pudieron leer las reseñas. ¿Ejecutaste resenas-verificadas.sql en Supabase?", 500);
  }
  return NextResponse.json({ ok: true, resenas: data, faltaSql }, { headers: sinCache });
}

/** Agrega una reseña copiada de tu ficha de Google Maps. */
export async function POST(req: NextRequest) {
  if (!(await exigirSesion())) return noAutorizado();
  const parsed = resenaGoogleSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return errorJson(parsed.error.issues[0]?.message ?? "Datos inválidos");
  const { nombre, estrellas, comentario, fecha } = parsed.data;

  const { data, error } = await getSupabaseAdmin()
    .from("resenas")
    .insert({
      nombre,
      estrellas,
      comentario,
      servicio: "Google",
      ciudad: "",
      origen: "google",
      fecha_resena: fecha || null,
      verificada: false,
      aprobada: true,
    })
    .select(CAMPOS_RESENA)
    .single();

  if (error || !data) {
    console.error("resena google insert:", error?.message);
    return errorJson(faltaColumnaGoogle(error?.message) ? AVISO_SQL : "No se pudo guardar la reseña", 500);
  }
  revalidatePath("/resenas");
  return NextResponse.json({ ok: true, resena: data }, { status: 201 });
}
