import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { SERVICIOS_RESENA } from "@/lib/resenas-servicios";

export type Resena = {
  id: string;
  created_at: string;
  nombre: string;
  ciudad: string;
  servicio: string;
  estrellas: number;
  comentario: string;
  respuesta: string;
  aprobada: boolean;
  verificada: boolean;
  /** 'enlace' = cliente verificado · 'google' = copiada de Google Maps */
  origen?: "enlace" | "google";
  fecha_resena?: string | null;
};

export type Invitacion = {
  id: string;
  created_at: string;
  token: string;
  cliente: string;
  servicio: string;
  usada_at: string | null;
  resena_id: string | null;
};

export { SERVICIOS_RESENA };

export const CAMPOS_BASE = "id, created_at, nombre, ciudad, servicio, estrellas, comentario, respuesta, aprobada, verificada";
export const CAMPOS_RESENA = `${CAMPOS_BASE}, origen, fecha_resena`;

/** true si el error es porque todavía no se ejecutó resenas-google.sql */
export const faltaColumnaGoogle = (msg?: string) => Boolean(msg && /origen|fecha_resena/.test(msg));

const limpiar = (s: string) => s.replace(/[<>]/g, "").replace(/\u0000/g, "").trim();

/** Formato del token: 24 caracteres base64url. */
export const TOKEN_RE = /^[A-Za-z0-9_-]{24}$/;

export const resenaSchema = z.object({
  token: z.string().regex(TOKEN_RE, "Enlace de reseña inválido"),
  nombre: z
    .string({ error: "Escribe tu nombre" })
    .transform(limpiar)
    .pipe(z.string().min(2, "Tu nombre debe tener al menos 2 caracteres").max(60, "Nombre demasiado largo")),
  ciudad: z
    .string()
    .optional()
    .transform((v) => limpiar(v ?? "").slice(0, 60)),
  estrellas: z.coerce.number().int().min(1, "Elige de 1 a 5 estrellas").max(5, "Elige de 1 a 5 estrellas"),
  comentario: z
    .string({ error: "Escribe tu comentario" })
    .transform(limpiar)
    .pipe(z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)").max(800, "Máximo 800 caracteres")),
  web: z.string().max(50).optional(),
});

/** Reseña de Google que copias desde tu panel. */
export const resenaGoogleSchema = z.object({
  nombre: z
    .string({ error: "Escribe el nombre del cliente" })
    .transform(limpiar)
    .pipe(z.string().min(2, "Nombre demasiado corto").max(60, "Nombre demasiado largo")),
  estrellas: z.coerce.number().int().min(1, "Elige de 1 a 5 estrellas").max(5, "Elige de 1 a 5 estrellas"),
  comentario: z
    .string()
    .optional()
    .transform((v) => limpiar(v ?? "").slice(0, 1500)),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida")
    .optional()
    .or(z.literal("")),
});

function supabaseListo() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Reseñas publicadas: las verificadas por enlace y las copiadas de Google. Nunca rompe la página. */
export async function obtenerResenasPublicadas(limite = 24): Promise<Resena[]> {
  if (!supabaseListo()) return [];
  try {
    const sb = getSupabaseAdmin();
    const r1 = await sb
      .from("resenas")
      .select(CAMPOS_RESENA)
      .eq("aprobada", true)
      .or("verificada.eq.true,origen.eq.google")
      .order("created_at", { ascending: false })
      .limit(limite);
    let data = r1.data as unknown[] | null;
    let error = r1.error;
    if (error && faltaColumnaGoogle(error.message)) {
      // todavía no se ejecutó resenas-google.sql: muestra solo las verificadas
      const r2 = await sb
        .from("resenas")
        .select(CAMPOS_BASE)
        .eq("aprobada", true)
        .eq("verificada", true)
        .order("created_at", { ascending: false })
        .limit(limite);
      data = r2.data as unknown[] | null;
      error = r2.error;
    }
    if (error) {
      console.error("resenas select:", error.message);
      return [];
    }
    const fechaDe = (r: Resena) => new Date(r.fecha_resena ? `${r.fecha_resena}T12:00:00` : r.created_at).getTime();
    return ((data ?? []) as Resena[]).sort((x, y) => fechaDe(y) - fechaDe(x));
  } catch (e) {
    console.error("resenas:", e);
    return [];
  }
}

/** Busca una invitación por su token. Devuelve null si no existe o el token es inválido. */
export async function buscarInvitacion(token: string): Promise<Invitacion | null> {
  if (!TOKEN_RE.test(token) || !supabaseListo()) return null;
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("resena_invitaciones")
      .select("id, created_at, token, cliente, servicio, usada_at, resena_id")
      .eq("token", token)
      .maybeSingle();
    if (error) {
      console.error("invitacion select:", error.message);
      return null;
    }
    return (data as Invitacion) ?? null;
  } catch {
    return null;
  }
}
