import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { nav, site, whatsappHref } from '../../config/site'
import { useEscape } from '../../lib/hooks'
import { useSmoothScroll } from '../../lib/smooth-scroll'
import { LogoMark } from '../brand/LogoMark'
import s from './Header.module.css'

export type Tone = 'light' | 'photo' | 'olive' | 'black'

/** Detecta qué sección está debajo del header para ajustar su color. */
function useHeaderState(headerRef: React.RefObject<HTMLElement | null>) {
  const [tone, setTone] = useState<Tone>('light')
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const header = headerRef.current
      const probe = (header?.offsetHeight ?? 70) / 2
      const under = document
        .elementsFromPoint(window.innerWidth / 2, probe)
        .find((el) => !header?.contains(el) && el.closest('[data-tone]'))
      const next = (under?.closest('[data-tone]')?.getAttribute('data-tone') as Tone | null) ?? 'light'
      setTone(next)
      setAtTop(y < 8)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > window.innerHeight * 0.6)
        lastY = y
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headerRef])

  return { tone, hidden, atTop }
}

export function Header() {
  const ref = useRef<HTMLElement>(null)
  const { tone, hidden, atTop } = useHeaderState(ref)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollToId, lock, unlock } = useSmoothScroll()

  const go = useCallback(
    (id: string) => {
      setMenuOpen(false)
      unlock()
      scrollToId(id)
    },
    [scrollToId, unlock],
  )

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    unlock()
  }, [unlock])

  useEscape(closeMenu, menuOpen)

  return (
    <>
      <header
        ref={ref}
        className={s.header}
        data-tone={tone}
        data-hidden={hidden && !menuOpen ? '' : undefined}
        data-at-top={atTop ? '' : undefined}
      >
        <div className={s.inner}>
          <a
            href="#inicio"
            className={s.brand}
            aria-label={`${site.name}, ir al inicio`}
            onClick={(e) => {
              e.preventDefault()
              go('inicio')
            }}
          >
            <LogoMark strokeWidth={44} className={s.mark} />
            <span className={s.word}>{site.name}</span>
          </a>

          <nav className={s.nav} aria-label="Principal">
            <ul>
              {nav.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(item.id)
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className={s.cta}
              onClick={(e) => {
                e.preventDefault()
                go('contacto')
              }}
            >
              Cuéntanos tu proyecto
            </a>
          </nav>

          <button
            type="button"
            className={s.menuButton}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            onClick={() => {
              setMenuOpen(true)
              lock()
            }}
          >
            Menú
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-movil"
            className={s.menu}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            data-lenis-prevent
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className={s.menuTop}>
              <span className={s.brand}>
                <LogoMark strokeWidth={44} className={s.mark} />
                <span className={s.word}>{site.name}</span>
              </span>
              <button type="button" className={s.menuButton} onClick={closeMenu} autoFocus>
                Cerrar
              </button>
            </div>
            <nav aria-label="Menú móvil">
              <ol className={s.menuList}>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        go(item.id)
                      }}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <div className={s.menuFoot}>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
