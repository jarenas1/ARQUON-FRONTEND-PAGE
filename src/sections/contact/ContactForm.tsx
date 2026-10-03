import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState, type FormEvent } from 'react'
import { site, whatsappHref } from '../../config/site'
import { useFormspree } from './useFormspree'
import s from './Contact.module.css'

const PROJECT_TYPES = ['Vivienda', 'Comercial', 'Interiores', 'Remodelación', 'Otro']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Errors = Partial<Record<'name' | 'email' | 'consent', string>>

/** Nombre del campo en el formulario para cada error. */
const FIELD: Record<keyof Errors, string> = { name: 'nombre', email: 'email', consent: 'autorizacion' }

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const { status, error, submit, reset } = useFormspree(site.formspreeId)
  const [errors, setErrors] = useState<Errors>({})
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`

  function validate(data: FormData): Errors {
    const next: Errors = {}
    const name = String(data.get('nombre') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    if (!name) next.name = 'Escribe tu nombre.'
    if (!email) next.email = 'Escribe tu correo para poder responderte.'
    else if (!EMAIL_RE.test(email)) next.email = 'Revisa el correo: parece incompleto.'
    if (!data.get('autorizacion')) next.consent = 'Necesitamos tu autorización para contactarte.'
    return next
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const found = validate(data)
    setErrors(found)
    const firstError = (Object.keys(FIELD) as (keyof Errors)[]).find((key) => found[key])
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${FIELD[firstError]}"]`)?.focus()
      return
    }
    const ok = await submit(data)
    if (ok) form.reset()
  }

  if (status === 'sent') {
    return (
      <motion.div
        className={s.done}
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={s.doneTitle}>Recibimos tu solicitud.</p>
        <p className={`serif ${s.doneText}`}>
          Te escribiremos en un día hábil. Si es urgente, escríbenos por WhatsApp y te atendemos de inmediato.
        </p>
        <button type="button" className={s.linkButton} onClick={reset}>
          Enviar otra solicitud
        </button>
      </motion.div>
    )
  }

  const invalid = (key: keyof Errors) => (errors[key] ? true : undefined)
  const described = (key: keyof Errors) => (errors[key] ? id(`${key}-error`) : undefined)

  return (
    <form
      ref={formRef}
      className={s.form}
      onSubmit={onSubmit}
      noValidate
      onInput={(e) => {
        // Al corregir un campo, su mensaje de error desaparece
        const name = (e.target as HTMLInputElement).name
        const key = (Object.keys(FIELD) as (keyof Errors)[]).find((k) => FIELD[k] === name)
        if (key && errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
      }}
    >
      <input type="hidden" name="_subject" value="Nueva solicitud desde el sitio de ARQUON" />
      {/* Campo trampa para bots: las personas no lo ven */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />

      <div className={s.field}>
        <label htmlFor={id('name')}>Nombre</label>
        <input
          id={id('name')}
          name="nombre"
          type="text"
          autoComplete="name"
          required
          aria-invalid={invalid('name')}
          aria-describedby={described('name')}
        />
        {errors.name && (
          <p id={id('name-error')} className={s.error}>
            {errors.name}
          </p>
        )}
      </div>

      <div className={s.pair}>
        <div className={s.field}>
          <label htmlFor={id('email')}>Correo</label>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={invalid('email')}
            aria-describedby={described('email')}
          />
          {errors.email && (
            <p id={id('email-error')} className={s.error}>
              {errors.email}
            </p>
          )}
        </div>
        <div className={s.field}>
          <label htmlFor={id('phone')}>
            Teléfono o WhatsApp <span className={s.optional}>(opcional)</span>
          </label>
          <input id={id('phone')} name="telefono" type="tel" autoComplete="tel" inputMode="tel" />
        </div>
      </div>

      <fieldset className={s.choices}>
        <legend>Tipo de proyecto</legend>
        <div className={s.chips}>
          {PROJECT_TYPES.map((type, i) => (
            <label key={type} className={s.chip}>
              <input type="radio" name="tipo_proyecto" value={type} defaultChecked={i === 0} />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={s.field}>
        <label htmlFor={id('place')}>
          Ubicación del proyecto <span className={s.optional}>(opcional)</span>
        </label>
        <input id={id('place')} name="ubicacion" type="text" placeholder="Ciudad, barrio o vereda" />
      </div>

      <div className={s.field}>
        <label htmlFor={id('message')}>Cuéntanos tu idea</label>
        <textarea
          id={id('message')}
          name="mensaje"
          rows={4}
          placeholder="Qué quieres construir, área aproximada, si ya tienes lote…"
        />
      </div>

      <div className={s.consent}>
        <label className={s.check}>
          <input
            type="checkbox"
            name="autorizacion"
            value="Sí"
            aria-invalid={invalid('consent')}
            aria-describedby={described('consent')}
          />
          <span>Autorizo a {site.name} a usar estos datos para responder mi solicitud.</span>
        </label>
        {errors.consent && (
          <p id={id('consent-error')} className={s.error}>
            {errors.consent}
          </p>
        )}
      </div>

      <div className={s.actions}>
        <button type="submit" className={s.submit} disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
        </button>
        <AnimatePresence>
          {status === 'error' && error && (
            <motion.p
              className={s.formError}
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}{' '}
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                Abrir WhatsApp
              </a>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
