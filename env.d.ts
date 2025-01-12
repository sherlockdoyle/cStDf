/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEPLOYED_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
