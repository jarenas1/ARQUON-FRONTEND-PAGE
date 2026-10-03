/**
 * Geometría del isotipo de ARQUON, trazada sobre el logo original (lienzo de 1920 px).
 * Se usa tanto para dibujar el logo como para la máscara del hero.
 */
export const VIEWBOX = { x: 392, y: 258, w: 1136, h: 972 } as const
export const viewBoxString = `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`

/** Línea de tierra con el acceso en "V" invertida. */
export const GROUND_Y = 1213
export const groundPath = 'M400 1213 H866 L959 1130 L1052 1213 H1520'

/** Contorno: muros y cubierta a dos aguas. */
export const outlinePath = 'M566 1213 V552 L960 268 L1352 552 V1213'

/** Eje central que divide las dos fachadas. */
export const axisPath = 'M959.5 274 V1130'

/** Fachada derecha: montantes verticales. */
export const mullionsBold = ['M1094.5 366 V1213', 'M1226 461 V1213']
export const mullionsThin = ['M1002 520 V1213', 'M1135 620 V1213', 'M1264 740 V1213']

/** Fachada izquierda: franjas curvas. */
export const bandsBold = [
  'M566 680 C723 648 860 550 959 410',
  'M566 914 C722 883 860 786 959 646',
  'M566 1167 C720 1138 858 1046 959 909',
]
export const bandsThin = ['M566 850 C723 818 860 720 940 600', 'M566 1099 C722 1068 860 971 940 852']

/**
 * Silueta del edificio (para recortar la foto o el video del hero).
 * Orden: base izq., hombro izq., cumbrera, hombro der., base der., acceso der., vértice del acceso, acceso izq.
 */
export const silhouette: [number, number][] = [
  [566, 1213],
  [566, 552],
  [960, 268],
  [1352, 552],
  [1352, 1213],
  [1052, 1213],
  [959, 1130],
  [866, 1213],
]
