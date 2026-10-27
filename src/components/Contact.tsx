"use client";

import { useEffect, useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/validation";

type Status = { type: "idle" | "loading" | "success" | "error"; message?: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  useEffect(() => {
    if (status.type === "success") {
      const timer = setTimeout(() => setStatus({ type: "idle" }), 6000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "loading" });

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      nombre: String(fd.get("nombre") ?? ""),
      telefono: String(fd.get("telefono") ?? ""),
      email: String(fd.get("email") ?? ""),
      servicio: String(fd.get("servicio") ?? ""),
      mensaje: String(fd.get("mensaje") ?? ""),
      privacidad: fd.get("privacidad") === "on",
      web: String(fd.get("web") ?? ""),
    };

    try {
      const res = await fetch("/api/consultas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus({ type: "error", message: data.error ?? "Ocurrió un error. Intenta por WhatsApp." });
        return;
      }

      setStatus({ type: "success", message: data.message });
      form.reset();
    } catch {
      setStatus({ type: "error", message: "Error de conexión. Verifica tu internet o escríbenos por WhatsApp." });
    }
  }

  return (
    <section id="contacto" className="w-full py-space-3xl bg-surface-container-low">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-md space-y-space-lg">
            <div className="space-y-space-2xs">
              <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Atención Sin Compromiso</span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Solicitar Diagnóstico o Cotización</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Completa los datos de tu consulta. Uno de nuestros técnicos te responderá en un plazo máximo de 2 a 4 horas hábiles.
              </p>
            </div>

            <form className="space-y-space-md" onSubmit={handleSubmit}>
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="web">No completar este campo</label>
                <input id="web" name="web" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="space-y-space-2xs">
                  <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="nombre">Nombre y Apellido *</label>
                  <input
                    className="w-full h-11 px-space-sm rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary"
                    id="nombre"
                    name="nombre"
                    placeholder="Ej. Juan Pérez"
                    required
                    maxLength={80}
                    autoComplete="name"
                    type="text"
                  />
                </div>
                <div className="space-y-space-2xs">
                  <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="telefono">Teléfono / WhatsApp *</label>
                  <input
                    className="w-full h-11 px-space-sm rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary"
                    id="telefono"
                    name="telefono"
                    placeholder="+505 0000 0000"
                    required
                    maxLength={20}
                    autoComplete="tel"
                    type="tel"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="space-y-space-2xs">
                  <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="email">Correo Electrónico *</label>
                  <input
                    className="w-full h-11 px-space-sm rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary"
                    id="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.com"
                    required
                    maxLength={120}
                    autoComplete="email"
                    type="email"
                  />
                </div>
                <div className="space-y-space-2xs">
                  <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="servicio">Servicio Requerido *</label>
                  <select
                    className="w-full h-11 px-space-sm rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary"
                    id="servicio"
                    name="servicio"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-space-2xs">
                <label className="font-body-sm text-body-sm font-semibold text-on-surface" htmlFor="mensaje">Descripción del Problema o Requerimiento *</label>
                <textarea
                  className="w-full p-space-sm rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary resize-y"
                  id="mensaje"
                  name="mensaje"
                  placeholder="Cuéntanos el modelo del equipo, el fallo presentado o las características de la web que necesitas..."
                  required
                  rows={4}
                  maxLength={2000}
                />
              </div>

              <div className="flex items-start gap-space-xs">
                <input className="mt-1 h-4 w-4 rounded accent-primary" id="privacidad" name="privacidad" required type="checkbox" />
                <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="privacidad">
                  He leído y acepto la{" "}
                  <a href="/privacidad" target="_blank" className="text-primary underline hover:no-underline">
                    política de privacidad
                  </a>{" "}
                  para la gestión de mi consulta técnica.
                </label>
              </div>

              <button
                className="w-full py-space-sm px-space-lg bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-space-xs disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={status.type === "loading"}
              >
                <span>{status.type === "loading" ? "Enviando..." : "Enviar Consulta Técnica"}</span>
                {status.type !== "loading" && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.872L5.999 12zm0 0h7.5" /></svg>
                )}
              </button>

              {status.type === "success" && (
                <div role="status" className="p-space-sm rounded-lg bg-surface-container-high text-primary font-body-sm text-body-sm flex items-center gap-space-xs">
                  <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{status.message}</span>
                </div>
              )}
              {status.type === "error" && (
                <div role="alert" className="p-space-sm rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm flex items-center gap-space-xs">
                  <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z" /></svg>
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-5 space-y-space-md">
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm space-y-space-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Contacto Directo Inmediato</h3>
              <div className="space-y-space-sm">
                <a
                  className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-space-sm text-on-surface"
                  href="https://wa.me/50589188813?text=Hola%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20de%20RED%20INFORM%C3%81TICA."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">WhatsApp Técnico Rápido</div>
                    <div className="font-headline-sm text-headline-sm font-bold">+505 8918-8813</div>
                  </div>
                </a>
                <a
                  className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-space-sm text-on-surface"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=redinformaticatotal@gmail.com&su=Consulta%20t%C3%A9cnica%20-%20RED%20INFORM%C3%81TICA"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">Correo de Soporte</div>
                    <div className="font-headline-sm text-headline-sm font-bold break-all">redinformaticatotal@gmail.com</div>
                  </div>
                </a>
                <a
                  className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-space-sm text-on-surface"
                  href="https://www.tiktok.com/@red_informatica"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#111] dark:bg-black dark:ring-1 dark:ring-outline-variant text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z" /></svg>
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">Mira nuestros trabajos en TikTok</div>
                    <div className="font-headline-sm text-headline-sm font-bold">@red_informatica</div>
                  </div>
                </a>
                <div className="p-space-sm rounded-xl bg-surface-container flex items-center gap-space-sm text-on-surface">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">Tiempo de Respuesta</div>
                    <div className="font-body-sm text-body-sm font-semibold">Máximo 2 a 4 horas hábiles</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm space-y-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Atención Empresarial</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Ofrecemos soporte remoto seguro y visitas in-situ para evaluaciones de parque informático corporativo. Contáctanos para una propuesta adaptada a tu operación.
              </p>
              <a
                href="https://wa.me/50589188813?text=Hola%2C%20represento%20a%20una%20empresa%20y%20quiero%20informaci%C3%B3n%20de%20soporte%20corporativo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs text-primary font-headline-sm text-headline-sm hover:underline"
              >
                <span>Consultar soporte corporativo</span>
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
