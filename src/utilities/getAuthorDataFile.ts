
export interface HostProvider {
  getHostname: () => string;
}

export interface AuthorDataBaseConfig {
  getAuthorDataBase: () => string;
}

export function getAuthorDataFile(hostProvider: HostProvider, config: AuthorDataBaseConfig, fileExtension: string, locale: string): string {
  let tld = 'com'; // Default TLD
  let sld = 'localhost';
  const base = config.getAuthorDataBase();
  const hostname = hostProvider.getHostname().toLowerCase();
  
  // Regex for IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // Regex for localhost
  const localhostRegex = /^localhost$/i;
  // Regex for domain name
  const domainRegex = /^([\w-]+\.)*([\w-]+)\.([a-zA-Z]{2,})$/;

  if (ipv4Regex.test(hostname) || localhostRegex.test(hostname)) {
    tld = 'localhost';
    sld = 'localhost';
  } else if (domainRegex.test(hostname)) {
    // e.g. sub.example.com => tld: com, sld: example
    const parts = hostname.split('.');
    tld = parts[parts.length - 1];
    sld = parts.length > 1 ? parts[parts.length - 2] : hostname;
  }

  // Parse language and region from locale
  let language = '';
  let region = '';
  const localeStr = locale.toLowerCase();
  if (localeStr.includes('-')) {
    const localeParts = localeStr.split('-');
    language = localeParts[0];
    region = localeParts[1];
  } else {
    language = localeStr;
  }

  // Build path: {base}/{tld}/{sld}/{language}/{region?}{fileExtension}
  let path = `${base}/${tld}/${sld}/${language}`;
  if (region) {
    path += `/${region}`;
  }
  path += `${fileExtension}`;
  return path;
}
