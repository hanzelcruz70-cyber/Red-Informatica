import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { SERVICIOS_RESENA } from "@/lib/resenas-servicios";

export type Resena = {
  id: string;
  created_at: string;
  nombre: string;
  servicio: string;
  estrellas: number;
  comentario: string;
  aprobada: boolean;
};

export { SERVICIOS_RESENA };

const limpiar = (s: string) => s.replace(/[<>]/g, "").replace(/\u0000/g, "").trim();

export const resenaSchema = z.object({
  nombre: z
    .string({ required_error: "Escribe tu nombre" })
    .transform(limpiar)
    .pipe(z.string().min(2, "Tu nombre debe tener al menos 2 caracteres").max(60, "Nombre demasiado largo")),
  servicio: z.enum(SERVICIOS_RESENA, { errorMap: () => ({ message: "Elige el servicio que recibiste" }) }),
  estrellas: z.coerce.number().int().min(1, "Elige de 1 a 5 estrellas").max(5, "Elige de 1 a 5 estrellas"),
  comentario: z
    .string({ required_error: "Escribe tu comentario" })
    .transform(limpiar)
    .pipe(z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)").max(800, "Máximo 800 caracteres")),
  web: z.string().max(50).optional(),
});

/** Reseñas aprobadas para mostrar en la web. Nunca rompe la página: si algo falla, devuelve []. */
export async function obtenerResenasAprobadas(limite = 12): Promise<Resena[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("resenas")
      .select("id, created_at, nombre, servicio, estrellas, comentario, aprobada")
      .eq("aprobada", true)
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
