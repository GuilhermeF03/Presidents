import { TRPCError } from '@trpc/server';
import type { Observable } from '@trpc/server/observable';
import { z } from 'zod';
import type { StreamEvent } from '../stream/events.ts';
import { ZodCard } from './card.ts';
import { ZodID } from './misc.ts';
import { ZodProfile } from './player.ts';

/**
 * Input for operations that require a game ID and player ID.
 * @property gameId - The ID of the game.
 * @property playerId - The ID of the player.
 */
export const ZodGamePlayerTuple = z
  .object({
    gameId: ZodID,
    playerId: ZodID
  })
  .strict();
/**
 * Input for operations that require a game ID and player ID.
 * @property gameId - The ID of the game.
 * @property playerId - The ID of the player.
 */
export type GamePlayerTuple = z.infer<typeof ZodGamePlayerTuple>;

export const ZodJoinGameInfo = ZodProfile.extend({
  gameId: ZodID
});
export type JoinGameInfo = z.infer<typeof ZodJoinGameInfo>;
