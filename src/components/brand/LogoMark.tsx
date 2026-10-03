import {
  axisPath,
  bandsBold,
  bandsThin,
  groundPath,
  mullionsBold,
  mullionsThin,
  outlinePath,
  viewBoxString,
} from './geometry'

type Props = {
  /** Grosor del trazo en unidades del viewBox (el logo original usa ~17). */
  strokeWidth?: number
  /** Incluir las líneas finas (para tamaños grandes). */
  detailed?: boolean
  className?: string
  title?: string
}

/** Isotipo de ARQUON como SVG de trazo. Hereda el color con currentColor. */
export function LogoMark({ strokeWidth = 17, detailed = false, className, title }: Props) {
  const thin = strokeWidth * 0.36
  return (
    <svg
      viewBox={viewBoxString}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g strokeWidth={strokeWidth}>
        <path d={groundPath} />
        <path d={outlinePath} />
        <path d={axisPath} />
        {mullionsBold.map((d) => (
          <path key={d} d={d} />
        ))}
        {bandsBold.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {detailed && (
        <g strokeWidth={thin} opacity={0.7}>
          {mullionsThin.map((d) => (
            <path key={d} d={d} />
          ))}
          {bandsThin.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      )}
    </svg>
  )
}
