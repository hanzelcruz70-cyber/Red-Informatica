import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_HOURS,
  crearToken,
  panelConfigurado,
  verificarCredenciales,
} from "@/lib/panel-auth";

const MAX_INTENTOS = 5;
const VENTANA_MS = 15 * 60 * 1000;
const intentos = new Map<string, { count: number; reset: number }>();

function bloqueado(ip: string) {
  const now = Date.now();
  const e = intentos.get(ip);
  if (!e || now > e.reset) return false;
  return e.count >= MAX_INTENTOS;
}

function registrarFallo(ip: string) {
  const now = Date.now();
  const e = intentos.get(ip);
  if (!e || now > e.reset) intentos.set(ip, { count: 1, reset: now + VENTANA_MS });
  else e.count++;
}

export async function POST(req: NextRequest) {
  if (!panelConfigurado()) {
    return NextResponse.json(
      { ok: false, error: "El panel aún no está configurado (faltan variables de entorno)." },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";

  if (bloqueado(ip)) {
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
    registrarFallo(ip);
    return NextResponse.json({ ok: false, error: "Correo o contraseña incorrectos." }, { status: 401 });
  }

  intentos.delete(ip);
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
