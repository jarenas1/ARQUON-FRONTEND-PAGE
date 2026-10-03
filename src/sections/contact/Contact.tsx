import { site, whatsappHref } from '../../config/site'
import { ContactForm } from './ContactForm'
import s from './Contact.module.css'

export function Contact() {
  return (
    <section id="contacto" className={s.section} data-tone="black" aria-labelledby="contacto-titulo">
      <div className={`container ${s.layout}`}>
        <div className={s.side}>
          <h2 id="contacto-titulo" className={s.title}>
            Cuéntanos tu proyecto
          </h2>
          <p className={`serif ${s.lead}`}>
            Déjanos tus datos y te contactamos en un día hábil. Si prefieres, escríbenos directamente por WhatsApp.
          </p>
          <a className={s.whatsapp} href={whatsappHref()} target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp
          </a>

          <dl className={s.details}>
            <div>
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>
                <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>Estudio</dt>
              <dd>{site.contact.address}</dd>
            </div>
            <div>
              <dt>Horario</dt>
              <dd>{site.contact.hours}</dd>
            </div>
          </dl>
        </div>

        <div className={s.formWrap}>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
