/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional web app host for account opening and log in, for example https://app.example.com */
  readonly VITE_APP_URL?: string
  /** Optional public origin of this landing page, used for absolute Open Graph and canonical URLs */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
