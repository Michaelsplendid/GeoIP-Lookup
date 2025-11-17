/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IPSTACK_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
