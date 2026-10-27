const PILLARS = [
  {
    title: "Diagnóstico Certero",
    desc: "Utilizamos instrumental de telemetría y pruebas de estrés para detectar fallos reales de componentes sin adivinanzas ni cambios innecesarios.",
    tag: "[01. PRECISIÓN]",
    color: "bg-gradient-to-br from-[#22D3EE] to-[#0E7490] text-white shadow-sm",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    ),
  },
  {
    title: "Rapidez y Garantía",
    desc: "Compromiso de entrega ágil con garantía por escrito en todas las intervenciones de hardware, limpiezas y desarrollos web.",
    tag: "[02. AGILIDAD]",
    color: "bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white shadow-sm",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: "Software Original y Seguro",
    desc: "Instalación de sistemas certificados, sanitización completa de virus, respaldo seguro de archivos confidenciales y configuración antivirus.",
    tag: "[03. INTEGRIDAD]",
    color: "bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-sm",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    ),
  },
  {
    title: "Diseño Web a Medida",
    desc: "Sitios web ultrarrápidos, diseñados para captar clientes, adaptados a dispositivos móviles y optimizados técnicamente para motores de búsqueda.",
    tag: "[04. VISIBILIDAD]",
    color: "bg-gradient-to-br from-[#22C55E] to-[#15803D] text-white shadow-sm",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m0-18a9 9 0 018.014 4.958L21 12M3.05 13a9 9 0 01.544-3.557L12 12l-8.95 1zM12 3a9 9 0 018.966 8.052M12 21v-9m0 9a9 9 0 01-8.966-8.052" />
    ),
  },
];

export default function Pillars() {
  return (
    <section id="nosotros" className="w-full py-space-2xl bg-surface">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="text-center max-w-3xl mx-auto space-y-space-xs mb-space-xl">
          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">¿Por qué confiar en nosotros?</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Ingeniería y soporte informático sin incertidumbres</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Combinamos pericia técnica en hardware, certificaciones de software y desarrollo web moderno para ofrecer soluciones duraderas tanto a empresas como a particulares.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {PILLARS.map((pillar) => (
            <div key={pillar.tag} className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow space-y-space-sm flex flex-col justify-between">
              <div className="space-y-space-xs">
                <div className={`w-12 h-12 rounded-lg ${pillar.color} flex items-center justify-center`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">{pillar.icon}</svg>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{pillar.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{pillar.desc}</p>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-semibold">{pillar.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
