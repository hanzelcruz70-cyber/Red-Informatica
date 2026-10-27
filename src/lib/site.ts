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
