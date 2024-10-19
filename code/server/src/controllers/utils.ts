import { publicProcedure } from '@/trpc';
import { ZodProfile } from '@core/model/game/Player';
import { ZodCard } from '@core/model/game/card';
import { ZodGameInput, ZodGameProfileInput } from '@core/model/game/inputs';
import { z } from 'zod';

export const profileProcedure = publicProcedure.input(ZodProfile);
export const gameProfileProcedure = publicProcedure.input(ZodGameProfileInput);
export const gameOpProcedure = publicProcedure.input(ZodGameInput);
export const playCardProcedure = gameOpProcedure.input(z.object({ card: ZodCard }));
