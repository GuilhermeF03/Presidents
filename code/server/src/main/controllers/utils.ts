import { publicProcedure } from '@/main/trpc/trpc.ts';
import { ZodCard } from '@core/model/game/card.ts';
import { ZodGameInput, ZodGameProfileInput } from '@core/model/game/inputs.ts';
import { ZodProfile } from '@core/model/game/player.ts';
import { z } from 'zod';

export const profileProcedure = publicProcedure.input(ZodProfile);
export const gameProfileProcedure = publicProcedure.input(ZodGameProfileInput);
export const gameOpProcedure = publicProcedure.input(ZodGameInput);
export const playCardProcedure = gameOpProcedure.input(z.object({ card: ZodCard }));
