export default function Hero() {
  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/40 via-surface to-background pb-space-3xl pt-space-2xl md:pt-space-3xl lg:pt-space-4xl">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div className="relative max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="space-y-space-xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-lowest shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse" aria-hidden="true"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Tecnología de Alto Rendimiento</span>
            <span className="text-outline-variant font-label-sm text-label-sm" aria-hidden="true">|</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Atención Personalizada</span>
          </div>

          <div className="space-y-space-md">
            <h1 className="font-display text-display-mobile md:text-display lg:text-[72px] lg:leading-[82px] xl:text-[80px] xl:leading-[90px] tracking-tight text-on-surface max-w-5xl">
              Soluciones Tecnológicas Integrales a tu Alcance
            </h1>
            <p className="font-body-lg text-body-lg lg:text-[24px] lg:leading-[38px] text-on-surface-variant max-w-4xl leading-relaxed">
              En <strong className="font-semibold text-on-surface">Red Informática</strong> (Sébaco, Matagalpa) somos especialistas en soporte técnico informático, reparación avanzada de hardware, optimización de velocidad de sistemas, despliegue de software empresarial y diseño web profesional orientado a resultados.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-md pt-space-2xs">
            <a
              href="/contacto"
              className="inline-flex items-center gap-space-xs px-space-xl py-space-md bg-primary-container text-on-primary font-headline-sm text-headline-sm lg:text-[22px] lg:leading-[30px] rounded-lg shadow-md hover:bg-primary transition-all"
            >
              <span>Solicitar Diagnóstico</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a
              href="/casos"
              className="inline-flex items-center gap-space-xs px-space-xl py-space-md bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-headline-sm text-headline-sm lg:text-[22px] lg:leading-[30px] rounded-lg shadow-sm transition-all"
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              <span>Ver casos reales</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md max-w-6xl">
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-sm">
              <svg className="w-9 h-9 text-[#16A34A] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 7.033 4.182 12.728 8.995 14.07a1 1 0 00.01 0C16.818 21.728 21 16.033 21 9c0-.414-.02-.824-.06-1.229a11.94 11.94 0 01-2.382-.787z" /></svg>
              <div>
                <div className="font-label-lg text-label-lg font-bold text-on-surface">Soporte Garantizado</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">Piezas y servicios 100% testeados</div>
              </div>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-sm">
              <svg className="w-9 h-9 text-[#F59E0B] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <div>
                <div className="font-label-lg text-label-lg font-bold text-on-surface">Atención Rápida</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">Diagnóstico express en 24-48h</div>
              </div>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-sm">
              <svg className="w-9 h-9 text-[#8B5CF6] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              <div>
                <div className="font-label-lg text-label-lg font-bold text-on-surface">+5 Años</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">Experiencia técnica comprobada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
