/** Datos globales del sitio. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://red-informatica.com").replace(/\/+$/, "");

export const NOMBRE = "RED INFORMÁTICA";
export const EMAIL = "redinformaticatotal@gmail.com";
export const TELEFONO = "+505 8918-8813";
export const WHATSAPP = "50589188813";
export const FACEBOOK = "https://www.facebook.com/profile.php?id=61594252049186";
export const TIKTOK = "https://www.tiktok.com/@red_informatica";

export function waLink(mensaje: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Perfil de Empresa en Google. Pega aquí los enlaces de tu perfil:
 *  - GOOGLE_RESENAS_URL: en tu perfil → "Pedir reseñas" → copiar enlace (ej. https://g.page/r/XXXX/review)
 *  - GOOGLE_MAPS_URL: el enlace de tu negocio en Google Maps (botón Compartir → copiar enlace)
 * Mientras estén vacíos, el bloque de Google no se muestra.
 */
export const GOOGLE_RESENAS_URL = "https://g.page/r/CRrvEs0TFcKpEBM/review";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/5Pwhh4GSEkdMJ47F8";

/** Mapa incrustado de Google Maps (Red Informática, Sébaco). */
export const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883.4725094364217!2d-86.10892096566751!3d12.85790181630685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f722dfbeba4f3f1%3A0xa9c21513cd12ef1a!2sRed%20Inform%C3%A1tica!5e1!3m2!1ses-419!2sni!4v1793129251519!5m2!1ses-419!2sni";
