import { cardRouter } from '@/main/controllers/cardRouter.ts';
import { createCallerFactory, publicProcedure, router } from '../trpc/trpc.ts';
import { gameRouter } from './gameRouter.ts';

// Router

export const rootRouter = router({
  hello: publicProcedure.query(() => {
    return 'hello world';
  }),
  game: gameRouter,
  card: cardRouter,
});

export type AppRouter = typeof rootRouter;
export const createCaller = createCallerFactory(rootRouter); // usefull for testing
