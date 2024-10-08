import { ZodProfile } from '@core/model/game/Player';
import { ZodCard } from '@core/model/game/card';
import { ZodGameInput, ZodGameProfileInput } from '@core/model/game/inputs';
import { ZodID } from '@core/model/game/misc';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc/trpc';

// Template Procedures

const profileProcedure = publicProcedure.input(ZodProfile);
const gameProfileProcedure = publicProcedure.input(ZodGameProfileInput);
const gameOpProcedure = publicProcedure.input(ZodGameInput);
const playCardProcedure = gameOpProcedure.input(z.object({ card: ZodCard }));

// Router
export const gameRouter = router({
  // Create a new Game
  createGame: profileProcedure.output(ZodID).mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;
    const result = await services.game.createGame(input);

    return result;
  }),

  // Join a game
  joinGame: gameProfileProcedure.output(z.void()).mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    return await services.game.joinGame(input);
  }),

  // Start a SSE subscription
  enterGame: publicProcedure.subscription(({ ctx, input }) => {
    return { ctx, input };
  }),

  // Leave a game
  leaveGame: gameOpProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    return await services.game.leaveGame(input);
  }),

  // Start a game
  startGame: gameOpProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    return await services.game.startGame(input);
  }),

  // Play a card
  play: playCardProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    return await services.game.playCard(input);
  }),
});
