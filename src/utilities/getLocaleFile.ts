import { getLocale } from './getLocale'

export interface LocaleBase {
  getLocaleBase: () => string;
}

export function getLocaleFile(config: LocaleBase): string {
  const locale = getLocale();
  const base = config.getLocaleBase();
  return `${base}/${locale}.json`;
}
