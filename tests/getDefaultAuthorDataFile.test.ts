import { describe, it, expect } from 'vitest'
import { getDefaultAuthorDataFile, AuthorDataBaseConfig } from '../src/utilities/getDefaultAuthorDataFile'

describe('getDefaultAuthorDataFile', () => {
  const makeConfig = (base: string): AuthorDataBaseConfig => ({
    getAuthorDataBase: () => base
  });
  it('returns the correct default author data file path', () => {
    const config = makeConfig('');
    expect(getDefaultAuthorDataFile(config)).toBe('/data.json');
  });
  it('returns the correct path with custom base', () => {
    const config = makeConfig('/foo');
    expect(getDefaultAuthorDataFile(config)).toBe('/foo/data.json');
  });
});
