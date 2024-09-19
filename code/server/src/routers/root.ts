import { publicProcedure, router } from '../trpc/trpc.ts';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const rootRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return `hello ${input ?? ctx.user?.name ?? 'world'}`;
  }),
  // or inline a router
  admin: router({
    secret: publicProcedure.query(({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      if (ctx.user?.name !== 'alex') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return {
        secret: 'sauce',
      };
    }),
  }),
});
