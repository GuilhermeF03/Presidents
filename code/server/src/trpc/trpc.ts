import { initTRPC } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { CoreServices } from '@/services/coreServices';

export const trpcContext =
  (services: CoreServices) =>
  ({ req, res }: CreateExpressContextOptions) => {
    const getUser = () => {
      if (req.headers.authorization !== 'secret') return null;

      return { name: 'alex' };
    };

    return {
      services,
      req,
      res,
      user: getUser(),
    };
  };
type Context = Awaited<ReturnType<typeof trpcContext>>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
