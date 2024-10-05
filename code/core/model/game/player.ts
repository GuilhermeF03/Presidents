import { z } from 'zod';
import { ZodRole } from './State';
import { ZodCard } from './card';
import { EncodedImage, ZodID } from './misc';

export const ZodProfile = z.object({
  playerId: ZodID,
  name: z.string(),
  pic: EncodedImage
});
export type Profile = z.infer<typeof ZodProfile>;

export const ZodHand = z.object({
  cards: z.array(ZodCard)
});
export type Hand = z.infer<typeof ZodHand>;

export const ZodGamePlayerInfo = ZodProfile.extend({
  state: z.union([ZodHand, ZodRole])
});
export type GamePlayerInfo = z.infer<typeof ZodGamePlayerInfo>;
