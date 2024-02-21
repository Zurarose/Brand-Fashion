/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_APPLICATION_ID: string;
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_SERVER_URL: string;
  readonly VITE_APP_SERVER_GRAPHQL_URL: string;
  readonly VITE_APP_BASE_AUTH_LOGIN: string;
  readonly VITE_APP_BASE_AUTH_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
