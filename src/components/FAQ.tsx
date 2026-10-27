const FAQS = [
  {
    q: "¿Cuánto tarda un diagnóstico de computadora o laptop?",
    a: "El diagnóstico inicial habitual se realiza en 24 a 48 horas laborables. Si es una urgencia corporativa, disponemos de servicio express con revisión prioritaria en menos de 12 horas.",
  },
  {
    q: "¿Se perderán mis archivos o fotos durante la reparación u optimización?",
    a: "No. La integridad de tus datos es nuestra prioridad absoluta. Antes de cualquier manipulación de sistema, formateo o reemplazo de disco duro, ofrecemos y ejecutamos un respaldo completo de tu información confidencial.",
  },
  {
    q: "¿Qué garantía tienen las reparaciones y repuestos instalados?",
    a: "Todos los componentes nuevos (pantallas, teclados, discos SSD, fuentes, memorias RAM) cuentan con garantía oficial de fabricante de 1 a 3 años. El servicio de mano de obra técnica cuenta con garantía escrita de 90 días.",
  },
  {
    q: "¿Cuánto tiempo toma tener una página web corporativa lista?",
    a: "Una página corporativa estándar o landing page de presentación de servicios suele completarse en un plazo de 7 a 15 días laborables, dependiendo de la entrega de contenidos e imágenes por parte del cliente.",
  },
  {
    q: "¿Hacen soporte a domicilio o remoto para empresas?",
    a: "Sí, realizamos visitas in-situ para evaluaciones de parque informático en empresas y disponemos de software seguro de asistencia remota para resolver incidencias de software de inmediato sin traslados.",
  },
];

export default function FAQ() {
  return (
    <section className="w-full py-space-3xl bg-surface">
      <div className="max-w-[56rem] mx-auto px-gutter-mobile md:px-gutter-tablet">
        <div className="text-center space-y-space-xs mb-space-2xl">
          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Resolución de Dudas</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Preguntas Frecuentes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Respuestas directas a las preguntas más habituales de nuestros clientes.</p>
        </div>

        <div className="space-y-space-sm">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden transition-all">
              <summary className="w-full p-space-md text-left flex justify-between items-center gap-space-sm cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-headline-sm text-headline-sm text-on-surface">{faq.q}</span>
                <svg
                  className="w-6 h-6 text-primary shrink-0 transform transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-space-md pb-space-md text-on-surface-variant font-body-md text-body-md">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
