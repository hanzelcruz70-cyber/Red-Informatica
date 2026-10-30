import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_HOURS,
  crearToken,
  panelConfigurado,
  verificarCredenciales,
} from "@/lib/panel-auth";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

const MAX_INTENTOS = 5;
const VENTANA_MS = 15 * 60 * 1000;
const TABLA = "panel_login_intentos";

// Respaldo en memoria por si todavía no se ejecutó panel-login.sql en Supabase.
const intentos = new Map<string, { count: number; reset: number }>();

function bloqueadoMemoria(ip: string) {
  const now = Date.now();
  const e = intentos.get(ip);
  if (!e || now > e.reset) return false;
  return e.count >= MAX_INTENTOS;
}

function falloMemoria(ip: string) {
  const now = Date.now();
  const e = intentos.get(ip);
  if (!e || now > e.reset) intentos.set(ip, { count: 1, reset: now + VENTANA_MS });
  else e.count++;
}

/** Cuenta los fallos recientes en Supabase; si la tabla no existe usa la memoria. */
async function bloqueado(ip: string) {
  if (bloqueadoMemoria(ip)) return true;
  try {
    const desde = new Date(Date.now() - VENTANA_MS).toISOString();
    const { count, error } = await getSupabaseAdmin()
      .from(TABLA)
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", desde);
    if (error) return false;
    return (count ?? 0) >= MAX_INTENTOS;
  } catch {
    return false;
  }
}

async function registrarFallo(ip: string) {
  falloMemoria(ip);
  try {
    const sb = getSupabaseAdmin();
    await sb.from(TABLA).insert({ ip });
    // Limpieza: borra registros de más de un día
    await sb.from(TABLA).delete().lt("created_at", new Date(Date.now() - 24 * 3600 * 1000).toISOString());
  } catch {
    /* tabla aún no creada: queda el respaldo en memoria */
  }
}

async function limpiarFallos(ip: string) {
  intentos.delete(ip);
  try {
    await getSupabaseAdmin().from(TABLA).delete().eq("ip", ip);
  } catch {
    /* sin tabla, nada que limpiar */
  }
}

export async function POST(req: NextRequest) {
  if (!panelConfigurado()) {
    return NextResponse.json(
      { ok: false, error: "El panel aún no está configurado (faltan variables de entorno)." },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get("x-real-ip")?.trim() || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (await bloqueado(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Espera 15 minutos." },
      { status: 429 }
    );
  }

  const body = (await req.json().catch(() => null)) as { email?: unknown; password?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.slice(0, 200) : "";
  const password = typeof body?.password === "string" ? body.password.slice(0, 200) : "";

  // Pequeño retraso fijo para frenar ataques de fuerza bruta
  await new Promise((r) => setTimeout(r, 600));

  if (!email || !password || !verificarCredenciales(email, password)) {
    await registrarFallo(ip);
    return NextResponse.json({ ok: false, error: "Correo o contraseña incorrectos." }, { status: 401 });
  }

  await limpiarFallos(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, crearToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  return res;
}
