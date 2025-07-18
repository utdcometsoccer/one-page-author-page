export interface AuthorDataBaseConfig {
  getAuthorDataBase: () => string;
}

export function getDefaultAuthorDataFile(config: AuthorDataBaseConfig): string {
  const base = config.getAuthorDataBase();
  return `${base}/data.json`;
}
