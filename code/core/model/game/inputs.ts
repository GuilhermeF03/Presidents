import { z } from 'zod';
import { ZodCard } from './card';
import { ZodID } from './misc';
import { ZodProfile } from './player';

export const ZodGameInput = z.object({
  gameId: ZodID,
  playerId: ZodID
});
/**
 * Input for operations that require a simple game and player ID.
 */
export type GameInput = z.infer<typeof ZodGameInput>;

export const ZodGameProfileInput = ZodProfile.extend({
  gameId: ZodID
});
/**
 * Input for operations that require a game and a player profile.
 */
export type GameProfileInput = z.infer<typeof ZodGameProfileInput>;

export const ZodPlayCardInput = ZodGameInput.extend({
  card: ZodCard
});
/**
 * Input for playing a card.
 * @property card - The card to play.
 * @property gameId - The ID of the game.
 * @property playerId - The ID of the player.
 */
export type PlayCardInput = z.infer<typeof ZodPlayCardInput>;
