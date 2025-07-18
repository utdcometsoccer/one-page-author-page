export interface LocaleBase {
  getLocaleBase: () => string;
}

export function getDefaultLocaleFile(config: LocaleBase): string {
  const base = config.getLocaleBase();
  return `${base}/en-us.json`;
}
