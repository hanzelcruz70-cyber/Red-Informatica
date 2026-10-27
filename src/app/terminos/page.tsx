import type { Metadata } from "next";
import LegalPage, { Seccion } from "@/components/LegalPage";
import { EMAIL, TELEFONO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos del Servicio",
  description: "Condiciones de los servicios técnicos, reservas, garantías y soporte a distancia de RED INFORMÁTICA.",
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return (
    <LegalPage etiqueta="Legal" titulo="Términos del Servicio" actualizado="27 de octubre de 2026">
      <p>
        Estos términos aplican a los servicios de RED INFORMÁTICA: soporte técnico, reparación, optimización,
        instalación de programas y desarrollo web, ya sea en nuestro taller, a domicilio o a distancia. Al
        solicitar un servicio aceptas estas condiciones.
      </p>

      <Seccion titulo="1. Diagnóstico y presupuesto">
        <p>
          Antes de realizar cualquier trabajo revisamos el equipo y te informamos el diagnóstico y el costo.
          Ningún trabajo se realiza sin tu aprobación. Si durante el servicio aparece una falla adicional, te
          consultamos antes de continuar.
        </p>
      </Seccion>

      <Seccion titulo="2. Reservas de instalación de programas">
        <p>
          El botón “Reservar” abre una conversación por WhatsApp para apartar un espacio. La reserva queda
          confirmada cuando te respondemos con la fecha, la modalidad (en taller o a distancia) y el costo. Si no
          puedes asistir, avísanos con anticipación para reprogramar.
        </p>
      </Seccion>

      <Seccion titulo="3. Software y licencias">
        <p>
          Instalamos y configuramos los programas que solicitas. El uso de cada programa está sujeto a la licencia
          de su fabricante, y el cliente es responsable de contar con la licencia correspondiente. Con gusto te
          orientamos sobre las opciones oficiales, gratuitas o de prueba disponibles para cada programa.
        </p>
      </Seccion>

      <Seccion titulo="4. Tus archivos y respaldos">
        <p>
          Cuidamos la información de tus equipos. Antes de formatear o cambiar el disco te ofrecemos hacer un
          respaldo. Te recomendamos mantener tus propias copias de seguridad: no nos hacemos responsables por
          pérdida de datos causada por fallas del hardware que ya existían al recibir el equipo o cuando el cliente
          decide no respaldar.
        </p>
      </Seccion>

      <Seccion titulo="5. Soporte a distancia">
        <p>
          Para el soporte remoto usamos programas de acceso remoto que tú autorizas en cada sesión. Puedes ver
          todo lo que hacemos y terminar la conexión en cualquier momento. Solo accedemos a tu equipo durante la
          sesión acordada.
        </p>
      </Seccion>

      <Seccion titulo="6. Garantía">
        <ul className="list-disc pl-space-lg space-y-space-2xs">
          <li>La mano de obra tiene garantía de 90 días sobre el trabajo realizado.</li>
          <li>Los repuestos tienen la garantía que ofrece su fabricante o proveedor.</li>
          <li>
            La garantía no cubre golpes, derrames de líquidos, variaciones de voltaje, virus o programas instalados
            después del servicio, ni equipos manipulados por terceros.
          </li>
        </ul>
      </Seccion>

      <Seccion titulo="7. Retiro de equipos">
        <p>
          Te avisamos cuando tu equipo está listo. Te pedimos retirarlo en un plazo de 30 días después del aviso;
          pasado ese tiempo no podemos garantizar su resguardo.
        </p>
      </Seccion>

      <Seccion titulo="8. Desarrollo web">
        <p>
          Los plazos de entrega dependen de que nos envíes a tiempo los textos, imágenes y accesos necesarios. El
          alcance, el precio y las condiciones de cada proyecto web se acuerdan por escrito antes de empezar.
        </p>
      </Seccion>

      <Seccion titulo="9. Reseñas">
        <p>
          Solo pueden dejar reseña en este sitio los clientes que recibieron un servicio: al terminar cada
          trabajo enviamos un enlace personal que se usa una sola vez. Publicamos las reseñas tal como las
          escriben, sean positivas o negativas; solo ocultamos contenido ofensivo, publicidad o datos personales de
          terceros.
        </p>
      </Seccion>

      <Seccion titulo="10. Contacto y legislación">
        <p>
          Para cualquier duda escríbenos a{" "}
          <a className="text-primary hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> o al {TELEFONO}. Estos
          términos se rigen por las leyes de la República de Nicaragua.
        </p>
      </Seccion>
    </LegalPage>
  );
}
