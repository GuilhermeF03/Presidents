import { EventEmitter } from 'events';
import { UnauthorizedError } from '@/domain/errors';
import { publicProcedure, router } from '@/trpc';
import { ZodProfile } from '@core/model/game/Player';
import { ZodCard } from '@core/model/game/card';
import { ZodGameInput, ZodGameProfileInput } from '@core/model/game/inputs';
import { ZodID } from '@core/model/game/misc';
import { z } from 'zod';

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

  enterGame: gameOpProcedure.subscription(async function* ({ ctx, input }) {
    const { services } = ctx.injection;

    return await services.game.enterGame(input);
  }),

  // In-game operations
  startGame: gameOpProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    await services.game.startGame(input);
  }),

  leaveGame: gameOpProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    await services.game.leaveGame(input);
  }),

  playCard: playCardProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;

    await services.game.playCard(input);
  }),
});
