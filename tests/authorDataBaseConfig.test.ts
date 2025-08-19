declare global {
  interface ImportMeta {
    env: { [key: string]: any };
  }
}
import { describe, it, expect, beforeEach } from 'vitest';
import { getRemoteAuthorDataBaseConfig, getLocalAuthorDataBaseConfig } from '../src/utilities/authorDataBaseConfig';

describe('getRemoteAuthorDataBaseConfig', () => {    
  it('returns env', () => {
    expect(getRemoteAuthorDataBaseConfig().getAuthorDataBase()).toBe(import.meta.env.VITE_AUTHOR_DATA_BASE);
  });
});

describe('getLocalAuthorDataBaseConfig', () => {  

  it('returns local base from env', () => {    
    expect(getLocalAuthorDataBaseConfig().getAuthorDataBase()).toBe(import.meta.env.VITE_LOCAL_AUTHOR_DATA_BASE);
  });

  it('returns empty if env is not set', () => {
    import.meta.env.VITE_LOCAL_AUTHOR_DATA_BASE = '';
    expect(getLocalAuthorDataBaseConfig().getAuthorDataBase()).toBe('');
  });
});