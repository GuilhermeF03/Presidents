import { z } from "zod";

const ZodPlayerOpInput = z.object({
    playerId: z.string().uuid(),
});
type PlayerOpInput = z.infer<typeof ZodPlayerOpInput>;

const ZodGameOpInput = ZodPlayerOpInput.extend({
    gameId: z.string().uuid(),
});
type GameOpInput = z.infer<typeof ZodGameOpInput>;

export type { PlayerOpInput, GameOpInput };
export { ZodPlayerOpInput, ZodGameOpInput};