import { ZodProfile } from '@core/model/game/Player';
import { ZodCard } from '@core/model/game/card';
import { ZodGameInput, ZodGameProfileInput } from '@core/model/game/inputs';
import { ZodID } from '@core/model/game/misc';
import { transformTRPCResponse } from '@trpc/server/shared';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc/trpc';
import { observable } from '@trpc/server/observable';
import { EventEmitter, on } from 'events';

// Template Procedures

const profileProcedure = publicProcedure.input(ZodProfile);
const gameProfileProcedure = publicProcedure.input(ZodGameProfileInput);
const gameOpProcedure = publicProcedure.input(ZodGameInput);
const playCardProcedure = gameOpProcedure.input(z.object({ card: ZodCard }));

const ee = new EventEmitter();

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
  enterGame: gameOpProcedure.subscription(async function* ({ ctx, input }) {
    const { services } = ctx.injection;

    //await services.game.enterGame(input);

    for await (const [data] of on(ee, 'add')) {
      const post = data;
      yield post;
    }
  }),

  // Leave a game
  leaveGame: gameOpProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    await services.game.leaveGame(input);
  }),

  // Start a game
  startGame: gameOpProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    await services.game.startGame(input);
  }),

  // Play a card
  playCard: playCardProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    await services.game.playCard(input);
  }),
});
