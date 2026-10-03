export type ImageAsset = {
  src: string
  srcSet?: string
  alt: string
  /** Relación de aspecto natural (ancho / alto). Ayuda a reservar espacio y evitar saltos. */
  ratio?: number
}

const UNSPLASH_WIDTHS = [640, 960, 1400, 2000]

/**
 * Imágenes de muestra desde Unsplash. Para tus fotos reales usa `local()`
 * con archivos dentro de /public (por ejemplo /public/proyectos/casa-guayacan/fachada.webp).
 */
export function unsplash(id: string, alt: string, ratio?: number): ImageAsset {
  const base = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=78`
  return {
    src: `${base}&w=1400`,
    srcSet: UNSPLASH_WIDTHS.map((w) => `${base}&w=${w} ${w}w`).join(', '),
    alt,
    ratio,
  }
}

export function local(src: string, alt: string, ratio?: number): ImageAsset {
  return { src, alt, ratio }
}
