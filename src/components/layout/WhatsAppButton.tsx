import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { whatsappHref } from '../../config/site'
import { useMediaQuery } from '../../lib/hooks'
import s from './WhatsAppButton.module.css'

/**
 * Botón flotante de WhatsApp. En escritorio aparece apenas se empieza a bajar,
 * para no tapar el eslogan del hero; en móvil está siempre visible.
 */
export function WhatsAppButton() {
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 860px)')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visible = !wide || scrolled

  return (
    <motion.a
      className={s.button}
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
      tabIndex={visible ? undefined : -1}
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ delay: visible && !wide && !reduce ? 2.2 : 0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <span className={s.label} aria-hidden="true">
        Escríbenos
      </span>
      <svg className={s.icon} viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3C8.87 3 3.05 8.82 3.05 15.99c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75a12.94 12.94 0 0 0 6.36 1.66h.01c7.17 0 12.99-5.82 12.99-12.99S23.21 3 16.04 3Zm0 23.73h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.24-3.97 1.04 1.06-3.87-.26-.4a10.76 10.76 0 0 1-1.66-5.77c0-5.96 4.85-10.81 10.82-10.81 2.89 0 5.6 1.13 7.65 3.17a10.74 10.74 0 0 1 3.16 7.65c0 5.97-4.85 10.73-10.89 10.73Zm5.93-8.09c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.16-.22.33-.84 1.06-1.03 1.28-.19.22-.38.24-.71.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.26-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.77-1-2.42-.27-.64-.54-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.36c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.5.21 2.06.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.13-.3-.21-.62-.37Z"
        />
      </svg>
    </motion.a>
  )
}
