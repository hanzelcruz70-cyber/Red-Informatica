import { createHmac, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Autenticación del panel privado.
 * Solo existe UN usuario: el definido en las variables de entorno
 *   ADMIN_EMAIL           -> tu correo
 *   ADMIN_PASSWORD_HASH   -> hash scrypt de tu contraseña (genéralo con: node scripts/crear-acceso.mjs)
 *   ADMIN_SESSION_SECRET  -> texto aleatorio largo para firmar la sesión
 */

export const SESSION_COOKIE = "ri_panel";
export const SESSION_HOURS = 8;

function getSecret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET no configurado (mínimo 32 caracteres)");
  return s;
}

export function panelConfigurado() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.ADMIN_SESSION_SECRET &&
      process.env.ADMIN_SESSION_SECRET.length >= 32
  );
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Formato del hash: scrypt:<salt hex>:<hash hex> */
export function verificarCredenciales(email: string, password: string) {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const stored = process.env.ADMIN_PASSWORD_HASH ?? "";
  const [algo, saltHex, hashHex] = stored.split(":");
  if (!adminEmail || algo !== "scrypt" || !saltHex || !hashHex) return false;

  // Siempre calculamos el hash (aunque el correo no coincida) para no filtrar información por tiempos.
  const calc = scryptSync(password, Buffer.from(saltHex, "hex"), 64).toString("hex");
  const passOk = safeEqual(calc, hashHex);
  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail);
  return passOk && emailOk;
}

function firmar(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function crearToken(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ e: email.trim().toLowerCase(), exp: Date.now() + SESSION_HOURS * 3600 * 1000 })
  ).toString("base64url");
  return `${payload}.${firmar(payload)}`;
}

export function leerToken(token: string | undefined | null): { email: string } | null {
  if (!token || !panelConfigurado()) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  if (!safeEqual(firmar(payload), sig)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { e: string; exp: number };
    if (!data.exp || Date.now() > data.exp) return null;
    if (data.e !== (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase()) return null;
    return { email: data.e };
  } catch {
    return null;
  }
}

/** Devuelve la sesión actual o null. Usar en páginas y rutas API del panel. */
export async function obtenerSesion() {
  const store = await cookies();
  return leerToken(store.get(SESSION_COOKIE)?.value);
}
