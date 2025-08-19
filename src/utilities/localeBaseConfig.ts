import type { LocaleBase } from './getLocaleFile';

export const localeBaseConfig: LocaleBase = {
  getLocaleBase: () => import.meta.env.VITE_LOCALE_BASE || '/locales'
};
