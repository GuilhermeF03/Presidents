import { z } from 'zod';
import type { Hand } from './Hand.ts';
import { ZodGamePlayerTuple } from './game.ts';

/**
 * An enum representing the four suits of a standard deck of playing cards.
 */
export enum Suit {
  Clubs = 0,
  Diamonds = 1,
  Hearts = 2,
  Spades = 3
}
/**
 * An enum representing the ranks of a standard deck of playing cards.
 */
export enum Rank {
  Three = 1,
  Four = 2,
  Five = 3,
  Six = 4,
  Seven = 5,
  Eight = 6,
  Nine = 7,
  Ten = 8,
  Jack = 9,
  Queen = 10,
  King = 11,
  Ace = 12,
  Two = 13,
  Joker = 14
}

// Zod schemas for validation
export const ZodSuit = z.nativeEnum(Suit);
export const ZodRank = z.nativeEnum(Rank);

export const ZodCard = z.object({ suit: ZodSuit, rank: ZodRank }).strict();
export type Card = z.infer<typeof ZodCard>;

/**
 * Input for playing a card.
 * @property gameId - The ID of the game.
 * @property playerId - The ID of the player.
 * @property card - The card to play.
 */
export const ZodPlayCardInput = ZodGamePlayerTuple.extend({
  card: ZodCard
}).strict();
/**
 * Input for playing a card.
 * @property card - The card to play.
 * @property gameId - The ID of the game.
 * @property playerId - The ID of the player.
 */
export type PlayCardInput = z.infer<typeof ZodPlayCardInput>;

/**
 * Input for giving a hand to a player.
 * @property gameId - The ID of the game.
 * @property playerId - The ID of the player.
 * @property hand - The hand to give.
 */
export type GiveHandInput = {
  gameId: string;
  playerId: string;
  hand: Hand;
};
