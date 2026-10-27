import Image from "next/image";

const PROJECTS = [
  {
    tag: "PLATAFORMA WEB · GESTIÓN",
    title: "PowerFit Gym Sébaco",
    desc: "Sitio web completo para gimnasio: planes de membresía, equipo, instalaciones e integración directa con WhatsApp para captación de clientes. Diseño responsive de alto impacto.",
    result: "Landing operativa con planes y captación de leads vía WhatsApp.",
    tags: ["Next.js", "Responsive", "WhatsApp API"],
    href: "https://gymcube.vercel.app/",
    image: "/projects/powerfit.svg",
    alt: "Logo de PowerFit Gym Sébaco",
    badgeBg: "bg-secondary text-on-secondary",
    resultColor: "text-secondary",
    fit: "contain",
    bg: "#0A0A0B",
  },
  {
    tag: "APLICACIÓN WEB · PWA",
    title: "Mi Tienda · Cuaderno Digital",
    desc: "Sistema de gestión para negocios: ventas contado y fiado, control de deudas de clientes, gastos, compras a proveedores, inventario y corte de caja. Instalable como app (PWA) y hecha para negocios reales.",
    result: "Digitalización completa de la operación diaria del negocio.",
    tags: ["Next.js", "PWA", "Supabase"],
    href: "https://cuaderno-digital-seven.vercel.app/",
    image: "/projects/cuaderno.png",
    alt: "Logo de Mi Tienda, cuaderno digital",
    badgeBg: "bg-primary text-on-primary",
    resultColor: "text-primary",
    fit: "contain",
    bg: "#A84825",
  },
  {
    tag: "PUNTO DE VENTA · PWA",
    title: "Mi Prenda · Tiendas de Ropa Americana",
    desc: "Punto de venta para bazares y paca: caja con arqueo diario, libreta de fiados con abonos, inventario con márgenes de ganancia por prenda y apartados en Lives de TikTok. Funciona sin internet y se instala en el celular.",
    result: "Sistema completo de ventas, fiados y Lives en una sola app instalable.",
    tags: ["Next.js", "PWA", "Offline"],
    href: "https://mi-prenda.vercel.app/",
    image: "/projects/miprenda.jpg",
    alt: "Logo de Mi Prenda, punto de venta para tiendas de ropa americana",
    badgeBg: "bg-secondary text-on-secondary",
    resultColor: "text-secondary",
    fit: "cover",
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="w-full py-space-3xl bg-surface-container-low/40">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-sm">
          <div className="space-y-space-2xs">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Historial Operativo</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Proyectos Realizados y Casos de Éxito</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Soluciones entregadas con éxito a empresas, profesionales independientes y organizaciones.
            </p>
          </div>
          <div className="font-label-sm text-label-sm text-on-surface-variant shrink-0">
            PROYECTOS EN PRODUCCIÓN
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {PROJECTS.map((project) => (
            <article key={project.title} className="rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className={`w-full h-full ${project.fit === "contain" ? "object-contain object-center" : "object-cover object-center"}`}
                  style={project.bg ? { backgroundColor: project.bg } : undefined}
                />
                <div className={`absolute top-space-sm right-space-sm font-label-sm text-label-sm px-space-xs py-space-2xs rounded-md shadow ${project.badgeBg}`}>
                  {project.tag}
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between space-y-space-md">
                <div className="space-y-space-xs">
                  <h3 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">{project.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{project.desc}</p>
                  <div className="p-space-sm rounded-lg bg-surface-container space-y-space-2xs">
                    <div className={`font-label-sm text-label-sm ${project.resultColor} font-bold`}>RESULTADO:</div>
                    <div className="font-body-sm text-body-sm text-on-surface">{project.result}</div>
                  </div>
                </div>
                <div className="space-y-space-sm">
                  <div className="flex flex-wrap gap-space-2xs pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-space-xs py-space-2xs bg-surface-container-high rounded">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-space-xs text-primary font-headline-sm text-headline-sm hover:underline"
                  >
                    <span>Visitar proyecto</span>
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
