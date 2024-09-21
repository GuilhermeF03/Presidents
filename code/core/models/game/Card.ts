import { z } from 'zod';

const ZodSuit = z.enum(['Clubs', 'Diamonds', 'Hearts', 'Spades']);
type Suit = z.infer<typeof ZodSuit>;
const Suit = ZodSuit.enum

const ZodRank = z.enum(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']);
type Rank = z.infer<typeof ZodRank>;
const Rank = ZodRank.enum

const ZodCard = z.object({
    suit: ZodSuit,
    rank: ZodRank
});
type Card = z.infer<typeof ZodCard>;

export type { Card } ;
export { ZodCard, ZodSuit, ZodRank, Suit, Rank };