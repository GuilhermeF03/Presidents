import { publicProcedure, router } from '../trpc/trpc';
import { z } from 'zod';
import { ZodCard } from '@core/models/game/Card';

const gameProcedure = publicProcedure.input(z.object({ gameId: z.string().uuid() }));
const playerProcedure = gameProcedure.input(z.object({ playerId: z.string().uuid() }));

export const gameRouter = router({
  create: publicProcedure.meta({ description: 'Create a new game' }).query(async ({ ctx }) => {
    // Create a new game
    const { services } = ctx.injection;
    const gameId = await services.game.create();
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
