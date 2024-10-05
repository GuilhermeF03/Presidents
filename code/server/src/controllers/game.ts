import { ZodCard } from '@core/model/game/card';
import { ZodID } from '@core/model/game/misc';
import { ZodProfile } from '@core/model/game/Player';
import type { GameInput, GameProfileInput } from '@core/model/game/inputs';
import type { Context } from 'hono';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc/trpc';
import { getParsedCookie, wrapHttpRequest } from './utils';

// Router
export const gameRouter = router({
  // Create a new Game
  create: publicProcedure.output(ZodID).mutation(async ({ ctx }) => {
    const { services } = ctx.injection;
    const profile = getParsedCookie(ctx.c, 'profile', ZodProfile);

    return await wrapHttpRequest(async () => await services.game.createGame(profile));
  }),

  // Join a game
  join: publicProcedure.output(z.void()).mutation(({ ctx }) => {
    const { services } = ctx.injection;
    const input = getGameProfileInput(ctx.c);

    return wrapHttpRequest(async () => await services.game.joinGame(input));
  }),

  // Start a SSE subscription
  enter: publicProcedure.subscription(({ ctx, input }) => {
    return { ctx, input };
  }),

  // Leave a game
  leave: publicProcedure.mutation(({ ctx }) => {
    const { services } = ctx.injection;
    const input = getGameOpInput(ctx.c);

    return wrapHttpRequest(async () => await services.game.leaveGame(input));
  }),

  // Start a game
  start: publicProcedure.mutation(({ ctx }) => {
    const { services } = ctx.injection;
    const gameOp = getGameOpInput(ctx.c);

    return wrapHttpRequest(async () => await services.game.startGame(gameOp));
  }),

  // Play a card
  play: publicProcedure.input(ZodCard).mutation(({ ctx, input }) => {
    const { services } = ctx.injection;

    const playCardInput = getGameOpInput(ctx.c);

    return wrapHttpRequest(async () => await services.game.playCard({ ...playCardInput, card: input }));
  }),
});

// Helpers
const getGameOpInput = (ctx: Context): GameInput => {
  const game = getParsedCookie(ctx, 'game', ZodID);
  const profile = getParsedCookie(ctx, 'profile', ZodProfile);
  return { gameId: game, playerId: profile.playerId };
};

const getGameProfileInput = (ctx: Context): GameProfileInput => {
  const game = getParsedCookie(ctx, 'game', ZodID);
  const profile = getParsedCookie(ctx, 'profile', ZodProfile);
  return { gameId: game, ...profile };
};
