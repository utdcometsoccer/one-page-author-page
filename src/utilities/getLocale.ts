export function getLocale(): string {
  return navigator.language?.toLowerCase() || 'en-us'
}
