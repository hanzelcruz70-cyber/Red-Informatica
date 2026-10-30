"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  CalendarCheck,
  Clapperboard,
  DraftingCompass,
  FileText,
  MonitorCog,
  Palette,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { waLink } from "@/lib/site";

type Categoria = {
  id: string;
  nombre: string;
  icono: LucideIcon;
  color: string;
  programas: { nombre: string; detalle: string; logo?: string }[];
};

const CATEGORIAS: Categoria[] = [
  {
    id: "oficina",
    nombre: "Oficina",
    icono: FileText,
    color: "bg-primary-fixed text-primary",
    programas: [
      { nombre: "Microsoft 365", detalle: "Office siempre actualizado", logo: "microsoft-365" },
      { nombre: "Office 2024", detalle: "LTSC / Professional Plus / Standard / Visio / Project", logo: "office" },
      { nombre: "Office 2021", detalle: "LTSC / Professional Plus / Standard / Visio / Project", logo: "office" },
      { nombre: "Office 2019", detalle: "Professional Plus / Standard / Visio / Project", logo: "office" },
      { nombre: "Office 2016", detalle: "Professional Plus / Standard / Visio / Project", logo: "office" },
      { nombre: "Office 2013", detalle: "Professional Plus / Standard / Visio / Project", logo: "office" },
      { nombre: "Office 2010", detalle: "Professional Plus / Standard", logo: "office" },
    ],
  },
  {
    id: "diseno",
    nombre: "Diseño gráfico",
    icono: Palette,
    color: "bg-secondary-fixed text-secondary",
    programas: [
      { nombre: "Adobe Photoshop", detalle: "Edición de fotos", logo: "photoshop" },
      { nombre: "Adobe Illustrator", detalle: "Logos y vectores", logo: "illustrator" },
      { nombre: "Adobe InDesign", detalle: "Revistas y catálogos", logo: "indesign" },
      { nombre: "Adobe Lightroom", detalle: "Revelado fotográfico", logo: "lightroom" },
      { nombre: "CorelDRAW", detalle: "Diseño vectorial y rotulación", logo: "coreldraw" },
    ],
  },
  {
    id: "video",
    nombre: "Video y audio",
    icono: Clapperboard,
    color: "bg-tertiary-fixed text-tertiary",
    programas: [
      { nombre: "Adobe Premiere Pro", detalle: "Edición de video", logo: "premiere" },
      { nombre: "Adobe After Effects", detalle: "Animación y efectos", logo: "after-effects" },
      { nombre: "Adobe Audition", detalle: "Edición de audio", logo: "audition" },
      { nombre: "Filmora", detalle: "Edición de video fácil", logo: "filmora" },
    ],
  },
  {
    id: "ingenieria",
    nombre: "Arquitectura e ingeniería",
    icono: DraftingCompass,
    color: "bg-primary-fixed text-primary",
    programas: [
      { nombre: "AutoCAD", detalle: "Dibujo técnico 2D y 3D", logo: "autocad" },
      { nombre: "AutoCAD Civil 3D", detalle: "Topografía y carreteras", logo: "autocad" },
      { nombre: "Revit", detalle: "Modelado BIM", logo: "revit" },
      { nombre: "SketchUp", detalle: "Modelado 3D rápido", logo: "sketchup" },
      { nombre: "Lumion", detalle: "Renders y recorridos", logo: "lumion" },
      { nombre: "Slide (Rocscience)", detalle: "Estabilidad de taludes", logo: "slide" },
    ],
  },
  {
    id: "sistemas",
    nombre: "Sistemas operativos",
    icono: MonitorCog,
    color: "bg-tertiary-fixed text-tertiary",
    programas: [
      { nombre: "Windows 11", detalle: "Instalación limpia y configuración", logo: "windows-11" },
      { nombre: "Windows 10", detalle: "Ideal para equipos con pocos recursos", logo: "windows-10" },
      { nombre: "Linux Ubuntu", detalle: "Sistema libre y liviano", logo: "ubuntu" },
      { nombre: "Controladores (drivers)", detalle: "Video, audio, Wi-Fi e impresoras", logo: "drivers" },
    ],
  },
  {
    id: "utilidades",
    nombre: "Seguridad y utilidades",
    icono: ShieldCheck,
    color: "bg-primary-fixed text-primary",
    programas: [
      { nombre: "Antivirus ESET", detalle: "Protección contra virus", logo: "eset" },
      { nombre: "Kaspersky", detalle: "Protección contra virus", logo: "kaspersky" },
      { nombre: "WinRAR", detalle: "Comprimir y descomprimir", logo: "winrar" },
      { nombre: "7-Zip", detalle: "Compresor gratuito", logo: "7zip" },
    ],
  },
];

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function Programs() {
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const visibles = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return CATEGORIAS.flatMap((c) =>
      filtro !== "todos" && c.id !== filtro
        ? []
        : c.programas
            .filter((p) => !q || normalizar(`${p.nombre} ${p.detalle} ${c.nombre}`).includes(q))
            .map((p) => ({ ...p, categoria: c }))
    );
  }, [filtro, busqueda]);

  const chip = (activo: boolean) =>
    `shrink-0 px-space-sm py-space-xs rounded-full font-body-sm text-body-sm font-semibold transition-colors ${
      activo
        ? "bg-primary text-on-primary"
        : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
    }`;

  return (
    <section id="programas" className="w-full py-space-3xl bg-surface scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm">
          <div className="space-y-space-2xs">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Instalación de programas</span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Instalación de programas en Sébaco</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Elige el programa que necesitas y reserva tu instalación. Lo dejamos instalado, configurado y listo
              para trabajar, en nuestro taller o a distancia.
            </p>
          </div>
          <label className="relative w-full md:w-80 shrink-0">
            <span className="sr-only">Buscar programa</span>
            <Search className="absolute left-space-sm top-1/2 -translate-y-1/2 w-5 h-5 text-outline" aria-hidden="true" />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar programa…"
              className="w-full h-11 pl-10 pr-space-sm rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface focus:outline-none focus:border-primary"
            />
          </label>
        </div>

        <div className="flex gap-space-xs overflow-x-auto pb-space-xs mb-space-lg -mx-gutter-mobile px-gutter-mobile md:mx-0 md:px-0 md:flex-wrap">
          <button type="button" className={chip(filtro === "todos")} onClick={() => setFiltro("todos")}>
            Todos
          </button>
          {CATEGORIAS.map((c) => (
            <button key={c.id} type="button" className={chip(filtro === c.id)} onClick={() => setFiltro(c.id)}>
              {c.nombre}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
          {visibles.map(({ nombre, detalle, logo, categoria }) => {
            const Icono = categoria.icono;
            return (
              <li
                key={nombre}
                className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-sm"
              >
                <div className="flex items-start gap-space-sm">
                  {logo ? (
                    <Image
                      src={`/logos/${logo}.png`}
                      alt={`Logo de ${nombre}`}
                      width={44}
                      height={44}
                      className="w-11 h-11 object-contain shrink-0"
                    />
                  ) : (
                    <div className={`w-11 h-11 rounded-lg ${categoria.color} flex items-center justify-center shrink-0`}>
                      <Icono className="w-6 h-6" aria-hidden="true" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-body-md text-body-md font-bold text-on-surface leading-snug">{nombre}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{detalle}</p>
                  </div>
                </div>
                <a
                  href={waLink(`Hola, quiero reservar la instalación de ${nombre}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-space-xs h-10 rounded-lg bg-primary-container hover:bg-[#16A34A] text-on-primary shadow-sm hover:shadow-md font-body-sm text-body-sm font-semibold transition-colors"
                >
                  <CalendarCheck className="w-4 h-4" aria-hidden="true" />
                  Reservar
                </a>
              </li>
            );
          })}
          <li className="p-space-md rounded-xl border-2 border-dashed border-outline-variant flex flex-col justify-center gap-space-sm">
            <h3 className="font-body-md text-body-md font-bold text-on-surface">¿No ves tu programa?</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Instalamos muchos más. Escríbenos cuál necesitas y te confirmamos.
            </p>
            <a
              href={waLink("Hola, quiero reservar la instalación de un programa que no vi en la lista: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 rounded-lg border border-primary text-primary hover:bg-primary-fixed font-body-sm text-body-sm font-semibold transition-colors"
            >
              Preguntar por otro
            </a>
          </li>
        </ul>

        {visibles.length === 0 && (
          <p className="mt-space-md font-body-sm text-body-sm text-on-surface-variant">
            No encontramos “{busqueda}” en la lista, pero probablemente también lo instalamos. Usa “Preguntar por
            otro”.
          </p>
        )}
      </div>
    </section>
  );
}
