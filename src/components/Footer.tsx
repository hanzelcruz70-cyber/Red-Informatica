import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-1px_6px_rgba(0,0,0,0.03)] mt-space-3xl">
      <div className="max-w-[90rem] mx-auto px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop 2xl:px-gutter-2xl py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl">
          <div className="space-y-space-sm">
            <div className="flex items-center gap-space-xs">
              <Image src="/logo.png" alt="Logo RED INFORMÁTICA" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
              <span className="font-headline-sm text-headline-sm text-on-surface">RED INFORMÁTICA</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Soluciones tecnológicas integrales, infraestructura de alta disponibilidad y soporte informático especializado para empresas y profesionales exigentes.</p>
            <div className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" aria-hidden="true"></span>
              DISPONIBILIDAD OPERATIVA 24/7
            </div>
          </div>

          <div className="space-y-space-sm">
            <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface block">Servicios Especializados</span>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors flex items-center gap-space-2xs" href="/servicios"><span aria-hidden="true">›</span>Reparación y Mantenimiento</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-space-2xs" href="/servicios"><span aria-hidden="true">›</span>Optimización de Sistemas</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-space-2xs" href="/programas"><span aria-hidden="true">›</span>Instalación de Programas</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-space-2xs" href="/servicios"><span aria-hidden="true">›</span>Diseño y Desarrollo Web</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-space-2xs" href="/servicios"><span aria-hidden="true">›</span>Seguridad &amp; Respaldo de Datos</a></li>
            </ul>
          </div>

          <div className="space-y-space-sm">
            <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface block">Contacto Directo</span>
            <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <a className="flex items-center gap-space-xs hover:text-primary transition-colors" href="https://wa.me/50589188813?text=Hola%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20de%20RED%20INFORM%C3%81TICA." target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25l-1.372-4.923a2.25 2.25 0 00-1.573-1.555l-3.99-.9a2.25 2.25 0 00-1.94.444l-1.932 1.554a17.006 17.006 0 01-5.887-5.887L7.79 7.533a2.25 2.25 0 00.443-1.94l-.9-3.99a2.25 2.25 0 00-1.555-1.573L2.25 1.5A2.25 2.25 0 000 3.75v3z" /></svg>
                <span>+505 8918-8813</span>
              </a>
              <a className="flex items-center gap-space-xs hover:text-primary transition-colors" href="https://mail.google.com/mail/?view=cm&fs=1&to=redinformaticatotal@gmail.com&su=Consulta%20t%C3%A9cnica%20-%20RED%20INFORM%C3%81TICA" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <span className="break-all">redinformaticatotal@gmail.com</span>
              </a>
              <a className="flex items-center gap-space-xs hover:text-primary transition-colors" href="https://www.facebook.com/profile.php?id=61594252049186" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                <span>Síguenos en Facebook</span>
              </a>
              <a className="flex items-center gap-space-xs hover:text-primary transition-colors" href="https://www.tiktok.com/@red_informatica" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z" /></svg>
                <span>Síguenos en TikTok</span>
              </a>
              <a className="flex items-center gap-space-xs hover:text-primary transition-colors" href="https://maps.app.goo.gl/5Pwhh4GSEkdMJ47F8" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                <span>Sébaco, Matagalpa · Ver en Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-space-2xl pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-md text-label-md">
          <div>© {new Date().getFullYear()} RED INFORMÁTICA. Todos los derechos reservados.</div>
          <div className="flex flex-wrap justify-center gap-space-md">
            <a className="hover:text-primary transition-colors" href="/contacto">Contacto</a>
            <a className="hover:text-primary transition-colors" href="/proyectos">Proyectos</a>
            <a className="hover:text-primary transition-colors" href="/privacidad">Privacidad</a>
            <a className="hover:text-primary transition-colors" href="/terminos">Términos del Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
