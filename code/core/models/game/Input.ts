import { z } from "zod";
import { ZodCard } from "../game/Card";
import { ZodProfile } from "./Player";

const ZodPlayerOpInput = z.object({
    playerId: z.string().uuid(),
});
type PlayerOpInput = z.infer<typeof ZodPlayerOpInput>;

const ZodGameOpInput = ZodPlayerOpInput.extend({
    gameId: z.string().uuid(),
});
type GameOpInput = z.infer<typeof ZodGameOpInput>;

const ZodGameProfileOpInput = ZodProfile.extend({
    gameId: z.string().uuid(),
});
type GameProfileOpInput = z.infer<typeof ZodGameProfileOpInput>;


const ZodPlayCardInput = ZodGameOpInput.extend({
    card: ZodCard.pick({suit: true, rank: true}),
});

type PlayCardInput = z.infer<typeof ZodPlayCardInput>;


export type { PlayerOpInput, GameOpInput, PlayCardInput, GameProfileOpInput };
export { ZodPlayerOpInput, ZodGameOpInput, ZodPlayCardInput };