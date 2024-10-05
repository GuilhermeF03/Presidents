import type { CoreServices } from '@/services/types';
import { createInjectedContext } from '@/trpc/trpc';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Context } from 'hono';

export const createTestContext = (services: CoreServices) => {
  const injectedContext = createInjectedContext(services, () => ({}));
  return injectedContext({} as FetchCreateContextFnOptions, {} as Context);
};
