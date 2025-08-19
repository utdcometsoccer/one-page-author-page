import { describe, it, expect } from 'vitest';
import { localeBaseConfig } from '../src/utilities/localeBaseConfig';

describe('localeBaseConfig', () => {
  it('should return the correct locale base from env or default', () => {
    expect(localeBaseConfig.getLocaleBase()).toBe(import.meta.env.VITE_LOCALE_BASE || '/locales');
  });
});
