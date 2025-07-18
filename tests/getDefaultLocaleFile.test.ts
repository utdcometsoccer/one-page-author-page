import { describe, it, expect } from 'vitest'
import { getDefaultLocaleFile, type LocaleBase } from '../src/utilities/getDefaultLocaleFile'

describe('getDefaultLocaleFile', () => {
  it('returns the correct default locale file path', () => {
    const config: LocaleBase = { getLocaleBase: () => '/locales' };
    expect(getDefaultLocaleFile(config)).toBe('/locales/en-us.json');
  });
  it('returns the correct path with custom base', () => {
    const config: LocaleBase = { getLocaleBase: () => '/foo' };
    expect(getDefaultLocaleFile(config)).toBe('/foo/en-us.json');
  });
});
