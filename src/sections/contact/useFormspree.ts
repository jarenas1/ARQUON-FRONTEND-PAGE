import { useState } from 'react'

export type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Envía un formulario a Formspree (https://formspree.io) sin backend propio.
 * Configura el ID con la variable VITE_FORMSPREE_ID.
 */
export function useFormspree(formId: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(data: FormData) {
    if (!formId) {
      console.warn('[ARQUON] Falta VITE_FORMSPREE_ID: el formulario no puede enviarse. Mira .env.example.')
      setError('El formulario aún no está conectado. Mientras tanto, escríbenos por WhatsApp o por correo.')
      setStatus('error')
      return false
    }

    setStatus('sending')
    setError(null)
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        return true
      }
      const body = (await res.json().catch(() => null)) as { errors?: { message: string }[] } | null
      setError(
        body?.errors?.map((e) => e.message).join(' ') ||
          'No pudimos enviar tu solicitud. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp.',
      )
      setStatus('error')
      return false
    } catch {
      setError('No hay conexión. Revisa tu internet e inténtalo de nuevo, o escríbenos por WhatsApp.')
      setStatus('error')
      return false
    }
  }

  return { status, error, submit, reset: () => (setStatus('idle'), setError(null)) }
}
