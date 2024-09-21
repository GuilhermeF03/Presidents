import { publicProcedure, router } from '../trpc/trpc';
import { z } from 'zod';
import { ZodCard } from '@core/models/game/Card';

const gameProcedure = publicProcedure.input(z.object({ gameId: z.string().uuid() }));
const playerProcedure = gameProcedure.input(z.object({ playerId: z.string().uuid() }));

export const gameRouter = router({
  create: publicProcedure.query(({ ctx }) => {
    // Create a new game
    const gameId = ctx.services.game;
    return gameId;
  }),
  join: gameProcedure.mutation(({ input }) => {
    // Join a game
    return input;
  }),

  drawTo: playerProcedure.mutation(({ input }) => {
    // Draw a card to a player
    console.log(input);
    return input;
  }),

  play: playerProcedure.input(z.object({ card: ZodCard })).mutation(({ input }) => {}),
});
