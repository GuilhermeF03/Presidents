import { publicProcedure, router } from '@/main/trpc/trpc.ts';
import { ZodCard } from '@core/model/game/card.ts';
import { ZodGamePlayerTuple } from '@core/model/game/game.ts';
import { z } from 'zod';

// Template Procedure
const gameOpProcedure = publicProcedure.input(ZodGamePlayerTuple);
const playCardProcedure = gameOpProcedure.input(z.array(ZodCard));

export const cardRouter = router({
  playCard: playCardProcedure.mutation(async ({ ctx, input }) => {
    const { services } = ctx.injection;
    await services.card.playCards(input);
  }),
});
