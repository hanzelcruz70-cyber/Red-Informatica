const STEPS = [
  {
    num: "01",
    title: "Contacto y Recepción",
    desc: "Nos explicas la necesidad de tu negocio o el síntoma de tu equipo por WhatsApp, llamada o formulario web.",
  },
  {
    num: "02",
    title: "Diagnóstico y Presupuesto",
    desc: "Realizamos las pruebas pertinentes y emitimos un presupuesto detallado y cerrado antes de tocar una sola pieza.",
  },
  {
    num: "03",
    title: "Ejecución Técnica",
    desc: "Nuestros especialistas reparan, instalan, configuran o programan el sitio web cumpliendo los estándares de calidad.",
  },
  {
    num: "04",
    title: "Pruebas y Entrega",
    desc: "Prueba de funcionamiento conjunta frente al cliente, entrega de informe técnico y activación de la garantía.",
  },
];

export default function Process() {
  return (
    <section className="w-full py-space-3xl bg-surface">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-2xl">
          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Metodología Clara</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Proceso de Trabajo Transparente</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Sabrás en todo momento en qué fase se encuentra tu equipo o proyecto digital, sin sorpresas ni costes ocultos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {STEPS.map((step, i) => (
            <div key={step.num} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm space-y-space-sm relative">
              <div className={`w-10 h-10 rounded-full font-label-md text-label-md font-bold flex items-center justify-center ${i === STEPS.length - 1 ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary"}`}>
                {step.num}
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">{step.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
