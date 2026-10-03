import { useNavigate } from 'react-router'
import { Rise } from '../../components/ui/Reveal'
import { SmartImage } from '../../components/ui/SmartImage'
import { formatArea, type Project } from '../../data/projects'
import s from './ProjectCard.module.css'

type Props = { project: Project; ratio: number }

export function ProjectCard({ project, ratio }: Props) {
  const navigate = useNavigate()
  const href = `/proyectos/${project.slug}`
  const side = project.levels ? `${project.levels} niveles` : String(project.year)

  return (
    <a
      href={href}
      className={s.card}
      onClick={(e) => {
        // Respeta "abrir en otra pestaña" con Ctrl/Cmd
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navigate(href, { state: { fromGallery: true } })
      }}
    >
      <div className={s.frame} style={{ aspectRatio: ratio }}>
        <Rise className={s.rise}>
          <SmartImage image={project.cover} sizes="(max-width: 860px) 100vw, 50vw" className={s.img} />
        </Rise>

        <div className={s.veil} aria-hidden="true" />

        {/* Cotas: líneas de medida como en un plano */}
        <div className={s.dims} aria-hidden="true">
          <span className={s.dimH}>
            <span className={s.dimLabel}>{formatArea(project.area)}</span>
          </span>
          <span className={s.dimV}>
            <span className={s.dimLabelV}>{side}</span>
          </span>
        </div>

        <div className={s.info}>
          <span className={s.meta}>
            {project.category}, {project.location}
          </span>
          <h3 className={s.name}>{project.name}</h3>
          <p className={s.summary}>{project.summary}</p>
          <span className={s.more}>Ver proyecto</span>
        </div>
      </div>

      {/* En pantallas táctiles (sin hover) el nombre se muestra debajo */}
      <div className={s.caption} aria-hidden="true">
        <span className={s.captionName}>{project.name}</span>
        <span className={s.captionMeta}>
          {project.location}, {project.year}
        </span>
      </div>
    </a>
  )
}
