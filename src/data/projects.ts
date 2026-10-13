import { local, type ImageAsset } from '../lib/media'

/*
 * PROYECTOS DE ARQUON
 * Fotos y textos de cada proyecto entregados por ARQUON.
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
    location: "Llanogrande, Rionegro, Antioquia",
    year: 2023,
    area: 450,
    levels: 1,
    status: "Construido",
    summary: "Una arquitectura que dialoga con el paisaje a través de cubiertas inclinadas y fachadas acristaladas de gran altura, desdibujando los límites entre el interior y el exterior. La nobleza de la madera, la sutileza del metal y la calidez de la luz se integran para crear espacios acogedores, donde la naturaleza se convierte en protagonista.",
    description: ["El cliente buscaba una vivienda cálida y conectada con la naturaleza. La respuesta fue una arquitectura de un solo nivel, con cubiertas inclinadas y grandes superficies acristaladas que enmarcan el paisaje y potencian la relación entre interior y exterior."],
    scope: ["Levantamiento del lote", "Diseño", "Renders", "Proyecto técnico y licencia", "Planos constructivos", "Construcción"],
    work: [],
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
    slug: "casa-campestre-rionegro",
    name: "Casa Campestre Mampuesto Rionegro",
    category: "Vivienda",
    location: "Mampuesto, Rionegro, Antioquia",
    year: 2021,
    area: 180,
    status: "Diseño",
    summary: "Una vivienda unifamiliar que retoma la arquitectura tradicional antioqueña, articulando sus espacios mediante un corredor perimetral y estableciendo una relación continua con el paisaje a través de sus visuales y de materiales autóctonos de la región.",
    description: ["El cliente buscaba una vivienda que conservara la esencia de la arquitectura tradicional antioqueña, privilegiando la conexión con la naturaleza, la calidez de los materiales y la integración de los espacios interiores y exteriores."],
    scope: ["Levantamiento del lote", "Diseño", "Renders", "Proyecto técnico y licencia", "Planos constructivos"],
    work: [],
    cover: local('/proyectos/casa-campestre-rionegro/02.webp', "Casa Campestre Mampuesto Rionegro", 1672 / 941),
    gallery: [
      { ...local('/proyectos/casa-campestre-rionegro/05.webp', "Casa Campestre Mampuesto Rionegro, imagen 5", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/04.webp', "Casa Campestre Mampuesto Rionegro, imagen 4", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/06.webp', "Casa Campestre Mampuesto Rionegro, imagen 6", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/07.webp', "Casa Campestre Mampuesto Rionegro, imagen 7", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/08.webp', "Casa Campestre Mampuesto Rionegro, imagen 8", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/09.webp', "Casa Campestre Mampuesto Rionegro, imagen 9", 1672 / 941), caption: "Render" },
      { ...local('/proyectos/casa-campestre-rionegro/11.webp', "Casa Campestre Mampuesto Rionegro, imagen 11", 1672 / 941), caption: "Render" },
    ],
  },
  {
    slug: "casa-campestre-guatape",
    name: "Casa Campestre Guatapé",
    category: "Vivienda",
    location: "Guatapé, Antioquia",
    year: 2025,
    area: 350,
    status: "En construcción",
    summary: "Una arquitectura de lenguaje minimalista e industrial, donde dos volúmenes girados articulan lo social y lo privado, orientando sus aperturas para enmarcar las visuales del embalse de Guatapé, mientras la madera y el metal establecen un diálogo con el paisaje natural.",
    description: ["El cliente buscaba una vivienda contemporánea que privilegiara la privacidad y las visuales al embalse. La propuesta se resolvió mediante dos volúmenes girados estratégicamente, que independizan los espacios y enmarcan el paisaje natural."],
    scope: ["Levantamiento del lote", "Diseño", "Renders", "Proyecto técnico y licencia", "Planos constructivos", "Interventoría de obra"],
    work: [],
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
    slug: "casa-campestre-gomez-plata",
    name: "Casa Campestre Gómez Plata",
    category: "Vivienda",
    location: "Gómez Plata, Antioquia",
    year: 2024,
    area: 380,
    status: "Diseño",
    summary: "Una arquitectura de esencia mediterránea que integra la rusticidad de la piedra y la madera con amplias vidrieras abiertas al paisaje, donde la naturaleza y la iluminación cálida se articulan para crear espacios acogedores y una conexión fluida entre interior y exterior.",
    description: ["El cliente buscaba una vivienda de esencia mediterránea, adaptada al clima cálido, que privilegiara el confort térmico, la ventilación natural y la conexión visual con el paisaje."],
    scope: ["Levantamiento del lote", "Diseño", "Renders", "Proyecto técnico"],
    work: [],
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
    slug: "consultorio-odontologico",
    name: "Consultorio Odontológico Oviedo",
    category: "Comercial",
    location: "Medellín, Antioquia",
    year: 2026,
    area: 90,
    status: "Construido",
    summary: "Un espacio clínico que integra funcionalidad, ergonomía y estándares de bioseguridad con una propuesta arquitectónica contemporánea, donde la estética y el bienestar se articulan sin comprometer las exigencias del entorno odontológico.",
    description: ["El cliente buscaba un consultorio odontológico que respondiera a las exigencias clínicas y de bioseguridad sin renunciar a la estética. La propuesta integra funcionalidad y diseño contemporáneo, creando espacios atractivos, confortables y cuidadosamente articulados."],
    scope: ["Diseño", "Renders", "Proyecto técnico", "Construcción"],
    work: [],
    cover: local('/proyectos/consultorio-odontologico/04.webp', "Consultorio Odontológico Oviedo", 2000 / 1500),
    gallery: [
      { ...local('/proyectos/consultorio-odontologico/01.webp', "Consultorio Odontológico Oviedo, imagen 1", 1500 / 2000) },
      { ...local('/proyectos/consultorio-odontologico/06.webp', "Consultorio Odontológico Oviedo, imagen 6", 1500 / 2000) },
      { ...local('/proyectos/consultorio-odontologico/11.webp', "Consultorio Odontológico Oviedo, imagen 11", 2000 / 1500) },
      { ...local('/proyectos/consultorio-odontologico/14.webp', "Consultorio Odontológico Oviedo, imagen 14", 2000 / 1500) },
      { ...local('/proyectos/consultorio-odontologico/17.webp', "Consultorio Odontológico Oviedo, imagen 17", 1500 / 2000) },
      { ...local('/proyectos/consultorio-odontologico/18.webp', "Consultorio Odontológico Oviedo, imagen 18", 2000 / 1500) },
      { ...local('/proyectos/consultorio-odontologico/15.webp', "Consultorio Odontológico Oviedo, imagen 15", 1500 / 2000) },
    ],
  },
  {
    slug: "cafeteria-penol",
    name: "Café El Peñol",
    category: "Comercial",
    location: "El Peñol, Antioquia",
    year: 2026,
    area: 95,
    status: "Construido",
    summary: "Un espacio comercial de esencia industrial que fusiona enchapes rústicos, revestimientos en madera y elementos metálicos, donde la vegetación y la iluminación indirecta crean una atmósfera acogedora que invita al encuentro y a la permanencia.",
    description: ["El cliente buscaba un café con identidad propia, que combinara una estética industrial con una atmósfera acogedora. La propuesta integró materiales rústicos, vegetación e iluminación cálida para crear un espacio único."],
    scope: ["Diseño", "Renders", "Proyecto técnico", "Construcción"],
    work: [],
    cover: local('/proyectos/cafeteria-penol/05.webp', "Café El Peñol", 1600 / 900),
    gallery: [
      { ...local('/proyectos/cafeteria-penol/06.webp', "Café El Peñol, imagen 6", 1600 / 900), caption: "Render del diseño" },
      { ...local('/proyectos/cafeteria-penol/04.webp', "Café El Peñol, imagen 4", 2000 / 1500), caption: "Obra terminada" },
      { ...local('/proyectos/cafeteria-penol/09.webp', "Café El Peñol, imagen 9", 1600 / 900), caption: "Render de baños" },
      { ...local('/proyectos/cafeteria-penol/07.webp', "Café El Peñol, imagen 7", 1600 / 900), caption: "Render de baños" },
    ],
  },
  {
    slug: "consultorio-estetico",
    name: "Consultorio Estético Milla de Oro",
    category: "Comercial",
    location: "Medellín, Antioquia",
    year: 2024,
    area: 95,
    status: "Construido",
    summary: "Un consultorio estético de lenguaje minimalista y contemporáneo, donde la transparencia del vidrio y la sobriedad del metal definen espacios funcionales y sofisticados, integrando las exigencias clínicas y de bioseguridad con una propuesta arquitectónica elegante y moderna.",
    description: ["El cliente buscaba un consultorio estético moderno y sofisticado que cumpliera con las exigencias clínicas y de salubridad. La propuesta se resolvió mediante un diseño minimalista, integrando vidrio y metal para crear espacios funcionales, elegantes y confortables."],
    scope: ["Diseño", "Renders", "Proyecto técnico", "Construcción"],
    work: [],
    cover: local('/proyectos/consultorio-estetico/08.webp', "Consultorio Estético Milla de Oro", 2000 / 1500),
    gallery: [
      { ...local('/proyectos/consultorio-estetico/06.webp', "Consultorio Estético Milla de Oro, imagen 6", 2000 / 1500) },
      { ...local('/proyectos/consultorio-estetico/02.webp', "Consultorio Estético Milla de Oro, imagen 2", 1500 / 2000) },
      { ...local('/proyectos/consultorio-estetico/04.webp', "Consultorio Estético Milla de Oro, imagen 4", 2000 / 1500) },
      { ...local('/proyectos/consultorio-estetico/09.webp', "Consultorio Estético Milla de Oro, imagen 9", 1500 / 2000) },
    ],
  },
  {
    slug: "consultorio-muestras",
    name: "Consultorio Toma de Muestras CMBA",
    category: "Comercial",
    location: "Ciudad del Río, Medellín, Antioquia",
    year: 2026,
    area: 80,
    status: "Construido",
    summary: "Un espacio clínico de lenguaje contemporáneo que integra una paleta de tonos cálidos, una distribución funcional y el aprovechamiento óptimo del espacio, cumpliendo con las exigencias sanitarias sin renunciar a una identidad arquitectónica única y confortable.",
    description: ["El cliente buscaba un consultorio para la toma de muestras que cumpliera con las exigencias sanitarias, sin sacrificar el confort y la estética. La propuesta optimizó la distribución espacial e integró tonos cálidos y un diseño contemporáneo para crear un ambiente funcional, acogedor y con identidad propia."],
    scope: ["Diseño", "Renders", "Proyecto técnico"],
    work: [],
    cover: local('/proyectos/consultorio-muestras/02.webp', "Consultorio Toma de Muestras CMBA", 1280 / 720),
    gallery: [
      { ...local('/proyectos/consultorio-muestras/01.webp', "Consultorio Toma de Muestras CMBA, imagen 1", 1280 / 720), caption: "Render" },
      { ...local('/proyectos/consultorio-muestras/03.webp', "Consultorio Toma de Muestras CMBA, imagen 3", 1280 / 720), caption: "Render" },
      { ...local('/proyectos/consultorio-muestras/04.webp', "Consultorio Toma de Muestras CMBA, imagen 4", 1280 / 720), caption: "Render" },
    ],
  },
  {
    slug: "apartamento-las-brujas",
    name: "Apartamento Tierra Grata Las Brujas",
    category: "Interiores",
    location: "Loma de las Brujas, Envigado, Antioquia",
    year: 2025,
    area: 120,
    status: "Construido",
    summary: "Un proyecto de interiorismo contemporáneo que combina la calidez de la madera, una paleta de tonos neutros e iluminación indirecta, donde el mobiliario diseñado a medida y los detalles personalizados crean espacios únicos, sofisticados y acogedores.",
    description: ["El cliente buscaba un apartamento que reflejara su estilo y personalidad, priorizando el confort y la exclusividad. La propuesta integró mobiliario a medida, materiales cálidos e iluminación indirecta para crear espacios únicos, funcionales y sofisticados."],
    scope: ["Diseño", "Renders", "Proyecto técnico", "Construcción"],
    work: [],
    cover: local('/proyectos/apartamento-las-brujas/23.webp', "Apartamento Tierra Grata Las Brujas", 2000 / 1500),
    gallery: [
      { ...local('/proyectos/apartamento-las-brujas/04.webp', "Apartamento Tierra Grata Las Brujas, imagen 4", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/13.webp', "Apartamento Tierra Grata Las Brujas, imagen 13", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/12.webp', "Apartamento Tierra Grata Las Brujas, imagen 12", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/05.webp', "Apartamento Tierra Grata Las Brujas, imagen 5", 1500 / 2000) },
      { ...local('/proyectos/apartamento-las-brujas/07.webp', "Apartamento Tierra Grata Las Brujas, imagen 7", 1500 / 2000) },
      { ...local('/proyectos/apartamento-las-brujas/21.webp', "Apartamento Tierra Grata Las Brujas, imagen 21", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/22.webp', "Apartamento Tierra Grata Las Brujas, imagen 22", 2000 / 1500) },
      { ...local('/proyectos/apartamento-las-brujas/10.webp', "Apartamento Tierra Grata Las Brujas, imagen 10", 2000 / 1500) },
    ],
  },
  {
    slug: "apartamento-puerto-vallarta",
    name: "Apartamento Puerto Vallarta",
    category: "Interiores",
    location: "Bello, Antioquia",
    year: 2026,
    area: 75,
    status: "Construido",
    summary: "Un proyecto de interiorismo que maximiza el aprovechamiento espacial mediante una distribución funcional, integrando maderas, tonos claros e iluminación indirecta para potenciar la sensación de amplitud y crear ambientes cálidos, acogedores y contemporáneos.",
    description: ["El cliente buscaba maximizar el aprovechamiento de un espacio reducido sin sacrificar el confort y la estética. La propuesta integró soluciones funcionales, materiales cálidos e iluminación estratégica para generar amplitud y armonía espacial."],
    scope: ["Diseño", "Renders", "Proyecto técnico", "Construcción"],
    work: [],
    cover: local('/proyectos/apartamento-puerto-vallarta/01.webp', "Apartamento Puerto Vallarta", 1600 / 900),
    gallery: [
      { ...local('/proyectos/apartamento-puerto-vallarta/03.webp', "Apartamento Puerto Vallarta, imagen 3", 1600 / 900), caption: "Render" },
      { ...local('/proyectos/apartamento-puerto-vallarta/04.webp', "Apartamento Puerto Vallarta, imagen 4", 1600 / 900), caption: "Render" },
      { ...local('/proyectos/apartamento-puerto-vallarta/05.webp', "Apartamento Puerto Vallarta, imagen 5", 1600 / 900), caption: "Render" },
      { ...local('/proyectos/apartamento-puerto-vallarta/06.webp', "Apartamento Puerto Vallarta, imagen 6", 1600 / 900), caption: "Render" },
      { ...local('/proyectos/apartamento-puerto-vallarta/07.webp', "Apartamento Puerto Vallarta, imagen 7", 1600 / 900), caption: "Render" },
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
