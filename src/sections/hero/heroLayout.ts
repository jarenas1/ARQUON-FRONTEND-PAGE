import { silhouette } from '../../components/brand/geometry'

/** Caja del edificio dentro del logo (sin la línea de tierra extendida). */
const BUILDING = { x: 566, y: 268, w: 786, h: 945 }

export type HeroLayout = {
  W: number
  H: number
  compact: boolean
  /** Escala logo → píxeles */
  k: number
  /** Origen del edificio en la pantalla */
  fx: number
  fy: number
  figW: number
  figH: number
  groundY: number
}

export const COMPACT_BREAKPOINT = 860

/** Calcula dónde se dibuja el edificio según el tamaño de la pantalla. */
export function computeHeroLayout(W: number, H: number): HeroLayout {
  const compact = W < COMPACT_BREAKPOINT
  const header = compact ? 64 : 76

  if (compact) {
    // Composición vertical centrada: "Tu visión," / edificio / "nuestra realidad."
    const line = Math.min(W * 0.112, 64) * 1.16
    const gap = 12
    const cueZone = 72
    const available = H - header - cueZone
    let figH = Math.min((W * 0.78 * BUILDING.h) / BUILDING.w, available - 2 * line - 2 * gap - 24)
    figH = Math.max(figH, 160)
    const k = figH / BUILDING.h
    const figW = BUILDING.w * k
    const total = line + gap + figH + gap + line
    const top = header + Math.max((available - total) / 2, 8)
    const fy = top + line + gap
    return { W, H, compact, k, fx: (W - figW) / 2, fy, figW, figH, groundY: fy + figH }
  }

  const top = header + H * 0.035
  const bottomZone = Math.min(Math.max(H * 0.2, 140), 220)
  let figH = Math.max(H - top - bottomZone, 120)
  let k = figH / BUILDING.h
  const maxW = W * 0.36
  if (BUILDING.w * k > maxW) {
    k = maxW / BUILDING.w
    figH = BUILDING.h * k
  }
  const figW = BUILDING.w * k
  const groundY = H - bottomZone
  return { W, H, compact, k, fx: (W - figW) / 2, fy: groundY - figH, figW, figH, groundY }
}

/** Convierte un punto del logo a píxeles del escenario. */
export function toStage(L: HeroLayout, x: number, y: number): [number, number] {
  return [L.fx + (x - BUILDING.x) * L.k, L.fy + (y - BUILDING.y) * L.k]
}

/** Transform SVG para dibujar las rutas del logo en coordenadas del escenario. */
export function logoTransform(L: HeroLayout) {
  return `translate(${L.fx - BUILDING.x * L.k} ${L.fy - BUILDING.y * L.k}) scale(${L.k})`
}

/**
 * Polígono de recorte: en t = 0 es la silueta del edificio; en t = 1 es la pantalla completa.
 * Ambos polígonos tienen los mismos 8 vértices para poder interpolarlos.
 */
export function clipPolygon(L: HeroLayout, t: number) {
  const { W, H } = L
  const full: [number, number][] = [
    [0, H],
    [0, 0],
    [W / 2, 0],
    [W, 0],
    [W, H],
    [W / 2, H],
    [W / 2, H],
    [W / 2, H],
  ]
  const pts = silhouette.map(([x, y], i) => {
    const [sx, sy] = toStage(L, x, y)
    const [tx, ty] = full[i]
    return `${(sx + (tx - sx) * t).toFixed(1)}px ${(sy + (ty - sy) * t).toFixed(1)}px`
  })
  return `polygon(${pts.join(', ')})`
}

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
