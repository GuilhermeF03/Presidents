import type { CoreServices } from '@/services/coreServices';
import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Context } from 'hono';

type InjectedContext<T = {}> = {
  injection: { services: CoreServices };
} & T;

type TrpcContextHandler = (opts: FetchCreateContextFnOptions, c: Context) => InjectedContext;

/**
 * A higher-order function to create the injected context using services and a handler.
 */
export const createInjectedContext =
  <T extends TrpcContextHandler>(handler: T) =>
  (opts: FetchCreateContextFnOptions, c: Context): InjectedContext => {
    return handler(opts, c);
  };

/**
 * Create a TRPC context that will be used by the TRPC routers.
 */
export const trpcContext = (services: CoreServices) =>
  createInjectedContext((_opts, _c) => {
    return {
      injection: {
        services,
      },
    };
  });

type AppContext = Awaited<ReturnType<typeof trpcContext>>;

const t = initTRPC.context<AppContext>().create();

export const { router, createCallerFactory } = t;
export const publicProcedure = t.procedure;
