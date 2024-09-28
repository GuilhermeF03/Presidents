import type { CoreServices } from '@/services/coreServices';
import { initTRPC } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

type InjectedContext<T = {}> = {
  injection: { services: CoreServices };
} & T;

export const createInjectedContext =
  <T extends (...args: any[]) => InjectedContext>(services: CoreServices, handler: T) =>
  (...args: Parameters<T>): InjectedContext => {
    return handler(services, ...args);
  };

/**
 * Create a TRPC context that will be used by the TRPC routers
 */
export const trpcContext = (services: CoreServices) =>
  createInjectedContext(services, ({ req, res }: CreateExpressContextOptions) => {
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
