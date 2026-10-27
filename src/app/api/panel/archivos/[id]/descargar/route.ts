import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { BUCKET, exigirSesion, noAutorizado } from "@/lib/panel-api";

/**
 * Descarga: genera un enlace firmado que caduca en 2 minutos y redirige a él.
 * Aunque alguien vea el enlace en tu pantalla, deja de servir enseguida.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await exigirSesion())) return noAutorizado();
  const { id } = await params;
  const sb = getSupabaseAdmin();

  const { data: fila, error } = await sb
    .from("panel_archivos")
    .select("tipo, ruta, url, nombre")
    .eq("id", id)
    .single();

  if (error || !fila) return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });

  if (fila.tipo === "enlace" && fila.url) {
    return NextResponse.redirect(fila.url, { status: 302, headers: { "Cache-Control": "no-store" } });
  }

  const extension = fila.ruta?.includes(".") ? fila.ruta.slice(fila.ruta.lastIndexOf(".")) : "";
  const nombreDescarga = fila.nombre.toLowerCase().endsWith(extension.toLowerCase())
    ? fila.nombre
    : `${fila.nombre}${extension}`;

  const { data, error: e2 } = await sb.storage
    .from(BUCKET)
    .createSignedUrl(fila.ruta!, 120, { download: nombreDescarga });

  if (e2 || !data) return NextResponse.json({ ok: false, error: "No se pudo generar la descarga" }, { status: 500 });

  return NextResponse.redirect(data.signedUrl, { status: 302, headers: { "Cache-Control": "no-store" } });
}
