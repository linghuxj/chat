import { getAppConfig } from './app';
import { getProviderConfig } from './provider';
import { getAuthConfig } from "@/config/server/auth";

export const getServerConfig = () => {
  if (typeof process === 'undefined') {
    throw new Error('[Server Config] you are importing a server-only module outside of server');
  }

  const provider = getProviderConfig();
  const app = getAppConfig();
  const auth = getAuthConfig();

  return { ...provider, ...app, ...auth };
};
