import { z } from "zod";

export const SERVICE_OPTIONS = [
  { value: "reparacion", label: "Reparación de Computadora / Laptop" },
  { value: "optimizacion", label: "Optimización y Mantenimiento SSD" },
  { value: "software", label: "Instalación de Software & OS" },
  { value: "web", label: "Diseño y Desarrollo de Página Web" },
  { value: "soporte-integral", label: "Soporte Corporativo Integral" },
] as const;

const sanitize = (str: string) =>
  str
    .replace(/[<>]/g, "")
    .replace(/\u0000/g, "")
    .trim();

export const consultaSchema = z.object({
  nombre: z
    .string({ error: "El nombre es requerido" })
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre no puede exceder 80 caracteres")
    .transform(sanitize),
  telefono: z
    .string({ error: "El teléfono es requerido" })
    .regex(/^[+0-9\s()-]{7,20}$/, "Formato de teléfono inválido")
    .transform(sanitize),
  email: z
    .string({ error: "El correo es requerido" })
    .email("Correo electrónico inválido")
    .max(120, "El correo no puede exceder 120 caracteres")
    .transform((v) => v.trim().toLowerCase()),
  servicio: z
    .string({ error: "Selecciona un servicio" })
    .refine((v) => SERVICE_OPTIONS.some((s) => s.value === v), "Servicio no válido"),
  mensaje: z
    .string({ error: "El mensaje es requerido" })
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
    .max(2000, "El mensaje no puede exceder 2000 caracteres")
    .transform(sanitize),
  privacidad: z.literal(true, { error: "Debes aceptar la política de privacidad" }),
  web: z.string().max(50).optional(),
});

export type ConsultaInput = z.infer<typeof consultaSchema>;
