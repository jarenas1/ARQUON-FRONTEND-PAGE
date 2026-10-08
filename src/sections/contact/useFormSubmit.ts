import { useState } from 'react'

export type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Envía el formulario a un correo usando FormSubmit (https://formsubmit.co), sin backend.
 * La primera vez FormSubmit manda un correo de activación a esa dirección: hay que
 * confirmarlo para que empiecen a llegar las solicitudes.
 */
export function useFormSubmit(email: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(data: FormData) {
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      const body = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null
      if (res.ok && String(body?.success) === 'true') {
        setStatus('sent')
        return true
      }
      setError('No pudimos enviar tu solicitud. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp.')
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
