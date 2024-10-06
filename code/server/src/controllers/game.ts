import { ZodCard } from '@core/model/game/card';
import { ZodID } from '@core/model/game/misc';
import { ZodProfile } from '@core/model/game/Player';
import { ZodGameInput, ZodGameProfileInput, type GameInput, type GameProfileInput } from '@core/model/game/inputs';
import type { Context } from 'hono';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc/trpc';
import { wrapHttpRequest } from './utils';

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

    return await wrapHttpRequest(async () => await services.game.createGame(input));
  }),

  // Join a game
  joinGame: gameProfileProcedure.output(z.void()).mutation(({ ctx, input }) => {
    const { services } = ctx.injection;

    return wrapHttpRequest(async () => await services.game.joinGame(input));
  }),

  // Start a SSE subscription
  enterGame: publicProcedure.subscription(({ ctx, input }) => {
    return { ctx, input };
  }),

  // Leave a game
  leaveGame: gameOpProcedure.mutation(({ ctx, input }) => {
    const { services } = ctx.injection;

    return wrapHttpRequest(async () => await services.game.leaveGame(input));
  }),

  // Start a game
  startGame: gameOpProcedure.mutation(({ ctx, input }) => {
    const { services } = ctx.injection;

    return wrapHttpRequest(async () => await services.game.startGame(input));
  }),

  // Play a card
  play: playCardProcedure.mutation(({ ctx, input }) => {
    const { services } = ctx.injection;

    return wrapHttpRequest(async () => await services.game.playCard(input));
  }),
});