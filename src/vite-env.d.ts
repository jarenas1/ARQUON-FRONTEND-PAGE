/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_FORM_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
