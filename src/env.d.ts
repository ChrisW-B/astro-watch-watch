/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MONGODB_URI: string;
  readonly DB_NAME: string;
  readonly DB_USER: string;
  readonly DB_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
