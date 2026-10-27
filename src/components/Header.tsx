"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Programas", href: "/programas" },
  { label: "Casos reales", href: "/casos" },
  { label: "Reseñas", href: "/resenas" },
  { label: "Proyectos", href: "/proyectos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const ruta = usePathname();
  const activo = (href: string) => (href === "/" ? ruta === "/" : ruta?.startsWith(href));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl flex items-center justify-between gap-space-xs sm:gap-space-md">
        <Link href="/" className="flex items-center gap-space-xs sm:gap-space-sm min-w-0" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Logo RED INFORMÁTICA" width={44} height={44} className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-contain shrink-0" priority />
          <span className="font-headline-sm text-[16px] leading-6 min-[400px]:text-headline-sm tracking-tight text-on-surface whitespace-nowrap truncate">RED INFORMÁTICA</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-space-2xs">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activo(item.href) ? "page" : undefined}
              className={`px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-all ${
                activo(item.href)
                  ? "bg-primary-fixed text-primary font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-xs sm:gap-space-sm shrink-0">
          <ThemeToggle />
          <a
            href="/contacto"
            className="hidden sm:inline-flex items-center px-space-md py-space-xs bg-primary-container hover:bg-primary text-on-primary font-body-sm text-body-sm font-semibold rounded-lg shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] transition-colors"
          >
            Contactar
          </a>
          <a
            href={`https://wa.me/50589188813?text=${encodeURIComponent("Hola, quiero solicitar un diagnóstico de RED INFORMÁTICA.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#1fb457] flex items-center justify-center shrink-0 transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Abrir menú"
            className="xl:hidden w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="xl:hidden border-t border-outline-variant/30 bg-surface-container-lowest">
          <div className="px-gutter-mobile py-space-md flex flex-col gap-space-2xs">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={activo(item.href) ? "page" : undefined}
                className={`px-space-md py-space-sm rounded-lg font-body-md text-body-md transition-all ${
                  activo(item.href)
                    ? "bg-primary-fixed text-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/contacto"
              onClick={() => setOpen(false)}
              className="px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary font-body-md text-body-md font-semibold text-center"
            >
              Contactar
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
