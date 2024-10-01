import { ZodCard } from '@core/models/game/Card';
import { ZodGameOpInput, ZodPlayerOpInput } from '@core/models/game/Input';
import { ZodProfile } from '@core/models/game/Player';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc/trpc';
import { wrapHttpRequest } from './utils';

// Procedures
const playerProfileProcedure = publicProcedure.input(ZodProfile);
const playerProcedure = publicProcedure.input(ZodPlayerOpInput);
const gameProcedure = playerProcedure.input(ZodGameOpInput);

// Router
export const gameRouter = router({
  // Create a new Game
  create: playerProfileProcedure.output(z.string().uuid()).mutation(async ({ ctx, input: playerInfo }) => {
    const { services } = ctx.injection;

    return await wrapHttpRequest(async () => await services.game.create(playerInfo));
  }),

  // Join a game
  join: playerProfileProcedure
    .input(ZodGameOpInput)
    .output(z.void())
    .mutation(({ ctx, input }) => {
      const { services } = ctx.injection;

      return wrapHttpRequest(async () => await services.game.join(input));
    }),

  // Start a SSE subscription
  enter: gameProcedure.subscription(({ ctx, input }) => {
    const { services } = ctx.injection;

    return {};
  }),

  // Leave a game
  leave: gameProcedure.mutation(({ ctx, input }) => {
    const { services } = ctx.injection;

    return wrapHttpRequest(async () => await services.game.leave(input));
  }),

  // Start a game
  start: gameProcedure.mutation(({ ctx, input }) => {
    const { services } = ctx.injection;

    return wrapHttpRequest(async () => await services.game.start(input));
  }),

  // Play a card
  play: gameProcedure.input(z.object({ card: ZodCard })).mutation(({ ctx, input }) => {
    const { services } = ctx.injection;

    return wrapHttpRequest(async () => await services.game.play(input));
  }),
});
