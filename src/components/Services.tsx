const SERVICES = [
  {
    tag: "[HARDWARE LAB]",
    title: "Reparación de Computadoras y Laptops",
    desc: "Recuperamos la operatividad de tus equipos portátiles y de escritorio frente a cualquier falla electrónica, recalentamiento o quiebre físico.",
    bullets: [
      "Diagnóstico profundo de placas base, fuentes de poder y pantallas",
      "Cambio de componentes: teclado, batería, conectores de carga y bisagras",
      "Mantenimiento térmico preventivo: limpieza de disipadores y pastas de alto rendimiento",
      "Reparación de fallos de encendido, cortocircuitos y sobretensiones",
    ],
    cta: "Consultar reparación de equipo",
    iconBg: "bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white shadow-sm",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    ),
  },
  {
    tag: "[SPEED BOOST]",
    title: "Optimización y Mantenimiento de Sistemas",
    desc: "Multiplica la velocidad de tu PC y elimina demoras. Transformamos equipos lentos en estaciones de trabajo ágiles y altamente eficientes.",
    bullets: [
      "Actualización y clonación instantánea de disco duro mecánico a disco SSD ultra rápido",
      "Eliminación exhaustiva de virus, malware, adware, troyanos y spyware",
      "Depuración de procesos residuales, temporales y optimización de arranque en segundos",
      "Ampliación de memoria RAM para multitarea fluida y trabajo corporativo",
    ],
    cta: "Optimizar velocidad de sistema",
    iconBg: "bg-gradient-to-br from-[#22C55E] to-[#15803D] text-white shadow-sm",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.986 14.986 0 006.16-12.12A14.987 14.987 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06m4.01 0a5.994 5.994 0 00-.282-.507m-3.202 2.313a6 6 0 003.013-.933" />
    ),
  },
  {
    tag: "[SOFTWARE & OS]",
    title: "Instalación y Configuración de Software",
    desc: "Entornos de software estables, actualizados y debidamente parametrizados para garantizar seguridad, compatibilidad y cero interrupciones.",
    bullets: [
      "Instalación limpia y configuración de Windows 10/11 Pro, Linux y macOS",
      "Suites completas de ofimática, edición de diseño, arquitectura y gestión",
      "Actualización oficial de controladores (drivers), BIOS y parches de seguridad",
      "Sincronización segura de cuentas en la nube y configuración de copias de seguridad",
    ],
    cta: "Solicitar configuración de software",
    iconBg: "bg-gradient-to-br from-[#FB923C] to-[#EA580C] text-white shadow-sm",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    ),
  },
  {
    tag: "[DEV & DESIGN]",
    title: "Diseño y Desarrollo de Páginas Web",
    desc: "Construimos plataformas digitales modernas y funcionales que proyectan solvencia institucional, cautivan a los visitantes y generan contactos reales.",
    bullets: [
      "Sitios web corporativos y páginas de aterrizaje (landing pages) de alto impacto",
      "Diseño 100% adaptable a teléfonos móviles, tabletas y computadoras de escritorio",
      "Optimización para Google (SEO técnico), velocidad de carga instantánea y certificado SSL",
      "Integración de canales directos: botones de WhatsApp, formularios y catálogos de servicios",
    ],
    cta: "Cotizar proyecto web profesional",
    iconBg: "bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-sm",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    ),
  },
];

export default function Services() {
  return (
    <section id="servicios" className="w-full py-space-3xl bg-surface-container-low/60">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-sm">
          <div className="space-y-space-2xs">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Nuestras Capacidades</span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Servicios técnicos en Sébaco, Matagalpa</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Soluciones informáticas estructuradas, transparentes y orientadas a prolongar la vida útil de tus equipos e impulsar tu presencia digital.
            </p>
          </div>
          <div className="font-label-sm text-label-sm px-space-sm py-space-2xs rounded-md bg-surface-container-highest text-on-surface shrink-0">
            ATENCIÓN EN TALLER &amp; REMOTA
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {SERVICES.map((service) => (
            <div key={service.tag} className="p-space-lg md:p-space-xl rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between gap-space-xs">
                  <div className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center shrink-0`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">{service.icon}</svg>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-bold">{service.tag}</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">{service.title}</h3>
                  <p className="font-body-md text-body-sm md:text-body-md text-on-surface-variant mt-space-2xs">{service.desc}</p>
                </div>
                <ul className="space-y-space-xs pt-space-xs font-body-sm text-body-sm text-on-surface">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-space-xs">
                      <svg className="w-[18px] h-[18px] text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-space-sm">
                <a href="/contacto" className="inline-flex items-center gap-space-xs text-primary font-headline-sm text-headline-sm hover:underline">
                  <span>{service.cta}</span>
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
