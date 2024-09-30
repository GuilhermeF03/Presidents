import type { CoreServices } from '@/services/coreServices';
import { createInjectedContext } from '@/trpc/trpc';

export const createTestContext = (services: CoreServices) => {
  const injectedContext = createInjectedContext(services, () => ({}));
  return injectedContext({} as any, {} as any);
};
