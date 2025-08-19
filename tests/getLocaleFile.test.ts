import { describe, it, expect, vi } from 'vitest'
import { getLocaleFile, type LocaleBase } from '../src/utilities/getLocaleFile'

vi.mock('../src/utilities/getLocale', () => ({ getLocale: () => 'es-mx' }))

describe('getLocaleFile', () => {
  it('returns the correct path with default base', () => {
    const config: LocaleBase = { getLocaleBase: () => '/locales' };
    expect(getLocaleFile(config)).toBe('/locales/es/mx');
  });
  it('returns the correct path with custom base', () => {
    const config: LocaleBase = { getLocaleBase: () => '/foo' };
    expect(getLocaleFile(config)).toBe('/foo/es/mx');
  });
});
