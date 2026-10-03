import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type ScrollApi = {
  lenis: Lenis | null
  /** Desplaza suavemente hasta una sección por su id. */
  scrollToId: (id: string) => void
  /** Bloquea / libera el scroll de la página (para la ficha de proyecto y el menú móvil). */
  lock: () => void
  unlock: () => void
}

const ScrollContext = createContext<ScrollApi | null>(null)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const instance = new Lenis({
      lerp: 0.09,
      autoRaf: true,
      // El scroll interno de la ficha de proyecto y del menú queda nativo
      prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
    })
    // Lenis es un sistema externo: se crea al montar y se expone por contexto
    // oxlint-disable-next-line react/set-state-in-effect
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const scrollToId = useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }
    },
    [lenis],
  )

  const lock = useCallback(() => {
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
  }, [lenis])

  const unlock = useCallback(() => {
    lenis?.start()
    document.documentElement.style.overflow = ''
  }, [lenis])

  return <ScrollContext.Provider value={{ lenis, scrollToId, lock, unlock }}>{children}</ScrollContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useSmoothScroll() {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useSmoothScroll debe usarse dentro de <SmoothScrollProvider>')
  return ctx
}
