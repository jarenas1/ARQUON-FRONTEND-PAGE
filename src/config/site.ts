/**
 * Configuración general del sitio.
 * Todo lo que es dato de la empresa vive aquí: cámbialo y se actualiza en todo el sitio.
 *
 * Los valores sensibles al despliegue (WhatsApp y correo del formulario) se leen de variables
 * de entorno (archivo .env). Mira .env.example.
 */
const env = import.meta.env

export const site = {
  name: 'ARQUON',
  /** Título de la pestaña del navegador (también está en index.html). */
  title: 'ARQUON — Arquitectura y construcción',
  slogan: 'Tu visión, nuestra realidad.',
  sloganParts: ['Tu visión,', 'nuestra realidad.'] as const,
  description: 'Estudio de arquitectura y construcción',
  city: 'Medellín, Colombia',

  contact: {
    phoneDisplay: '+57 312 882 3725',
    phoneHref: 'tel:+573128823725',
    address: 'Medellín, Colombia',
    hours: 'Lunes a viernes, 8:00\u00a0a.\u00a0m. a 6:00\u00a0p.\u00a0m.',
  },

  /** Número en formato internacional sin "+" ni espacios. Ej: 573001234567 */
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER as string | undefined) || '573128823725',
  whatsappMessage: 'Hola, ARQUON. Quiero contarles sobre mi proyecto.',

  /**
   * Correo que recibe las solicitudes del formulario (vía FormSubmit, sin backend).
   * La primera solicitud llega como un correo de activación: hay que confirmarlo una vez.
   */
  formEmail: (env.VITE_FORM_EMAIL as string | undefined) || 'juanjoarenas1218@gmail.com',

  /** Deja vacío lo que no uses y no aparecerá. */
  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ] as { label: string; href: string }[],

  /**
   * Hero: si agregas un video (por ejemplo, uno generado con IA a partir de tus fotos),
   * se reproduce dentro de la silueta del edificio. La imagen funciona como póster
   * mientras carga y como respaldo si no hay video.
   *
   * Pon los archivos en /public/media/ y usa rutas como '/media/hero.mp4'.
   */
  hero: {
    image: '/proyectos/casa-campestre-llanogrande/06.webp',
    imageAlt: 'Render de la Casa Campestre Llanogrande',
    video: undefined as { mp4?: string; webm?: string } | undefined,
  },
} as const

export const nav = [
  { id: 'estudio', label: 'Estudio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'contacto', label: 'Contacto' },
] as const

export function whatsappHref(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}
