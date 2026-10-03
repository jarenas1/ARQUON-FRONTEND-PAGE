import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import s from './Reveal.module.css'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEW = { once: true, margin: '0px 0px -12% 0px' } as const

/**
 * La imagen "se levanta" desde su línea base, como una obra que sube desde el suelo.
 * Es el único gesto de entrada que usan las imágenes del sitio.
 */
export function Rise({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEW)
  const reduce = useReducedMotion()
  const shown = inView || reduce

  return (
    <div ref={ref} className={`${s.rise} ${className ?? ''}`}>
      <motion.div
        className={s.riseClip}
        initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={shown ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        <motion.div
          className={s.riseInner}
          initial={reduce ? false : { scale: 1.14 }}
          animate={shown ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

/** Línea que se traza de izquierda a derecha cuando entra en pantalla: la línea de tierra de cada sección. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, VIEW)
  const reduce = useReducedMotion()
  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={`${s.line} ${className ?? ''}`}
      initial={reduce ? false : { scaleX: 0 }}
      animate={inView || reduce ? { scaleX: 1 } : undefined}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  )
}
