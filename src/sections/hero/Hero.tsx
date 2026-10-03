import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useCallback, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { axisPath, bandsBold, bandsThin, mullionsBold, mullionsThin, outlinePath } from '../../components/brand/geometry'
import { site } from '../../config/site'
import { useElementSize } from '../../lib/hooks'
import { useSmoothScroll } from '../../lib/smooth-scroll'
import { clamp01, clipPolygon, computeHeroLayout, easeInOutCubic, logoTransform, toStage } from './heroLayout'
import s from './Hero.module.css'

const EASE = [0.16, 1, 0.3, 1] as const
/** Parte del recorrido de scroll en la que la silueta se abre hasta llenar la pantalla. */
const EXPAND_END = 0.62

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const { scrollToId } = useSmoothScroll()

  const { width, height } = useElementSize(stageRef)
  const layout = useMemo(() => (width && height ? computeHeroLayout(width, height) : null), [width, height])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  // --- Recorte de la foto: silueta → pantalla completa -------------------------------
  const layoutRef = useRef(layout)
  const applyClip = useCallback((p: number) => {
    const L = layoutRef.current
    const el = mediaRef.current
    if (!L || !el) return
    el.style.clipPath = clipPolygon(L, easeInOutCubic(clamp01(p / EXPAND_END)))
  }, [])

  useLayoutEffect(() => {
    layoutRef.current = layout
    applyClip(reduce ? 0 : scrollYProgress.get())
  }, [layout, applyClip, reduce, scrollYProgress])

  // Tono para el header: claro mientras se ve el dibujo, oscuro cuando la foto llena la pantalla
  const [tone, setTone] = useState<'light' | 'photo'>('light')
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduce) return
    applyClip(p)
    const next = p > 0.42 ? 'photo' : 'light'
    setTone((prev) => (prev === next ? prev : next))
  })

  const linesOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0])
  const sloganOpacity = useTransform(scrollYProgress, [0.04, 0.26], [1, 0])
  const sloganY = useTransform(scrollYProgress, [0, 0.3], [0, 60])
  const mediaScale = useTransform(scrollYProgress, [0, EXPAND_END], [1.18, 1])
  const shadeOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1])
  const captionOpacity = useTransform(scrollYProgress, [0.6, 0.78], [0, 1])
  const captionY = useTransform(scrollYProgress, [0.6, 0.8], [28, 0])

  // --- Coordenadas derivadas -------------------------------------------------------
  const stageVars = layout
    ? ({
        '--ground-y': `${layout.groundY}px`,
        '--fig-y': `${layout.fy}px`,
        '--fig-x': `${layout.fx}px`,
        '--fig-w': `${layout.figW}px`,
      } as CSSProperties)
    : undefined

  const groundPath = useMemo(() => {
    if (!layout) return ''
    const gutter = Math.min(Math.max(layout.W * 0.04, 20), 64)
    const [nlx, gy] = toStage(layout, 866, 1213)
    const [nax, nay] = toStage(layout, 959, 1130)
    const [nrx] = toStage(layout, 1052, 1213)
    return `M${gutter} ${gy} H${nlx} L${nax} ${nay} L${nrx} ${gy} H${layout.W - gutter}`
  }, [layout])

  const bold = layout ? (layout.compact ? 1.3 : 1.7) / layout.k : 1
  const thin = bold * 0.45

  const draw = (delay: number, duration = 1.4) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { pathLength: { delay, duration, ease: EASE } },
        }

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { y: '105%' },
          animate: { y: '0%' },
          transition: { delay, duration: 1.1, ease: EASE },
        }

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className={s.hero}
      data-tone={tone}
      data-static={reduce || undefined}
      aria-label="Presentación"
    >
      <div className={s.sticky}>
        <div ref={stageRef} className={s.stage} style={stageVars}>
          {/* Foto o video dentro de la silueta */}
          <motion.div
            ref={mediaRef}
            className={s.media}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: layout ? 1 : 0 }}
            transition={{ delay: reduce ? 0 : 1.25, duration: 1.2, ease: 'easeOut' }}
          >
            <motion.div className={s.mediaInner} style={reduce ? undefined : { scale: mediaScale }}>
              {site.hero.video ? (
                <video
                  className={s.mediaEl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={site.hero.image}
                  aria-hidden="true"
                >
                  {site.hero.video.webm && <source src={site.hero.video.webm} type="video/webm" />}
                  {site.hero.video.mp4 && <source src={site.hero.video.mp4} type="video/mp4" />}
                </video>
              ) : (
                <img
                  className={s.mediaEl}
                  src={site.hero.image}
                  alt={site.hero.imageAlt}
                  fetchPriority="high"
                  // Si la foto no carga, queda el fondo olivo con el dibujo encima
                  onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                />
              )}
            </motion.div>
            <motion.div className={s.shade} style={{ opacity: reduce ? 0 : shadeOpacity }} aria-hidden="true" />
          </motion.div>

          {/* Dibujo del isotipo encima de la foto */}
          {layout && (
            <motion.svg
              className={s.lines}
              viewBox={`0 0 ${layout.W} ${layout.H}`}
              width={layout.W}
              height={layout.H}
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              aria-hidden="true"
              style={reduce ? undefined : { opacity: linesOpacity }}
            >
              <motion.path d={groundPath} strokeWidth={bold * layout.k} {...draw(0.1, 1.3)} />
              <g transform={logoTransform(layout)}>
                <motion.path d={outlinePath} strokeWidth={bold} {...draw(0.35, 1.6)} />
                {/* Las líneas interiores se dibujan en negro y pasan a blanco cuando aparece la foto */}
                <motion.g
                  initial={reduce ? false : { stroke: '#000000' }}
                  animate={{ stroke: '#ffffff' }}
                  transition={{ delay: reduce ? 0 : 1.45, duration: 0.9, ease: 'easeOut' }}
                >
                  <motion.path d={axisPath} strokeWidth={bold} {...draw(0.7, 1.2)} />
                  {[...mullionsBold, ...bandsBold].map((d, i) => (
                    <motion.path key={d} d={d} strokeWidth={bold} opacity={0.9} {...draw(0.8 + i * 0.07, 1.1)} />
                  ))}
                  {[...mullionsThin, ...bandsThin].map((d, i) => (
                    <motion.path key={d} d={d} strokeWidth={thin} opacity={0.7} {...draw(1 + i * 0.06, 1)} />
                  ))}
                </motion.g>
              </g>
            </motion.svg>
          )}

          {/* Eslogan: contorno = la idea, relleno = lo construido */}
          <motion.h1 className={s.slogan} style={reduce ? undefined : { opacity: sloganOpacity, y: sloganY }}>
            <span className={s.mask}>
              <motion.span className={s.outline} {...rise(0.9)}>
                {site.sloganParts[0]}
              </motion.span>
            </span>{' '}
            <span className={s.mask}>
              <motion.span className={s.solid} {...rise(1.05)}>
                {site.sloganParts[1]}
              </motion.span>
            </span>
          </motion.h1>

          <motion.p className={s.noteLeft} style={reduce ? undefined : { opacity: sloganOpacity }}>
            {site.description}, {site.city.split(',')[0]}
          </motion.p>
          <motion.p
            className={s.noteRight}
            style={reduce ? undefined : { opacity: sloganOpacity }}
            aria-hidden="true"
          >
            Desliza para ver la obra
            <span className={s.cue} />
          </motion.p>

          {/* Texto sobre la foto a pantalla completa */}
          {!reduce && (
            <motion.div
              className={s.caption}
              style={{ opacity: captionOpacity, y: captionY }}
              inert={tone === 'light'}
            >
              <p className={s.captionText}>Diseñamos tu proyecto y lo construimos con el mismo equipo.</p>
              <button type="button" className={s.captionLink} onClick={() => scrollToId('proyectos')}>
                Ver proyectos
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
