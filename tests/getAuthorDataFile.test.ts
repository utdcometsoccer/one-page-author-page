// Rewritten tests below
import { describe, it, expect, vi } from 'vitest';
import { getAuthorDataFile, AuthorDataBaseConfig } from '../src/utilities/getAuthorDataFile';

const makeHostProvider = (hostname: string) => ({ getHostname: () => hostname });
const makeConfig = (base: string): AuthorDataBaseConfig => ({ getAuthorDataBase: () => base });
const fileExt = '/author-data.json';


describe('getAuthorDataFile', () => {
  it('returns correct path for localhost', () => {
    const hostProvider = makeHostProvider('localhost');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config, fileExt, 'en-us')).toBe('/localhost/localhost/en/us/author-data.json');
  });

  it('returns correct path for ipv4', () => {
    const hostProvider = makeHostProvider('127.0.0.1');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config, fileExt, 'en-us')).toBe('/localhost/localhost/en/us/author-data.json');
  });

  it('returns correct path for www subdomain', () => {
    const hostProvider = makeHostProvider('www.example.com');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config, fileExt, 'en-us')).toBe('/com/example/en/us/author-data.json');
  });

  it('returns correct path for domain', () => {
    const hostProvider = makeHostProvider('sub.example.com');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config, fileExt, 'en-us')).toBe('/com/example/en/us/author-data.json');
  });

  it('returns correct path with custom base', () => {
    const hostProvider = makeHostProvider('sub.example.com');
    const config = makeConfig('/foo');
    expect(getAuthorDataFile(hostProvider, config, fileExt, 'en-us')).toBe('/foo/com/example/en/us/author-data.json');
  });

  it('returns correct path for domain with only tld', () => {
    const hostProvider = makeHostProvider('example.com');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config, fileExt, 'en-us')).toBe('/com/example/en/us/author-data.json');
  });

  it('returns correct path for locale without region', () => {
    const hostProvider = makeHostProvider('example.com');
    const config = makeConfig('');
    expect(getAuthorDataFile(hostProvider, config, fileExt, 'fr')).toBe('/com/example/fr/author-data.json');
  });
});
