import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useState } from 'react'
import { DrawLine } from '../../components/ui/Reveal'
import { categories, projects, type Category } from '../../data/projects'
import { ProjectCard } from './ProjectCard'
import s from './Projects.module.css'

type Filter = Category | 'Todos'

/** Proporción de cada posición de la retícula editorial (se repite cada 6 proyectos). */
const SLOT_RATIOS = [4 / 3, 4 / 5, 4 / 5, 3 / 2, 3 / 2, 1]

export function Projects() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const list = filter === 'Todos' ? projects : projects.filter((p) => p.category === filter)
  const options: Filter[] = ['Todos', ...categories]
  const count = (f: Filter) => (f === 'Todos' ? projects.length : projects.filter((p) => p.category === f).length)

  return (
    <section id="proyectos" className={s.section} data-tone="light" aria-labelledby="proyectos-titulo">
      <div className="container">
        <DrawLine />
        <div className={s.head}>
          <h2 id="proyectos-titulo" className={s.title}>
            Proyectos
          </h2>
          <div className={s.headSide}>
            <p className={s.intro}>
              Vivienda, comercio e interiores. Abre cualquier obra para ver cómo la diseñamos y construimos.
            </p>
            <div className={s.filters} role="group" aria-label="Filtrar proyectos por tipo">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={s.filter}
                  aria-pressed={filter === option}
                  onClick={() => setFilter(option)}
                >
                  {option}
                  <sup className={s.count}>{count(option)}</sup>
                </button>
              ))}
            </div>
          </div>
        </div>

        <LayoutGroup>
          <ul className={s.grid}>
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((project, i) => (
                <motion.li
                  key={project.slug}
                  layout
                  className={s.item}
                  data-slot={i % SLOT_RATIOS.length}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} ratio={SLOT_RATIOS[i % SLOT_RATIOS.length]} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </LayoutGroup>
      </div>
    </section>
  )
}
