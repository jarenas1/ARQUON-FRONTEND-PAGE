import { unsplash, type ImageAsset } from '../lib/media'

/*
 * PROYECTOS DE MUESTRA
 * Los nombres, datos y fotos son de ejemplo para mostrar el diseño.
 * Reemplázalos por los proyectos reales de ARQUON. Para usar tus fotos:
 *   1. Copia las imágenes a /public/proyectos/<slug>/
 *   2. Cambia unsplash(...) por local('/proyectos/<slug>/foto.webp', 'Descripción', 4 / 3)
 */

export type Category = 'Vivienda' | 'Comercial' | 'Interiores'

export type Project = {
  slug: string
  name: string
  category: Category
  location: string
  year: number
  /** Área construida en m² */
  area: number
  levels?: number
  status: 'Construido' | 'En construcción' | 'En diseño'
  /** Una línea para el hover de la galería */
  summary: string
  /** Párrafos de la ficha del proyecto */
  description: string[]
  /** Qué hizo ARQUON en el proyecto */
  scope: string[]
  work: string[]
  cover: ImageAsset
  gallery: (ImageAsset & { caption?: string })[]
  /** Video opcional para la ficha (por ejemplo, un recorrido generado con IA) */
  video?: { src: string; poster?: string }
}

export const categories: Category[] = ['Vivienda', 'Comercial', 'Interiores']

