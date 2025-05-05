import { publicProcedure, router } from '@/main/trpc/trpc.ts';
import { ZodCard } from '@core/model/game/card.ts';
import { ZodGamePlayerTuple, ZodJoinGameInfo } from '@core/model/game/game.ts';
import { ZodID } from '@core/model/game/misc.ts';
import { ZodProfile } from '@core/model/game/player.ts';
import type { StreamEvent } from '@core/model/stream/events.ts';
import type { TRPCError } from '@trpc/server';
import type { Observable } from '@trpc/server/observable';
import { z } from 'zod';

// Template Procedures
const profileProcedure = publicProcedure.input(ZodProfile);
const gameOpProcedure = publicProcedure.input(ZodGamePlayerTuple);

// Router
export const gameRouter = router({
  createGame: profileProcedure.subscription(async ({ ctx, input }) => {
    const { services } = ctx.injection;
    return await services.game.createGame(input);
  }),

  joinGame: publicProcedure.input(ZodJoinGameInfo).subscription(async ({ ctx, input }) => {
    const { services } = ctx.injection;
    return await services.game.joinGame(input);
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
});
