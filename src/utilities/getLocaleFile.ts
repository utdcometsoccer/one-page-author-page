import { getLocale } from './getLocale'

export interface LocaleBase {
  getLocaleBase: () => string;
}

export function getLocaleFile(config: LocaleBase): string {
  const fileExtension = import.meta.env.VITE_AUTHOR_DATA_FILE_EXTENSION;
  const locale = getLocale();
  // Extract language and region, force lower case
  let language = '';
  let region = '';
  if (locale.includes('-')) {
    const parts = locale.split('-');
    language = parts[0].toLowerCase();
    region = parts[1].toLowerCase();
  } else {
    language = locale.toLowerCase();
  }
  const base = config.getLocaleBase();
  // You can now use language and region as needed
  return `${base}/${language}/${region}${fileExtension}`;
}
