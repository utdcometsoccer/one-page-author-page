export interface HostProvider {
  getHostname: () => string;
}

export function getWindowHostProvider(): HostProvider {
  return {
    getHostname: () => window.location.hostname
  };
}

export function getLocalHostProvider(): HostProvider {
  return {
    getHostname: () => import.meta.env.VITE_LOCAL_HOST || 'localhost'
  };
}
