import { ZodCard } from '@core/models/game/Card';
import { ZodGameOpInput, ZodPlayerOpInput } from '@core/models/input/types';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc/trpc';
import { httpWrap } from './utils';

const playerProcedure = publicProcedure.input(ZodPlayerOpInput);
const gameProcedure = playerProcedure.input(ZodGameOpInput);

export const gameRouter = router({
  create: playerProcedure.mutation(async ({ ctx, input }) => {
    // Create a new game
    const { services } = ctx.injection;

    return httpWrap(async () => await services.game.create(input));
  }),

  join: gameProcedure.mutation(({ ctx, input }) => {
    // Join a game
    const { services } = ctx.injection;

    return httpWrap(async () => await services.game.join(input));
  }),

  drawTo: playerProcedure.mutation(({ input }) => {
    // Draw a card to a player
    console.log(input);
    return input;
  }),

  play: gameProcedure.input(z.object({ card: ZodCard })).mutation(({ input }) => {}),
});
