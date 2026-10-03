import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { DrawLine } from '../../components/ui/Reveal'
import { steps, type Step } from '../../data/process'
import s from './Process.module.css'

/**
 * Cada número empieza en contorno (planeado) y se rellena (construido)
 * cuando el paso pasa por el centro de la pantalla.
 */
function StepRow({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const [built, setBuilt] = useState(false)
  // Se marca como construido cuando el paso cruza el centro de la pantalla
  // (también si se salta con un enlace del menú).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.62', 'start 0.5'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.5 && !built) setBuilt(true)
  })

  return (
    <li ref={ref} className={s.step} data-built={built || undefined}>
      <DrawLine className={s.rule} />
      <div className={s.row}>
        <span className={s.number} aria-hidden="true">
          {index + 1}
        </span>
        <h3 className={s.stepTitle}>
          <span className="visually-hidden">Paso {index + 1}: </span>
          {step.title}
        </h3>
        <div className={s.stepBody}>
          <p className={`serif ${s.text}`}>{step.body}</p>
          <p className={s.deliverable}>
            <span className={s.deliverableLabel}>Recibes</span>
            {step.deliverable}
          </p>
        </div>
      </div>
    </li>
  )
}

export function Process() {
  return (
    <section id="proceso" className={s.section} data-tone="olive" aria-labelledby="proceso-titulo">
      <div className="container">
        <div className={s.head}>
          <h2 id="proceso-titulo" className={s.title}>
            Del trazo a la obra
          </h2>
          <p className={`serif ${s.intro}`}>
            Así trabajamos, de la primera reunión a la entrega de llaves. Un solo equipo en cada paso, para que sepas
            siempre en qué va tu proyecto.
          </p>
        </div>
        <ol className={s.steps}>
          {steps.map((step, i) => (
            <StepRow key={step.title} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
