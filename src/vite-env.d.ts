/// <reference types="vite/client" />
interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_LOCALE_BASE: string;
  readonly VITE_AUTHOR_DATA_BASE: string;
  readonly VITE_APPINSIGHTS_CONNECTION_STRING: string;
  readonly VITE_AUTHOR_DATA_FILE_EXTENSION: string;
  readonly VITE_LOCAL_AUTHOR_DATA_BASE: string;
  readonly VITE_LOCAL_TLD: string;
  readonly VITE_LOCAL_SLD: string;
  readonly VITE_LOCAL_LANG: string;
  readonly VITE_LOCAL_REGION: string;
  readonly VITE_LOCAL_AUTHOR_DATA_FILE_EXTENSION: string;
  readonly VITE_DYNAMIC_SITEMAP_ENABLED: string;
  readonly VITE_SITEMAP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}