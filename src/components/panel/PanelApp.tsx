"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, EyeOff, Eye, HardDrive, LogOut, Star } from "lucide-react";
import ArchivosTab from "./ArchivosTab";
import GuiasTab from "./GuiasTab";
import ResenasTab from "./ResenasTab";

type Tab = "archivos" | "guias" | "resenas";

export default function PanelApp({ email }: { email: string }) {
  const [tab, setTab] = useState<Tab>("guias");
  const [discreto, setDiscreto] = useState(true);

  useEffect(() => {
    try {
      const t = localStorage.getItem("panel-tab");
      if (t === "archivos" || t === "guias" || t === "resenas") setTab(t);
      const d = localStorage.getItem("panel-discreto");
      if (d === "0") setDiscreto(false);
    } catch {}
  }, []);

  function cambiarTab(t: Tab) {
    setTab(t);
    try {
      localStorage.setItem("panel-tab", t);
    } catch {}
  }

  function cambiarDiscreto() {
    setDiscreto((v) => {
      try {
        localStorage.setItem("panel-discreto", v ? "0" : "1");
      } catch {}
      return !v;
    });
  }

  async function salir() {
    await fetch("/api/panel/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/panel/login";
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/50">
        <div className="max-w-[80rem] mx-auto px-gutter-mobile md:px-gutter-tablet h-16 flex items-center gap-space-sm">
          <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
          <div className="min-w-0 mr-auto">
            <p className="font-semibold text-on-surface leading-tight">Panel privado</p>
            <p className="text-label-md font-label-md text-on-surface-variant truncate">{email}</p>
          </div>

          <button
            onClick={cambiarDiscreto}
            title="Modo discreto: oculta los comandos hasta que los muestres (útil cuando compartes pantalla)"
            className={`hidden sm:inline-flex items-center gap-space-xs h-9 px-space-sm rounded-lg text-body-sm font-medium border transition-colors ${
              discreto
                ? "bg-primary-fixed border-primary-fixed-dim text-on-primary-fixed-variant"
                : "border-outline-variant text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {discreto ? <EyeOff size={16} /> : <Eye size={16} />}
            Modo discreto
          </button>
          <button
            onClick={cambiarDiscreto}
            className="sm:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-outline-variant text-on-surface-variant"
            aria-label="Modo discreto"
          >
            {discreto ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>

          <button
            onClick={salir}
            className="inline-flex items-center gap-space-xs h-9 px-space-sm rounded-lg text-body-sm text-on-surface-variant hover:bg-surface-container"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>

        <nav className="max-w-[80rem] mx-auto px-gutter-mobile md:px-gutter-tablet flex gap-space-lg">
          {(
            [
              { id: "guias", label: "Guías", icon: BookOpen },
              { id: "archivos", label: "Archivos", icon: HardDrive },
              { id: "resenas", label: "Reseñas", icon: Star },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => cambiarTab(id)}
              className={`relative flex items-center gap-space-xs py-space-sm text-body-sm font-semibold transition-colors ${
                tab === id ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Icon size={16} />
              {label}
              {tab === id && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-[80rem] mx-auto px-gutter-mobile md:px-gutter-tablet py-space-lg">
        {tab === "archivos" ? <ArchivosTab /> : tab === "resenas" ? <ResenasTab /> : <GuiasTab discreto={discreto} />}
      </main>
    </>
  );
}
