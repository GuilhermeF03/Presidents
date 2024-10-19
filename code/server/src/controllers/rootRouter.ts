import { createCallerFactory, publicProcedure, router } from '../trpc.ts';
import { gameRouter } from './gameRouter.ts';

// Router

export const rootRouter = router({
  hello: publicProcedure.query(() => {
    return 'hello world';
  }),
  game: gameRouter,
});

export type AppRouter = typeof rootRouter;
export const createCaller = createCallerFactory(rootRouter); // usefull for testing
