import { getLocale } from './getLocale'

export interface HostProvider {
  getHostname: () => string;
}

export interface AuthorDataBaseConfig {
  getAuthorDataBase: () => string;
}

export function getAuthorDataFile(hostProvider: HostProvider, config: AuthorDataBaseConfig, fileExtension: string): string {
  const locale = getLocale();
  const base = config.getAuthorDataBase();
  const hostname = hostProvider.getHostname();
  let tld = 'localhost';
  let hostKey = hostname;
  // Regex for IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // Regex for localhost
  const localhostRegex = /^localhost$/i;
  // Regex for domain name
  const domainRegex = /^([\w-]+\.)*([\w-]+)\.([a-zA-Z]{2,})$/;

  if (ipv4Regex.test(hostname) || localhostRegex.test(hostname)) {
    tld = 'localhost';
    hostKey = 'localhost';
  } else if (domainRegex.test(hostname)) {
    // e.g. sub.example.com => tld: com, hostKey: example
    const parts = hostname.split('.');
    tld = parts[parts.length - 1];
    // hostKey is the domain (second-to-last part), ignore subdomains
    hostKey = parts.length > 1 ? parts[parts.length - 2] : hostname;
  }

  // Try /topleveldomain/hostname/author-data-${locale}.{fileExtension}
  const path = `${base}/${tld}/${hostKey}/author-data-${locale}${fileExtension}`;
  return path;
}
