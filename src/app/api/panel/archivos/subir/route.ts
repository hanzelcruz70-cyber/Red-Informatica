import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { BUCKET, errorJson, exigirSesion, noAutorizado, sinCache } from "@/lib/panel-api";

/**
 * Paso 1 de la subida: el servidor (ya verificada tu sesión) genera una URL firmada
 * de un solo uso para que el navegador suba el archivo directo a Supabase Storage.
 * Así no se pasa por el límite de 4.5 MB de Vercel.
 */
export async function POST(req: NextRequest) {
  if (!(await exigirSesion())) return noAutorizado();

  const body = (await req.json().catch(() => null)) as { nombre?: unknown } | null;
  const nombre = typeof body?.nombre === "string" ? body.nombre.trim() : "";
  if (!nombre) return errorJson("Falta el nombre del archivo");

  const limpio =
    nombre
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9._-]+/g, "_")
      .replace(/_+/g, "_")
      .slice(-120) || "archivo";

  const ruta = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID().slice(0, 8)}-${limpio}`;

  const { data, error } = await getSupabaseAdmin().storage.from(BUCKET).createSignedUploadUrl(ruta);
  if (error || !data) {
    console.error("createSignedUploadUrl:", error?.message);
    return errorJson(
      "No se pudo preparar la subida. ¿Creaste el bucket 'panel-archivos' en Supabase?",
      500
    );
  }

  return NextResponse.json({ ok: true, ruta: data.path, url: data.signedUrl }, { headers: sinCache });
}
