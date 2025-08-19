export interface AuthorDataBaseConfig {
  getAuthorDataBase: () => string;
}

export function getRemoteAuthorDataBaseConfig(): AuthorDataBaseConfig {
  return {
    getAuthorDataBase: () => {
      const base = import.meta.env.VITE_AUTHOR_DATA_BASE || '';
      return base.includes('http') ? base : (base ? `/${base}` : '');
    }
  };
}

export function getLocalAuthorDataBaseConfig(): AuthorDataBaseConfig {
  return {
    getAuthorDataBase: () => {
      return import.meta.env.VITE_LOCAL_AUTHOR_DATA_BASE || '';
    }
  };
}
