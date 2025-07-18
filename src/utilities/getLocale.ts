export function getLocale(): string {
  const lang = navigator.language?.toLowerCase() || 'en-us';
  if (lang === 'en') return 'en-us';
  return lang;
}
