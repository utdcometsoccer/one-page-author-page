/// <reference types="vite/client" />
interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_LOCALE_BASE: string;
  readonly VITE_AUTHOR_DATA_BASE: string;
  readonly VITE_APPINSIGHTS_INSTRUMENTATION_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}