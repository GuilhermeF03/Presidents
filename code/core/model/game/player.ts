import { z } from 'zod';
import type { Hand } from './Hand.ts';
import { ZodEncodedImage, ZodID } from './misc';

export const ZodProfile = z.object({
  playerId: ZodID,
  name: z.string(),
  picture: ZodEncodedImage
});
export type Profile = z.infer<typeof ZodProfile>;

export type GamePlayerInfo = Profile & { hand: Hand };
