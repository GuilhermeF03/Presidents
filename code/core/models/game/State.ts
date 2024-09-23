import { ZodCard } from "./Card";
import { z } from "zod";

const ZodBaseGameState = z.object({
    id: z.string().uuid(),
    players: z.array(z.string().uuid()),
    state: z.union([z.literal('pending'), z.literal('active'), z.literal('finished')]),
});

const ZodPendingGameState = ZodBaseGameState.extend({
    state: z.literal('pending'),
});
const ZodActiveGameState = ZodBaseGameState.extend({
    state: z.literal('active'),
    turn: z.number(),
    cards: z.array(ZodCard),
});
const ZodFinishedGameState = ZodBaseGameState.extend({
    state: z.literal('finished'),
    winner: z.string().uuid(),
});

type PendingGameState = z.infer<typeof ZodPendingGameState>;
type ActiveGameState = z.infer<typeof ZodActiveGameState>;
type FinishedGameState = z.infer<typeof ZodFinishedGameState>;

export type GameState = PendingGameState | ActiveGameState | FinishedGameState;