import { local, type ImageAsset } from '../lib/media'

/*
 * PROYECTOS DE ARQUON
 * Las fotos son reales (carpeta FOTOS). Los textos marcados como "Texto de prueba"
 * y los datos (año, área, ubicación exacta) son provisionales: reemplázalos por los reales.
 * Las fotos están en /public/proyectos/<slug>/ numeradas 01.webp, 02.webp…
 */

export type Category = 'Vivienda' | 'Comercial' | 'Interiores'

export type Project = {
  slug: string
  name: string
  category: Category
  location: string
  year: number
  /** Área en m² */
  area: number
  levels?: number
  status: 'Construido' | 'En construcción' | 'Diseño'
  summary: string
  description: string[]
  scope: string[]
  work: string[]
  cover: ImageAsset
  gallery: (ImageAsset & { caption?: string })[]
  video?: { src: string; poster?: string }
}

export const categories: Category[] = ['Vivienda', 'Comercial', 'Interiores']

export const projects: Project[] = [
  {
    slug: "casa-campestre-llanogrande",
    name: "Casa Campestre Llanogrande",
    category: "Vivienda",
    location: "Llanogrande, Rionegro",
    year: 2025,
    area: 380,
    levels: 1,
    status: "En construcción",
    summary: "Una casa de un nivel con cubiertas planas que se abren al jardín y a las montañas del Oriente.",
    description: ["Texto de prueba. Una casa campestre de un solo nivel, organizada en volúmenes que rodean un patio con jacuzzi y vegetación tropical.", "Las cubiertas planas con alero en madera protegen las terrazas y permiten que la sala, el comedor y las habitaciones se abran por completo al paisaje."],
    scope: ["Diseño arquitectónico", "Licencia de construcción", "Construcción"],
    work: ["Levantamiento del lote", "Anteproyecto y renders", "Proyecto técnico y licencia", "Construcción (en curso)"],
    cover: local('/proyectos/casa-campestre-llanogrande/06.webp', "Casa Campestre Llanogrande", 1672 / 941),
    gallery: [
      { ...local('/proyectos/casa-campestre-llanogrande/01.webp', "Casa Campestre Llanogrande, imagen 1", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-llanogrande/03.webp', "Casa Campestre Llanogrande, imagen 3", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-llanogrande/11.webp', "Casa Campestre Llanogrande, imagen 11", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-llanogrande/02.webp', "Casa Campestre Llanogrande, imagen 2", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-llanogrande/12.webp', "Casa Campestre Llanogrande, imagen 12", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-llanogrande/13.webp', "Casa Campestre Llanogrande, imagen 13", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-llanogrande/10.webp', "Casa Campestre Llanogrande, imagen 10", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-llanogrande/05.webp', "Casa Campestre Llanogrande, imagen 5", 1672 / 941), caption: "Render" },
    ],
  },
  {
    slug: "consultorio-odontologico",
    name: "Consultorio Odontológico",
    category: "Comercial",
    location: "Medellín",
    year: 2025,
    area: 95,
    status: "Construido",
    summary: "Un consultorio cálido y luminoso, con recepción en madera y gabinetes clínicos en vidrio.",
    description: ["Texto de prueba. Diseño y construcción de un consultorio odontológico dentro de un edificio de oficinas.", "La recepción combina madera, piedra sinterizada e iluminación indirecta. Los gabinetes se separan con divisiones de vidrio esmerilado que dejan pasar la luz natural."],
    scope: ["Diseño interior", "Adecuación", "Construcción"],
    work: ["Distribución según normativa de salud", "Diseño de mobiliario a la medida", "Instalaciones eléctricas, hidráulicas y de aire", "Obra y entrega"],
    cover: local('/proyectos/consultorio-odontologico/04.webp', "Consultorio Odontológico", 2000 / 1500),
    gallery: [
      { ...local('/proyectos/consultorio-odontologico/01.webp', "Consultorio Odontológico, imagen 1", 1500 / 2000) },
      { ...local('/proyectos/consultorio-odontologico/06.webp', "Consultorio Odontológico, imagen 6", 1500 / 2000) },
      { ...local('/proyectos/consultorio-odontologico/11.webp', "Consultorio Odontológico, imagen 11", 2000 / 1500) },
      { ...local('/proyectos/consultorio-odontologico/14.webp', "Consultorio Odontológico, imagen 14", 2000 / 1500) },
      { ...local('/proyectos/consultorio-odontologico/17.webp', "Consultorio Odontológico, imagen 17", 1500 / 2000) },
      { ...local('/proyectos/consultorio-odontologico/18.webp', "Consultorio Odontológico, imagen 18", 2000 / 1500) },
      { ...local('/proyectos/consultorio-odontologico/15.webp', "Consultorio Odontológico, imagen 15", 1500 / 2000) },
    ],
  },
  {
    slug: "casa-campestre-rionegro",
    name: "Casa Campestre Rionegro",
    category: "Vivienda",
    location: "Rionegro, Antioquia",
    year: 2025,
    area: 420,
    levels: 1,
    status: "Diseño",
    summary: "Una casa con cubierta en teja de barro, corredores en madera y vista abierta a las montañas.",
    description: ["Texto de prueba. Una casa campestre que recupera la cubierta en teja de barro de la arquitectura antioqueña y la combina con grandes ventanales.", "Los corredores en madera conectan los espacios sociales con el jardín y una terraza con fogata."],
    scope: ["Diseño arquitectónico", "Renders"],
    work: ["Programa de necesidades", "Anteproyecto", "Renders exteriores e interiores"],
    cover: local('/proyectos/casa-campestre-rionegro/02.webp', "Casa Campestre Rionegro", 1672 / 941),
    gallery: [
      { ...local('/proyectos/casa-campestre-rionegro/05.webp', "Casa Campestre Rionegro, imagen 5", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/04.webp', "Casa Campestre Rionegro, imagen 4", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/06.webp', "Casa Campestre Rionegro, imagen 6", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/07.webp', "Casa Campestre Rionegro, imagen 7", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/08.webp', "Casa Campestre Rionegro, imagen 8", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/09.webp', "Casa Campestre Rionegro, imagen 9", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/11.webp', "Casa Campestre Rionegro, imagen 11", 1672 / 941), caption: "Render" },
    ],
  },
  {
    slug: "apartamento-las-brujas",
    name: "Apartamento Las Brujas",
    category: "Interiores",
    location: "Envigado, Antioquia",
    year: 2025,
    area: 110,
    status: "Construido",
    summary: "Interiorismo completo con celosías en madera, cocina abierta y baños en tonos tierra.",
    description: ["Texto de prueba. Diseño y ejecución del interiorismo de un apartamento entregado en obra gris.", "Una celosía en madera separa el estudio de la zona social sin cerrar el espacio. La cocina abierta, el comedor en madera y el espejo circular organizan la sala."],
    scope: ["Diseño interior", "Mobiliario a la medida", "Obra"],
    work: ["Diseño de cocina, baños y estudio", "Fabricación de carpintería", "Instalación y acabados"],
    cover: local('/proyectos/apartamento-las-brujas/23.webp', "Apartamento Las Brujas", 2000 / 1500),
    gallery: [
      { ...local('/proyectos/apartamento-las-brujas/04.webp', "Apartamento Las Brujas, imagen 4", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/13.webp', "Apartamento Las Brujas, imagen 13", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/12.webp', "Apartamento Las Brujas, imagen 12", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/05.webp', "Apartamento Las Brujas, imagen 5", 1500 / 2000) },
      { ...local('/proyectos/apartamento-las-brujas/07.webp', "Apartamento Las Brujas, imagen 7", 1500 / 2000) },
      { ...local('/proyectos/apartamento-las-brujas/21.webp', "Apartamento Las Brujas, imagen 21", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/22.webp', "Apartamento Las Brujas, imagen 22", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/10.webp', "Apartamento Las Brujas, imagen 10", 2000 / 1500) },
    ],
  },
  {
    slug: "cafeteria-penol",
    name: "Cafetería El Peñol",
    category: "Comercial",
    location: "El Peñol, Antioquia",
    year: 2025,
    area: 140,
    status: "Construido",
    summary: "Una cafetería con barra iluminada, ladrillo a la vista y una zona de mesas para quedarse.",
    description: ["Texto de prueba. Diseño y construcción de una cafetería con vitrina de postres, zona de mesas y baños.", "El diseño se presentó con renders y se llevó a obra: la barra en verde, la iluminación lineal y el ladrillo a la vista definen el espacio."],
    scope: ["Diseño interior", "Renders", "Construcción"],
    work: ["Diseño y renders", "Fabricación de barra y mobiliario", "Obra y montaje"],
    cover: local('/proyectos/cafeteria-penol/05.webp', "Cafetería El Peñol", 1600 / 900),
    gallery: [
      { ...local('/proyectos/cafeteria-penol/06.webp', "Cafetería El Peñol, imagen 6", 1600 / 900), caption: "Render del diseño" },
      { ...local('/proyectos/cafeteria-penol/04.webp', "Cafetería El Peñol, imagen 4", 2000 / 1500), caption: "Obra terminada" },
      { ...local('/proyectos/cafeteria-penol/09.webp', "Cafetería El Peñol, imagen 9", 1600 / 900), caption: "Render de baños" },
      { ...local('/proyectos/cafeteria-penol/07.webp', "Cafetería El Peñol, imagen 7", 1600 / 900), caption: "Render de baños" },
    ],
  },
  {
    slug: "consultorio-estetico",
    name: "Consultorio Estético",
    category: "Comercial",
    location: "Medellín",
    year: 2025,
    area: 60,
    status: "Construido",
    summary: "Un consultorio de estética con recepción iluminada y gabinetes separados en vidrio.",
    description: ["Texto de prueba. Construcción de un consultorio de medicina estética en un local comercial.", "La recepción usa un marco de luz LED y la sala de espera se resuelve con pocos elementos. Los gabinetes se separan con puertas en vidrio y perfilería negra."],
    scope: ["Diseño interior", "Construcción"],
    work: ["Adecuación del local", "Mobiliario de recepción", "Iluminación y acabados"],
    cover: local('/proyectos/consultorio-estetico/08.webp', "Consultorio Estético", 2000 / 1500),
    gallery: [
      { ...local('/proyectos/consultorio-estetico/06.webp', "Consultorio Estético, imagen 6", 2000 / 1500) },
      { ...local('/proyectos/consultorio-estetico/02.webp', "Consultorio Estético, imagen 2", 1500 / 2000) },
      { ...local('/proyectos/consultorio-estetico/04.webp', "Consultorio Estético, imagen 4", 2000 / 1500) },
      { ...local('/proyectos/consultorio-estetico/09.webp', "Consultorio Estético, imagen 9", 1500 / 2000) },
    ],
  },
  {
    slug: "casa-campestre-guatape",
    name: "Casa Campestre Guatapé",
    category: "Vivienda",
    location: "Guatapé, Antioquia",
    year: 2025,
    area: 300,
    levels: 1,
    status: "Diseño",
    summary: "Una casa frente al embalse, con chimenea en piedra, techos en madera y jacuzzi en la terraza.",
    description: ["Texto de prueba. Diseño interior y arquitectónico de una casa de descanso con vista al embalse de Guatapé.", "La sala gira alrededor de una chimenea en piedra. Los techos en madera y los muros en concreto dan calidez, y la terraza con jacuzzi mira al agua."],
    scope: ["Diseño arquitectónico", "Diseño interior", "Renders"],
    work: ["Anteproyecto", "Diseño interior", "Renders"],
    cover: local('/proyectos/casa-campestre-guatape/08.webp', "Casa Campestre Guatapé", 1410 / 842),
    gallery: [
      { ...local('/proyectos/casa-campestre-guatape/04.webp', "Casa Campestre Guatapé, imagen 4", 796 / 718), caption: "Render" },
      { ...local('/proyectos/casa-campestre-guatape/06.webp', "Casa Campestre Guatapé, imagen 6", 1550 / 922), caption: "Render" },
      { ...local('/proyectos/casa-campestre-guatape/02.webp', "Casa Campestre Guatapé, imagen 2", 1544 / 919), caption: "Render" },
      { ...local('/proyectos/casa-campestre-guatape/09.webp', "Casa Campestre Guatapé, imagen 9", 1280 / 845), caption: "Render" },
      { ...local('/proyectos/casa-campestre-guatape/07.webp', "Casa Campestre Guatapé, imagen 7", 1540 / 922), caption: "Render" },
    ],
  },
  {
    slug: "apartamento-puerto-vallarta",
    name: "Apartamento Puerto Vallarta",
    category: "Interiores",
    location: "Puerto Vallarta",
    year: 2025,
    area: 55,
    status: "Diseño",
    summary: "Un apartamento compacto con cocina abierta, madera clara y luz cálida.",
    description: ["Texto de prueba. Propuesta de interiorismo para un apartamento pequeño, pensado para aprovechar cada metro.", "Una paleta corta de madera clara, piedra y beige unifica la cocina, la sala y las habitaciones."],
    scope: ["Diseño interior", "Renders"],
    work: ["Distribución", "Diseño de mobiliario", "Renders"],
    cover: local('/proyectos/apartamento-puerto-vallarta/01.webp', "Apartamento Puerto Vallarta", 1600 / 900),
    gallery: [
      { ...local('/proyectos/apartamento-puerto-vallarta/03.webp', "Apartamento Puerto Vallarta, imagen 3", 1600 / 900), caption: "Render" },
      { ...local('/proyectos/apartamento-puerto-vallarta/04.webp', "Apartamento Puerto Vallarta, imagen 4", 1600 / 900), caption: "Render" },
      { ...local('/proyectos/apartamento-puerto-vallarta/05.webp', "Apartamento Puerto Vallarta, imagen 5", 1600 / 900), caption: "Render" },
      { ...local('/proyectos/apartamento-puerto-vallarta/06.webp', "Apartamento Puerto Vallarta, imagen 6", 1600 / 900), caption: "Render" },
      { ...local('/proyectos/apartamento-puerto-vallarta/07.webp', "Apartamento Puerto Vallarta, imagen 7", 1600 / 900), caption: "Render" },
    ],
  },
  {
    slug: "casa-campestre-gomez-plata",
    name: "Casa Campestre Gómez Plata",
    category: "Vivienda",
    location: "Gómez Plata, Antioquia",
    year: 2025,
    area: 350,
    levels: 1,
    status: "Diseño",
    summary: "Una casa lineal con muros en piedra y un gran espacio social abierto al valle.",
    description: ["Texto de prueba. Una casa de un nivel que se extiende a lo largo del lote, con muros en piedra y cubierta plana.", "La cocina, el comedor y la sala forman un solo espacio bajo vigas de madera, que se abre por completo hacia la terraza."],
    scope: ["Diseño arquitectónico", "Renders"],
    work: ["Anteproyecto", "Renders exteriores e interiores"],
    cover: local('/proyectos/casa-campestre-gomez-plata/01.webp', "Casa Campestre Gómez Plata", 1672 / 941),
    gallery: [
      { ...local('/proyectos/casa-campestre-gomez-plata/02.webp', "Casa Campestre Gómez Plata, imagen 2", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-gomez-plata/03.webp', "Casa Campestre Gómez Plata, imagen 3", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-gomez-plata/04.webp', "Casa Campestre Gómez Plata, imagen 4", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-gomez-plata/06.webp', "Casa Campestre Gómez Plata, imagen 6", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-gomez-plata/07.webp', "Casa Campestre Gómez Plata, imagen 7", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-gomez-plata/08.webp', "Casa Campestre Gómez Plata, imagen 8", 1672 / 941), caption: "Render" },
    ],
  },
  {
    slug: "consultorio-muestras",
    name: "Consultorio de Toma de Muestras",
    category: "Comercial",
    location: "Medellín",
    year: 2025,
    area: 40,
    status: "Diseño",
    summary: "Un espacio pequeño para toma de muestras, con recepción, sala de espera y cubículo.",
    description: ["Texto de prueba. Diseño de un consultorio compacto para toma de muestras de laboratorio.", "Madera, concreto y luz indirecta hacen que un espacio clínico pequeño se sienta tranquilo."],
    scope: ["Diseño interior", "Renders"],
    work: ["Distribución", "Diseño de mobiliario", "Renders"],
    cover: local('/proyectos/consultorio-muestras/02.webp', "Consultorio de Toma de Muestras", 1280 / 720),
    gallery: [
      { ...local('/proyectos/consultorio-muestras/01.webp', "Consultorio de Toma de Muestras, imagen 1", 1280 / 720), caption: "Render" },
      { ...local('/proyectos/consultorio-muestras/03.webp', "Consultorio de Toma de Muestras, imagen 3", 1280 / 720), caption: "Render" },
      { ...local('/proyectos/consultorio-muestras/04.webp', "Consultorio de Toma de Muestras, imagen 4", 1280 / 720), caption: "Render" },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}

export const formatArea = (m2: number) => `${m2.toLocaleString('es-CO')} m²`
