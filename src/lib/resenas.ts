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

export const CAMPOS_RESENA = "id, created_at, nombre, ciudad, servicio, estrellas, comentario, respuesta, aprobada, verificada";

const limpiar = (s: string) => s.replace(/[<>]/g, "").replace(/\u0000/g, "").trim();

/** Formato del token: 24 caracteres base64url. */
export const TOKEN_RE = /^[A-Za-z0-9_-]{24}$/;

export const resenaSchema = z.object({
  token: z.string().regex(TOKEN_RE, "Enlace de reseña inválido"),
  nombre: z
    .string({ required_error: "Escribe tu nombre" })
    .transform(limpiar)
    .pipe(z.string().min(2, "Tu nombre debe tener al menos 2 caracteres").max(60, "Nombre demasiado largo")),
  ciudad: z
    .string()
    .optional()
    .transform((v) => limpiar(v ?? "").slice(0, 60)),
  estrellas: z.coerce.number().int().min(1, "Elige de 1 a 5 estrellas").max(5, "Elige de 1 a 5 estrellas"),
  comentario: z
    .string({ required_error: "Escribe tu comentario" })
    .transform(limpiar)
    .pipe(z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)").max(800, "Máximo 800 caracteres")),
  web: z.string().max(50).optional(),
});

function supabaseListo() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Reseñas verificadas y publicadas. Nunca rompe la página: si algo falla, devuelve []. */
export async function obtenerResenasPublicadas(limite = 24): Promise<Resena[]> {
  if (!supabaseListo()) return [];
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("resenas")
      .select(CAMPOS_RESENA)
      .eq("aprobada", true)
      .eq("verificada", true)
      .order("created_at", { ascending: false })
      .limit(limite);
    if (error) {
      console.error("resenas select:", error.message);
      return [];
    }
    return (data ?? []) as Resena[];
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
