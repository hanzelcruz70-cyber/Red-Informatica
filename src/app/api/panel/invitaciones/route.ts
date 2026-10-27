import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { errorJson, exigirSesion, noAutorizado, sinCache } from "@/lib/panel-api";
import { SERVICIOS_RESENA } from "@/lib/resenas-servicios";

const CAMPOS = "id, created_at, token, cliente, servicio, usada_at, resena_id";
const MSG_SQL = "No se pudo leer. ¿Ejecutaste resenas-verificadas.sql en Supabase?";

export async function GET() {
  if (!(await exigirSesion())) return noAutorizado();
  const { data, error } = await getSupabaseAdmin()
    .from("resena_invitaciones")
    .select(CAMPOS)
    .order("created_at", { ascending: false })
    .limit(300);
  if (error) {
    console.error("invitaciones select:", error.message);
    return errorJson(MSG_SQL, 500);
  }
  return NextResponse.json({ ok: true, invitaciones: data }, { headers: sinCache });
}

/** Crea un enlace único para que un cliente real deje su reseña. */
export async function POST(req: NextRequest) {
  if (!(await exigirSesion())) return noAutorizado();
  const b = (await req.json().catch(() => null)) as { cliente?: unknown; servicio?: unknown } | null;
  const cliente = typeof b?.cliente === "string" ? b.cliente.replace(/[<>]/g, "").trim().slice(0, 60) : "";
  const servicio = typeof b?.servicio === "string" ? b.servicio : "";
  if (cliente.length < 2) return errorJson("Escribe el nombre del cliente");
  if (!(SERVICIOS_RESENA as readonly string[]).includes(servicio)) return errorJson("Elige el servicio");

  const token = randomBytes(18).toString("base64url");
  const { data, error } = await getSupabaseAdmin()
    .from("resena_invitaciones")
    .insert({ token, cliente, servicio })
    .select(CAMPOS)
    .single();
  if (error) {
    console.error("invitaciones insert:", error.message);
    return errorJson(MSG_SQL, 500);
  }
  return NextResponse.json({ ok: true, invitacion: data }, { status: 201 });
}
