import { describe, it, expect, beforeEach, vi } from 'vitest'

import { getAuthorDataFile, AuthorDataBaseConfig } from '../src/utilities/getAuthorDataFile'

declare global {
  interface ImportMeta {
    env: Record<string, any>;
  }
}

  const makeHostProvider = (hostname: string) => ({ getHostname: () => hostname });
  const makeConfig = (base: string): AuthorDataBaseConfig => ({ getAuthorDataBase: () => base });

  beforeEach(() => {
    vi.resetModules();
    import.meta.env = {};
  });

  it('returns correct path for localhost', () => {
    const hostProvider = makeHostProvider('localhost');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config)).toBe('/localhost/localhost/author-data-en-us.json');
  });

  it('returns correct path for ipv4', () => {
    const hostProvider = makeHostProvider('127.0.0.1');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config)).toBe('/localhost/localhost/author-data-en-us.json');
  });

  it('returns correct path for domain', () => {
    const hostProvider = makeHostProvider('sub.example.com');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config)).toBe('/com/sub.example/author-data-en-us.json');
  });

  it('returns correct path with custom base', () => {
    const hostProvider = makeHostProvider('sub.example.com');
    const config = makeConfig('/foo');
    expect(getAuthorDataFile(hostProvider, config)).toBe('/foo/com/sub.example/author-data-en-us.json');
  });

  it('returns correct path for domain with only tld', () => {
    const hostProvider = makeHostProvider('example.com');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config)).toBe('/com/example/author-data-en-us.json');
  });
