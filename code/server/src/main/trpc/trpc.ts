import type { CoreServices } from '@services//types.ts';
import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Context } from 'hono';

export type InjectedContext<T> = {
  c: Context;
  injection: { services: CoreServices };
} & T;
export type TrpcContextHandler<T> = (opts: FetchCreateContextFnOptions, c: Context) => T;

export function createInjectedContext<T>(
  services: CoreServices,
  handler: TrpcContextHandler<T>
): TrpcContextHandler<InjectedContext<T>> {
  return (opts, c) => {
    return {
      c,
      ...handler(opts, c),
      injection: { services },
    };
  };
}

export const trpcContext = (services: CoreServices) => createInjectedContext(services, () => ({}));

type AppContext = Awaited<ReturnType<typeof trpcContext>>;
const t = initTRPC.context<AppContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      message: error.message,
    };
  },
});

export const { router, createCallerFactory } = t;
export const publicProcedure = t.procedure;
