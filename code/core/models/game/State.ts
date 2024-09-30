import { ZodCard } from "./Card";
import { z } from "zod";
import { Deck } from "./Deck";
import { ZodHand, ZodProfile } from "./Player";

export enum Role {
    President = 'president',
    VicePresident = 'vicePresident',
    ViceScum = 'viceScum',
    Scum = 'scum',
    Person = 'person',
}
export const ZodRole = z.nativeEnum(Role);

const ZodBaseGameState = z.object({
    id: z.string().uuid(),
    players: z.record(z.string(), z.union([ZodHand, ZodRole])),
    state: z.union([z.literal('pending'), z.literal('active'), z.literal('finished')]),
});

const ZodPendingGameState = ZodBaseGameState.extend({
    state: z.literal('pending'),
});
export type PendingGameState = z.infer<typeof ZodPendingGameState>;

const ZodActiveGameState = ZodBaseGameState.extend({
    deck: z.instanceof(Deck),
    pile: z.array(ZodCard),
    round: z.number(),
    turn: z.number(),
    president: z.union([z.string().uuid(), z.undefined()]),
    vicePresident: z.union([z.string().uuid(), z.undefined()]),
    viceScum: z.union([z.string().uuid(), z.undefined()]),
    scum: z.union([z.string().uuid(), z.undefined()]),
    state: z.literal('active'),
});
export type ActiveGameState = z.infer<typeof ZodActiveGameState>;

const ZodFinishedGameState = ZodActiveGameState.extend({
    state: z.literal('finished'),
});
export type FinishedGameState = z.infer<typeof ZodFinishedGameState>;

export type GameState = PendingGameState | ActiveGameState | FinishedGameState;