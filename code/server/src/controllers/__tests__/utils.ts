import type { CoreServices, GameServices } from '@/services/types';
import { createInjectedContext } from '@/trpc/trpc';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Context } from 'hono';
import { instance, mock } from 'ts-mockito';
import { createCaller } from '../rootRouter';

const trpcContext = (services: CoreServices) => {
  const contextFactory = createInjectedContext(services, () => {
    return {
      injection: {
        services,
      },
    };
  });
  return contextFactory({} as FetchCreateContextFnOptions, {} as Context);
};

export const mockCaller = (services: CoreServices) => {
  const context = trpcContext(services);
  return createCaller(context);
};

export const mockServices = (handler: (serviceMocks: CoreServices) => CoreServices = m => m): CoreServices => {
  const services: CoreServices = {
    game: mock<GameServices>(),
  };
  const finalMocks = handler(services);

  for (const key of Object.keys(finalMocks) as (keyof CoreServices)[]) {
    finalMocks[key] = instance(finalMocks[key]);
  }

  return finalMocks;
};
