import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { SmartImage } from '../../components/ui/SmartImage'
import { site, whatsappHref } from '../../config/site'
import { formatArea, getNextProject, type Project } from '../../data/projects'
import { useEscape } from '../../lib/hooks'
import { useSmoothScroll } from '../../lib/smooth-scroll'
import s from './ProjectOverlay.module.css'

const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

type Props = { project: Project }

/** Ficha completa del proyecto. Vive en /proyectos/:slug para poder compartir el enlace. */
export function ProjectOverlay({ project }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { lock, unlock } = useSmoothScroll()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const next = getNextProject(project.slug)
  const fromGallery = Boolean((location.state as { fromGallery?: boolean } | null)?.fromGallery)

  const close = useCallback(() => {
    if (fromGallery) navigate(-1)
    else navigate('/', { replace: true })
  }, [fromGallery, navigate])

  useEscape(close)

  // Bloquea el scroll de la página y recuerda el foco para devolverlo al cerrar
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    lock()
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      unlock()
      document.title = site.title
      previous?.focus?.({ preventScroll: true })
    }
  }, [lock, unlock])

  // Al cambiar de proyecto: título y volver arriba
  useLayoutEffect(() => {
    document.title = `${project.name} — ${site.name}`
    panelRef.current?.scrollTo({ top: 0 })
  }, [project])

  // Mantiene el foco dentro del panel
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const facts: [string, string][] = [
    ['Ubicación', project.location],
    ['Año', String(project.year)],
    ['Área construida', formatArea(project.area)],
    ...(project.levels ? ([['Niveles', String(project.levels)]] as [string, string][]) : []),
    ['Tipo', project.category],
    ['Estado', project.status],
  ]

  return (
    <motion.div
      className={s.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ficha-titulo"
      onKeyDown={onKeyDown}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.9, ease: EASE_IN_OUT }}
    >
      <div ref={panelRef} className={s.panel} data-lenis-prevent>
        <div className={s.bar}>
          <span className={s.barTitle}>{project.name}</span>
          <button ref={closeRef} type="button" className={s.close} onClick={close}>
            Cerrar
            <span className={s.closeIcon} aria-hidden="true" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={project.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className={`container ${s.head}`}>
              <motion.p
                className={s.kicker}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: EASE_OUT }}
              >
                {project.category}, {project.year}
              </motion.p>
              <h2 id="ficha-titulo" className={s.title}>
                <span className={s.titleMask}>
                  <motion.span
                    className={s.titleInner}
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.35, duration: 1, ease: EASE_OUT }}
                  >
                    {project.name}
                  </motion.span>
                </span>
              </h2>
            </header>

            <motion.figure
              className={s.cover}
              initial={{ clipPath: 'inset(12% 6% 0% 6%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ delay: 0.3, duration: 1.3, ease: EASE_OUT }}
            >
              <SmartImage image={project.cover} priority sizes="100vw" />
            </motion.figure>

            <div className={`container ${s.body}`}>
              <dl className={s.facts}>
                {facts.map(([k, v]) => (
                  <div key={k} className={s.fact}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>

              <div className={s.story}>
                <p className={s.summary}>{project.summary}</p>
                <div className={`serif ${s.prose}`}>
                  {project.description.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>

                <div className={s.work}>
                  <div>
                    <h3 className={s.subhead}>Alcance</h3>
                    <ul className={s.tags}>
                      {project.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className={s.subhead}>Qué hicimos</h3>
                    <ol className={s.steps}>
                      {project.work.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {project.video && (
              <div className={`container ${s.videoWrap}`}>
                <video
                  className={s.video}
                  src={project.video.src}
                  poster={project.video.poster}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            )}

            {project.gallery.length > 0 && (
              <div className={`container ${s.gallery}`}>
                {project.gallery.map((img, i) => (
                  <figure key={img.src + i} className={s.shot} data-layout={i % 3}>
                    <div className={s.shotFrame}>
                      <SmartImage image={img} sizes="(max-width: 860px) 100vw, 60vw" />
                    </div>
                    {img.caption && <figcaption className={s.shotCaption}>{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}

            <div className={`container ${s.cta}`}>
              <p className={s.ctaText}>¿Tienes un proyecto parecido?</p>
              <a className={s.ctaLink} href={whatsappHref(`Hola, ARQUON. Vi el proyecto ${project.name} y quiero contarles sobre el mío.`)} target="_blank" rel="noopener noreferrer">
                Hablemos por WhatsApp
              </a>
            </div>

            <a
              className={s.next}
              href={`/proyectos/${next.slug}`}
              onClick={(e) => {
                e.preventDefault()
                navigate(`/proyectos/${next.slug}`, { replace: true, state: location.state })
              }}
            >
              <div className={s.nextImage}>
                <SmartImage image={next.cover} sizes="100vw" />
              </div>
              <div className={`container ${s.nextText}`}>
                <span className={s.nextLabel}>Siguiente proyecto</span>
                <span className={s.nextName}>{next.name}</span>
              </div>
            </a>
          </motion.article>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
