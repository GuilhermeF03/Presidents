import { z } from 'zod';

enum Suit {Clubs, Diamonds, Hearts, Spades}
enum Rank {Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Ace}

const ZodSuit = z.nativeEnum(Suit);
const ZodRank = z.nativeEnum(Rank);

const ZodCard = z.object({
  suit: ZodSuit,
  rank: ZodRank,
});
type Card = z.infer<typeof ZodCard>;


export type { Card };
export { ZodCard, ZodSuit, ZodRank, Suit, Rank };