import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PAGINAS: { ruta: string; prioridad: number; frecuencia: "weekly" | "monthly" | "yearly" }[] = [
  { ruta: "", prioridad: 1, frecuencia: "weekly" },
  { ruta: "/servicios", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/programas", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/casos", prioridad: 0.8, frecuencia: "weekly" },
  { ruta: "/resenas", prioridad: 0.7, frecuencia: "weekly" },
  { ruta: "/proyectos", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/contacto", prioridad: 0.8, frecuencia: "yearly" },
  { ruta: "/privacidad", prioridad: 0.3, frecuencia: "yearly" },
  { ruta: "/terminos", prioridad: 0.3, frecuencia: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGINAS.map((p) => ({
    url: `${SITE_URL}${p.ruta}`,
    lastModified: now,
    changeFrequency: p.frecuencia,
    priority: p.prioridad,
  }));
}