export const projects: Project[] = [
  {
    slug: 'casa-guayacan',
    name: 'Casa Guayacán',
    category: 'Vivienda',
    location: 'Llanogrande, Rionegro',
    year: 2025,
    area: 460,
    levels: 2,
    status: 'Construido',
    summary: 'Una casa de campo que se abre al jardín con aleros profundos y madera local.',
    description: [
      'La familia buscaba una casa para vivir todo el año, no una casa de fin de semana. El programa se organizó en dos volúmenes: uno público, abierto al jardín, y otro privado, más recogido hacia el bosque.',
      'Los aleros profundos protegen las fachadas de la lluvia y el sol de la tarde, y permiten dejar las puertas abiertas casi todo el día. La madera se trabajó con carpinteros de la zona.',
    ],
    scope: ['Diseño arquitectónico', 'Licencia de construcción', 'Construcción'],
    work: [
      'Levantamiento del lote y estudio de asoleamiento',
      'Anteproyecto, renders y presupuesto',
      'Proyecto técnico y trámite ante curaduría',
      'Construcción y entrega llave en mano',
    ],
    cover: unsplash('1600585154340-be6161a56a0c', 'Casa Guayacán, fachada hacia el jardín', 3 / 2),
    gallery: [
      { ...unsplash('1600607687644-c7171b42498f', 'Casa Guayacán, sala principal', 3 / 2), caption: 'Sala principal' },
      { ...unsplash('1600585154526-990dced4db0d', 'Casa Guayacán, cocina y comedor', 3 / 2), caption: 'Cocina y comedor' },
      { ...unsplash('1541888946425-d81bb19240f5', 'Casa Guayacán durante la obra', 3 / 2), caption: 'Obra, mes cuatro' },
    ],
  },
  {
    slug: 'edificio-nogal',
    name: 'Edificio Nogal',
    category: 'Comercial',
    location: 'El Poblado, Medellín',
    year: 2024,
    area: 3200,
    levels: 6,
    status: 'Construido',
    summary: 'Oficinas y locales en esquina, con una fachada que filtra la luz de la tarde.',
    description: [
      'Un lote en esquina con dos frentes muy distintos: una calle comercial con mucho movimiento y una vía residencial tranquila. El edificio responde a cada una con una fachada propia.',
      'Los primeros pisos se abren a la calle con locales de doble altura. Arriba, las oficinas se protegen con una piel de lamas que reduce la carga térmica sin perder la vista.',
    ],
    scope: ['Diseño arquitectónico', 'Licencia de construcción', 'Gerencia de obra'],
    work: [
      'Estudio de normativa y cabida del lote',
      'Diseño arquitectónico y coordinación técnica',
      'Licencia de construcción',
      'Gerencia y supervisión de obra',
    ],
    cover: unsplash('1487958449943-2429e8be8625', 'Edificio Nogal, fachada principal', 4 / 5),
    gallery: [
      { ...unsplash('1486406146926-c627a92ad1ab', 'Edificio Nogal, vista desde la calle', 4 / 5), caption: 'Esquina comercial' },
      { ...unsplash('1511818966892-d7d671e672a2', 'Edificio Nogal, detalle de fachada', 4 / 5), caption: 'Detalle de lamas' },
      { ...unsplash('1497366216548-37526070297c', 'Edificio Nogal, planta de oficinas', 3 / 2), caption: 'Planta tipo de oficinas' },
    ],
  },
  {
    slug: 'casa-ceiba',
    name: 'Casa Ceiba',
    category: 'Vivienda',
    location: 'Envigado, Antioquia',
    year: 2024,
    area: 380,
    levels: 3,
    status: 'Construido',
    summary: 'Tres niveles escalonados sobre una ladera, con la piscina como mirador.',
    description: [
      'El lote tiene una pendiente fuerte. En lugar de nivelarlo, la casa se escalona en tres plataformas que siguen el terreno y reducen el movimiento de tierra.',
      'Cada nivel tiene su propio exterior: el acceso, la terraza social con piscina y el jardín de las habitaciones.',
    ],
    scope: ['Diseño arquitectónico', 'Licencia de construcción', 'Construcción', 'Diseño interior'],
    work: [
      'Estudio de suelos y diseño estructural coordinado',
      'Diseño arquitectónico e interior',
      'Construcción por etapas',
    ],
    cover: unsplash('1613490493576-7fde63acd811', 'Casa Ceiba, terraza y piscina', 3 / 2),
    gallery: [
      { ...unsplash('1564013799919-ab600027ffc6', 'Casa Ceiba, vista posterior', 3 / 2), caption: 'Terraza social' },
      { ...unsplash('1600210492486-724fe5c67fb0', 'Casa Ceiba, sala', 3 / 2), caption: 'Sala con doble altura' },
    ],
  },
  {
    slug: 'apartamento-laurel',
    name: 'Apartamento Laurel',
    category: 'Interiores',
    location: 'Laureles, Medellín',
    year: 2025,
    area: 140,
    status: 'Construido',
    summary: 'Una remodelación que unió cocina y sala para ganar luz y espacio.',
    description: [
      'Un apartamento de los años ochenta con espacios cerrados y poca luz. Retiramos los muros no estructurales para unir cocina, comedor y sala en un solo espacio.',
      'La paleta es corta: roble, piedra clara y blanco. Los muebles se diseñaron a la medida para aprovechar cada rincón.',
    ],
    scope: ['Diseño interior', 'Remodelación'],
    work: ['Levantamiento y diagnóstico', 'Diseño interior y mobiliario a la medida', 'Remodelación en 10 semanas'],
    cover: unsplash('1618221195710-dd6b41faaea6', 'Apartamento Laurel, sala', 4 / 5),
    gallery: [
      { ...unsplash('1600566753190-17f0baa2a6c3', 'Apartamento Laurel, espacio social', 3 / 2), caption: 'Espacio social integrado' },
      { ...unsplash('1600573472550-8090b5e0745e', 'Apartamento Laurel, detalle de interiores', 3 / 2), caption: 'Mobiliario a la medida' },
    ],
  },
  {
    slug: 'casa-yarumo',
    name: 'Casa Yarumo',
    category: 'Vivienda',
    location: 'Santa Elena, Medellín',
    year: 2023,
    area: 290,
    levels: 2,
    status: 'Construido',
    summary: 'Una casa compacta en medio del bosque, pensada para el clima frío.',
    description: [
      'A 2.500 metros de altura, el reto era el frío. La casa se compacta alrededor de una chimenea central y se abre al sur para recibir el sol de la mañana.',
      'Los materiales se eligieron por su comportamiento térmico y por su bajo mantenimiento: concreto, madera y vidrio de doble cámara.',
    ],
    scope: ['Diseño arquitectónico', 'Construcción'],
    work: ['Diseño bioclimático', 'Proyecto arquitectónico', 'Construcción'],
    cover: unsplash('1600047509807-ba8f99d2cdde', 'Casa Yarumo, fachada', 3 / 2),
    gallery: [
      { ...unsplash('1600607687644-c7171b42498f', 'Casa Yarumo, interior', 3 / 2), caption: 'Estar con chimenea' },
    ],
  },
  {
    slug: 'oficinas-arrayan',
    name: 'Oficinas Arrayán',
    category: 'Interiores',
    location: 'Ciudad del Río, Medellín',
    year: 2023,
    area: 620,
    status: 'Construido',
    summary: 'Un piso de oficinas abierto, con salas de reunión que se pueden cerrar o integrar.',
    description: [
      'Una empresa en crecimiento necesitaba un espacio que cambiara con ella. Diseñamos un piso abierto con salas que se cierran con paneles corredizos.',
      'La iluminación y la acústica se resolvieron desde el techo para dejar el piso libre.',
    ],
    scope: ['Diseño interior', 'Adecuación'],
    work: ['Programa de áreas con el equipo del cliente', 'Diseño interior, acústico y de iluminación', 'Adecuación en obra'],
    cover: unsplash('1497366216548-37526070297c', 'Oficinas Arrayán, área de trabajo', 4 / 3),
    gallery: [
      { ...unsplash('1511818966892-d7d671e672a2', 'Oficinas Arrayán, detalle', 4 / 5), caption: 'Detalle de cielo raso' },
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
