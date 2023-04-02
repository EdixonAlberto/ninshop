/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ENV: 'demo' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
