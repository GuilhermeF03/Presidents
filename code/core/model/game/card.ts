import { z } from 'zod';

export enum Suit {
  Clubs = 0,
  Diamonds = 1,
  Hearts = 2,
  Spades = 3
}
export enum Rank {
  Two = 0,
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
  Ace = 12
}

export const ZodSuit = z.nativeEnum(Suit);
export const ZodRank = z.nativeEnum(Rank);

export const ZodCard = z.object({
  suit: ZodSuit,
  rank: ZodRank
});
export type Card = z.infer<typeof ZodCard>;
