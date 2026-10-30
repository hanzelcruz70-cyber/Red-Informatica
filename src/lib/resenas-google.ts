/**
 * Capturas de reseñas de nuestra ficha de Google Maps.
 * Para agregar una: guarda la captura en public/resenas/ y añade una línea aquí
 * (el texto va en "texto" para que Google y los lectores de pantalla puedan leerla).
 */
export type ResenaGoogle = {
  img: string;
  ancho: number;
  alto: number;
  nombre: string;
  texto: string;
};

export const RESENAS_GOOGLE: ResenaGoogle[] = [
  {
    img: "/resenas/ivys-moreno.webp",
    ancho: 900,
    alto: 267,
    nombre: "Ivys Moreno",
    texto:
      "¡Servicio técnico impecable, rápido y súper confiable! Llevé mi computadora porque estaba fallando y la atención fue excelente de principio a fin. Me explicaron con claridad cuál era el problema, el presupuesto fue justo y el trabajo quedó listo en tiempo récord. Ahora la máquina vuela y funciona mejor que nunca. Da gusto encontrar a profesionales tan honestos y eficientes. ¡100% recomendado!",
  },
  {
    img: "/resenas/joseling-gonzalez.webp",
    ancho: 900,
    alto: 235,
    nombre: "Joseling Gonzalez",
    texto:
      "Excelente atención y servicio técnico. Mi laptop presentaba un problema molesto con la activación de la licencia y lo solucionaron en poco tiempo. Muy profesionales, transparentes y confiables. 100% recomendados si buscas un servicio de calidad en Sébaco.",
  },
  {
    img: "/resenas/tomioka.webp",
    ancho: 900,
    alto: 311,
    nombre: "TOMIOKA",
    texto:
      "Excelente servicio, muy buen trabajo con las computadoras y las redes informáticas. Todo muy profesional, rápido y de calidad. 100% recomendado.",
  },
  {
    img: "/resenas/fernand-o-bando.webp",
    ancho: 900,
    alto: 275,
    nombre: "Fernand-O-bando",
    texto: "Muy buen servicio, y gran atención al cliente. Mis equipos quedaron trabajando al 100",
  },
  {
    img: "/resenas/jonathan-reyes.webp",
    ancho: 900,
    alto: 271,
    nombre: "Jonathan Reyes",
    texto: "Serios y profesionales, de alts confianza mi compu salio como nueva",
  },
  {
    img: "/resenas/enmanuel-torres.webp",
    ancho: 900,
    alto: 274,
    nombre: "Enmanuel Torres",
    texto: "Buen servicio, me ayudó a realizar la instalación de antivirus en mi equipo.",
  },
  {
    img: "/resenas/geovany-flores-mendoza.webp",
    ancho: 900,
    alto: 221,
    nombre: "Geovany Flores Mendoza",
    texto: "Excelente atención",
  },
];
