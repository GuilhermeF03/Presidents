import { createCallerFactory, publicProcedure, router } from '../trpc/trpc.ts';
import { z } from 'zod';
import { gameRouter } from './game.ts';

export const rootRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return 'hello world';
  }),
  game: gameRouter,
});

export const createCaller = createCallerFactory(rootRouter); // usefull for testing
