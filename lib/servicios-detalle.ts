// Detalle de las páginas de servicio con ruta dinámica /servicios/[slug].
// Fuente única de contenido (título, lead, "¿qué incluye?" y párrafos
// persuasivos) para los servicios que no tienen una página estática propia.
// Los servicios con página propia (mecanica, chapa-pintura, alineacion-balanceo,
// revision-precompra) NO se incluyen acá: Next.js prioriza la ruta estática.

export type ServicioDetalle = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  features: readonly string[];
  paragraphs: readonly string[];
};

export const serviciosDetalle: Record<string, ServicioDetalle> = {
  "servicio-oficial": {
    title: "Servicio Oficial",
    metaTitle: "Servicio Oficial Peugeot, Citroën, BYD y Opel",
    metaDescription:
      "Servicio oficial Peugeot, Citroën, BYD y Opel en Montevideo. Diagnóstico conectado con Francia, repuestos originales y mantenimiento que conserva la garantía oficial.",
    lead: "Servicio oficial Peugeot, Citroën, BYD y Opel. El respaldo de la marca de tu auto, con la atención cercana de una empresa familiar.",
    features: [
      "Diagnóstico computarizado conectado con la central técnica en Francia",
      "Repuestos legítimos y originales de fábrica",
      "Procedimientos y actualizaciones oficiales de cada marca",
      "Mantenimiento que conserva la garantía oficial vigente",
      "Técnicos capacitados según los estándares de la terminal",
      "Historial de servicio oficial de tu vehículo",
    ],
    paragraphs: [
      "Como servicio oficial Peugeot, Citroën, BYD y Opel trabajamos con la misma información técnica, las mismas herramientas y los mismos repuestos que la marca de tu auto. Eso nos permite detectar y resolver cada falla con la precisión que tu vehículo exige.",
      "Hacer los mantenimientos con nosotros mantiene vigente la garantía oficial y protege el valor de tu auto. Y el día que quieras venderlo, un historial de servicio oficial es la mejor carta de presentación.",
      "El respaldo y los estándares de la marca, con el trato humano y la confianza de más de 53 años en el oficio: esa combinación es la que nos posiciona como referentes del servicio automotriz en Uruguay.",
    ],
  },

  frenos: {
    title: "Frenos",
    metaTitle: "Frenos",
    metaDescription:
      "Servicio de frenos en Montevideo: pastillas, discos, líquido y sistema ABS revisados a fondo, con repuestos de calidad y garantía. Frená seguro.",
    lead: "Tu seguridad y la de tu familia empieza por un buen sistema de frenos. Revisión y reparación completa, con repuestos de calidad y garantía.",
    features: [
      "Pastillas y discos de freno",
      "Cilindros, mordazas y bombas",
      "Purga y cambio de líquido de frenos",
      "Frenos de disco y de tambor",
      "Revisión del freno de mano",
      "Diagnóstico del sistema ABS",
    ],
    paragraphs: [
      "Los frenos son el sistema de seguridad más importante de tu auto. Un chillido, una vibración al frenar o un pedal más blando de lo normal son señales que no conviene dejar pasar.",
      "Revisamos el sistema completo y te mostramos el estado real de cada componente antes de tocar nada. Reparamos solo lo necesario, con repuestos de calidad y garantía en el trabajo.",
      "Con más de 53 años en el oficio, tenemos algo muy claro: frenar seguro no admite atajos.",
    ],
  },

  distribucion: {
    title: "Distribución",
    metaTitle: "Distribución — Correa y Cadena",
    metaDescription:
      "Cambio de correa y cadena de distribución en Montevideo, con kit completo y repuestos originales. Hacelo a tiempo y evitá una rotura carísima del motor.",
    lead: "La correa o cadena de distribución es el corazón del motor. Cambiarla en el momento justo evita una rotura carísima.",
    features: [
      "Cambio de correa de distribución",
      "Cambio de cadena de distribución",
      "Kit completo: tensor, poleas y bomba de agua",
      "Control según el plan de cada fabricante",
      "Repuestos originales y de primera calidad",
    ],
    paragraphs: [
      "Si la correa o la cadena de distribución se corta con el motor en marcha, las consecuencias suelen ser graves y muy costosas: válvulas dobladas, pistones dañados y, a veces, el motor entero.",
      "Por eso respetamos los intervalos de cambio que indica cada fabricante y trabajamos con kits completos, no solo la correa. Te decimos con claridad cuándo le toca a tu auto, sin adelantar gastos ni arriesgar de más.",
      "Prevenir cuesta una fracción de lo que cuesta reparar. Nosotros te ayudamos a hacerlo en el momento exacto.",
    ],
  },

  "suspension-amortiguacion": {
    title: "Suspensión y Amortiguación",
    metaTitle: "Suspensión y Amortiguación",
    metaDescription:
      "Suspensión y amortiguación en Montevideo: amortiguadores, tren delantero, rótulas y bujes. Manejo firme, seguro y confortable, con diagnóstico preciso.",
    lead: "Manejo firme, seguro y confortable. Amortiguadores, tren delantero y todo lo que mantiene tu auto pegado al camino.",
    features: [
      "Amortiguadores delanteros y traseros",
      "Espirales y elásticos",
      "Rótulas, bujes y extremos de dirección",
      "Parrillas y brazos de suspensión",
      "Revisión completa del tren delantero",
      "Diagnóstico de ruidos y vibraciones",
    ],
    paragraphs: [
      "Una suspensión en buen estado no es solo confort: es seguridad. Los amortiguadores gastados alargan la distancia de frenado, desgastan los neumáticos de forma despareja y hacen que el auto 'flote' en la ruta.",
      "Revisamos el sistema completo, identificamos el origen de cada ruido o vibración y te explicamos qué conviene cambiar y por qué. Nada de reemplazar piezas que están sanas.",
      "El resultado es un auto que se siente firme, seguro y cómodo, como tiene que ser.",
    ],
  },

  embrague: {
    title: "Embrague",
    metaTitle: "Embrague",
    metaDescription:
      "Reparación y cambio de embrague en Montevideo para todas las marcas: kit completo, volante motor y sistema hidráulico. Cambios suaves y garantía en el trabajo.",
    lead: "Cambios suaves de nuevo. Diagnóstico y reemplazo del embrague con repuestos de calidad y garantía.",
    features: [
      "Kit de embrague completo: disco, plato y rulemán",
      "Cambio de volante motor y volante bimasa",
      "Reparación del sistema hidráulico (cilindros)",
      "Diagnóstico de patinamiento y vibraciones",
      "Regulación y sangrado",
    ],
    paragraphs: [
      "¿El motor sube de vueltas pero el auto no acompaña? ¿Cuesta poner los cambios o sentís olor a quemado en las subidas? Son señales típicas de un embrague al final de su vida útil.",
      "Hacemos el diagnóstico exacto para no cambiar de más y reemplazamos el kit completo con repuestos de calidad, para que el arreglo dure. Trabajamos con todas las marcas del mercado.",
      "Volvé a disfrutar de cambios suaves y de una entrega de potencia como el primer día.",
    ],
  },

  "fallas-diagnostico": {
    title: "Fallas y Diagnóstico",
    metaTitle: "Fallas y Diagnóstico Computarizado",
    metaDescription:
      "Diagnóstico computarizado en Montevideo para todas las marcas. Detectamos el origen real de la falla (check engine, ABS, airbag) con equipos de última generación.",
    lead: "¿Se prendió una luz en el tablero? La detectamos con diagnóstico computarizado y te explicamos, en palabras claras, qué significa.",
    features: [
      "Diagnóstico computarizado (scanner) de todas las marcas",
      "Lectura y borrado de códigos de falla",
      "Testigos de check engine, ABS, airbag y más",
      "Diagnóstico eléctrico y electrónico",
      "Análisis de sensores y actuadores",
      "Presupuesto claro antes de reparar",
    ],
    paragraphs: [
      "Los autos modernos son computadoras sobre ruedas. Una luz encendida puede ser algo menor o el aviso temprano de una falla seria: la clave está en interpretarla bien.",
      "Con equipos de diagnóstico de última generación y la información técnica oficial de cada marca, encontramos el origen real del problema y no solo el síntoma. Así evitás cambiar piezas 'a ver si es eso'.",
      "Te explicamos con claridad qué tiene tu auto y qué conviene hacer, con un presupuesto transparente antes de empezar.",
    ],
  },

  "aire-acondicionado": {
    title: "Aire Acondicionado",
    metaTitle: "Aire Acondicionado y Climatización",
    metaDescription:
      "Servicio de aire acondicionado automotor en Montevideo: carga de gas, detección de fugas y reparación del sistema completo. Frío cuando lo necesitás.",
    lead: "Frío cuando lo necesitás. Carga de gas, mantenimiento y reparación del sistema completo de climatización.",
    features: [
      "Carga y recarga de gas refrigerante",
      "Detección de pérdidas y fugas",
      "Cambio de compresor, condensador y evaporador",
      "Filtro de habitáculo (antipolen)",
      "Mantenimiento y desinfección del sistema",
      "Revisión de la calefacción",
    ],
    paragraphs: [
      "El aire acondicionado no es solo confort en verano: mantiene el parabrisas desempañado y el habitáculo sano durante todo el año. Cuando enfría menos de lo normal, casi siempre hay una fuga o falta de gas.",
      "Revisamos el sistema completo, detectamos las pérdidas y reparamos lo que corresponda, desde una simple recarga hasta el cambio de compresor. También renovamos el filtro de habitáculo para que respires aire limpio.",
      "Viajá cómodo y seguro en cualquier estación del año.",
    ],
  },

  neumaticos: {
    title: "Neumáticos",
    metaTitle: "Neumáticos — Montaje y Balanceo",
    metaDescription:
      "Neumáticos en Montevideo: venta, montaje, balanceo computarizado y asesoramiento por medida y uso. El único contacto de tu auto con el camino, en buenas manos.",
    lead: "Son el único contacto de tu auto con el camino. Montaje, balanceo y asesoramiento honesto para elegir la goma justa.",
    features: [
      "Venta y montaje de neumáticos",
      "Balanceo computarizado",
      "Válvulas y reparación de pinchaduras",
      "Rotación según el desgaste",
      "Asesoramiento por medida y tipo de uso",
      "Control de presión y estado",
    ],
    paragraphs: [
      "Los neumáticos son lo único que mantiene tu auto pegado al asfalto. De su estado dependen la distancia de frenado, la estabilidad en las curvas y el agarre bajo la lluvia.",
      "Te asesoramos para elegir la medida y el tipo de goma que mejor se adaptan a tu auto y a cómo manejás, sin venderte de más. Montamos y balanceamos con equipos de precisión.",
      "Y para que duren al máximo, combinalos con una buena alineación: cuidás tu bolsillo y viajás más seguro.",
    ],
  },
};

export const serviciosDetalleSlugs = Object.keys(serviciosDetalle);
