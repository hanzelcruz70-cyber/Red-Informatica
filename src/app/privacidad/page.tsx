import type { Metadata } from "next";
import LegalPage, { Seccion } from "@/components/LegalPage";
import { EMAIL, TELEFONO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo RED INFORMÁTICA recopila, usa y protege tus datos personales.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage etiqueta="Legal" titulo="Política de Privacidad" actualizado="27 de octubre de 2026">
      <p>
        En RED INFORMÁTICA respetamos tu privacidad. Esta política explica qué datos personales recopilamos a
        través de este sitio web y de nuestros servicios técnicos, para qué los usamos y cómo puedes ejercer tus
        derechos, conforme a la Ley No. 787, Ley de Protección de Datos Personales de Nicaragua, y su reglamento.
      </p>

      <Seccion titulo="1. Responsable de tus datos">
        <p>
          RED INFORMÁTICA, servicio de soporte técnico informático con sede en Sébaco, Matagalpa, Nicaragua.
          Puedes contactarnos en <a className="text-primary hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> o
          por WhatsApp al {TELEFONO}.
        </p>
      </Seccion>

      <Seccion titulo="2. Qué datos recopilamos">
        <ul className="list-disc pl-space-lg space-y-space-2xs">
          <li>
            <strong className="text-on-surface">Formulario de contacto:</strong> nombre, teléfono o WhatsApp, correo
            electrónico, el servicio que te interesa y el mensaje que nos escribes.
          </li>
          <li>
            <strong className="text-on-surface">Reseñas:</strong> el nombre y la ciudad que decidas mostrar, el
            servicio recibido, la calificación y tu comentario. Para verificar que eres cliente, guardamos el enlace
            personal que te enviamos y la fecha en que lo usaste.
          </li>
          <li>
            <strong className="text-on-surface">Datos técnicos:</strong> tu dirección IP se usa de forma temporal para
            frenar el envío masivo de formularios (spam). No la guardamos junto a tu consulta.
          </li>
          <li>
            <strong className="text-on-surface">Mensajes por WhatsApp o correo:</strong> la información que tú
            decidas enviarnos para coordinar un servicio o una reserva.
          </li>
        </ul>
      </Seccion>

      <Seccion titulo="3. Para qué los usamos">
        <ul className="list-disc pl-space-lg space-y-space-2xs">
          <li>Responder tu consulta, darte un diagnóstico o cotización y coordinar el servicio o la reserva.</li>
          <li>Publicar tu reseña verificada en el sitio.</li>
          <li>Proteger el sitio contra abusos y spam.</li>
        </ul>
        <p>
          No vendemos, alquilamos ni compartimos tus datos con terceros para fines publicitarios. Tratamos tus
          datos con base en el consentimiento que nos das al enviar un formulario o escribirnos.
        </p>
      </Seccion>

      <Seccion titulo="4. Información dentro de tus equipos">
        <p>
          Cuando reparamos, optimizamos o instalamos programas en tu computadora, de forma presencial o a
          distancia, podemos tener acceso a los archivos que contiene. Solo accedemos a lo necesario para realizar
          el trabajo, no copiamos ni revisamos tus archivos personales sin tu autorización y, si hacemos un
          respaldo a tu solicitud, lo eliminamos de nuestros medios una vez entregado el equipo.
        </p>
      </Seccion>

      <Seccion titulo="5. Proveedores que nos ayudan">
        <p>Para operar el sitio usamos servicios de terceros que procesan datos por cuenta nuestra:</p>
        <ul className="list-disc pl-space-lg space-y-space-2xs">
          <li>Vercel: alojamiento del sitio web.</li>
          <li>Supabase: almacenamiento seguro de consultas y reseñas.</li>
          <li>Resend: envío de las notificaciones por correo de nuevas consultas.</li>
        </ul>
        <p>
          Estos proveedores pueden almacenar la información en servidores fuera de Nicaragua. Solo trabajamos con
          servicios que aplican medidas de seguridad reconocidas.
        </p>
      </Seccion>

      <Seccion titulo="6. Cuánto tiempo los guardamos">
        <p>
          Conservamos las consultas el tiempo necesario para atenderte y por un máximo de 2 años. Las reseñas
          publicadas permanecen mientras no solicites su eliminación.
        </p>
      </Seccion>

      <Seccion titulo="7. Tus derechos">
        <p>
          Puedes solicitar en cualquier momento el acceso, la rectificación, la cancelación (eliminación) o la
          oposición al tratamiento de tus datos personales. Escríbenos a{" "}
          <a className="text-primary hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> indicando tu solicitud y
          te responderemos a la brevedad.
        </p>
      </Seccion>

      <Seccion titulo="8. Cookies">
        <p>
          Este sitio no usa cookies de publicidad ni de rastreo. Solo existe una cookie técnica necesaria para el
          acceso al área privada de administración, que no afecta a los visitantes.
        </p>
      </Seccion>

      <Seccion titulo="9. Seguridad">
        <p>
          Usamos conexiones cifradas (HTTPS), acceso restringido a la base de datos y validación de toda la
          información recibida. Aun así, ningún sistema es infalible; si detectamos un incidente que afecte tus
          datos, te lo informaremos.
        </p>
      </Seccion>

      <Seccion titulo="10. Cambios a esta política">
        <p>
          Podemos actualizar esta política. La fecha de la última actualización siempre aparece al inicio de esta
          página.
        </p>
      </Seccion>
    </LegalPage>
  );
}
