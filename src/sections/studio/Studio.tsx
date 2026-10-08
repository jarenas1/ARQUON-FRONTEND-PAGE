import { DrawLine, Rise } from '../../components/ui/Reveal'
import { SmartImage } from '../../components/ui/SmartImage'
import { local } from '../../lib/media'
import s from './Studio.module.css'

const services = [
  { name: 'Diseño arquitectónico', text: 'Vivienda, comercio y oficinas, del anteproyecto a los planos técnicos.' },
  { name: 'Licencias y trámites', text: 'Preparamos y gestionamos la licencia de construcción ante la curaduría.' },
  { name: 'Construcción', text: 'Obra llave en mano o gerencia de obra, con informes semanales.' },
  { name: 'Diseño interior', text: 'Distribución, mobiliario a la medida, materiales e iluminación.' },
]

const studioImage = local('/proyectos/consultorio-odontologico/01.webp', 'Recepción del consultorio odontológico construido por ARQUON', 4 / 5)

export function Studio() {
  return (
    <section id="estudio" className={s.section} data-tone="light" aria-labelledby="estudio-titulo">
      <div className="container">
        <DrawLine className={s.rule} />
        <div className={`grid-12 ${s.head}`}>
          <h2 id="estudio-titulo" className={s.name}>
            Estudio
          </h2>
          <p className={s.statement}>
            Somos un estudio de arquitectura que también construye. Dibujamos lo que imaginas y lo levantamos con el
            mismo equipo, para que nada se pierda entre el plano y la obra.
          </p>
        </div>

        <div className={`grid-12 ${s.body}`}>
          <figure className={s.figure}>
            <Rise className={s.frame}>
              <SmartImage image={studioImage} sizes="(max-width: 860px) 100vw, 40vw" />
            </Rise>
            <figcaption className={s.caption}>
              Quien dibuja tu proyecto lo acompaña también en la obra.
            </figcaption>
          </figure>

          <div className={s.text}>
            <div className={`serif ${s.prose}`}>
              <p>
                Cada proyecto empieza con una conversación: cómo vives, cómo trabajas, qué presupuesto manejas y cómo
                es tu lote. Con eso proponemos, ajustamos y dibujamos hasta que el diseño sea tuyo.
              </p>
              <p>
                Después lo construimos. Tienes un solo interlocutor desde el anteproyecto hasta la entrega de llaves,
                con costos y tiempos que conoces desde el principio.
              </p>
            </div>

            <h3 className={s.subhead}>Qué hacemos</h3>
            <ul className={s.services}>
              {services.map((item) => (
                <li key={item.name}>
                  <span className={s.serviceName}>{item.name}</span>
                  <span className={s.serviceText}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
