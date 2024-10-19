import type { CoreServices } from '@/services/types';
import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Context } from 'hono';

export type InjectedContext<T> = {
  c: Context;
  injection: { services: CoreServices };
} & T;

export type TrpcContextHandler<T> = (opts: FetchCreateContextFnOptions, c: Context) => T;

/**
 * A higher-order function to create the injected context using services and a handler.
 */
export const createInjectedContext =
  <T = void>(services: CoreServices, handler: TrpcContextHandler<T>) =>
  (opts: FetchCreateContextFnOptions, c: Context): InjectedContext<T> => {
    return {
      c,
      ...handler(opts, c),
      injection: {
        services,
      },
    };
  };

/**
 * Create a TRPC context that will be used by the TRPC routers.
 */
export const trpcContext = (services: CoreServices) => createInjectedContext(services, () => ({}));

type AppContext = Awaited<ReturnType<typeof trpcContext>>;

const t = initTRPC.context<AppContext>().create();

export const { router, createCallerFactory, mergeRouters } = t;
export const publicProcedure = t.procedure;
