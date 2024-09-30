import { z } from "zod";
import { ZodCard } from "./Card";

export const ZodProfile = z.object({
    playerId: z.string().uuid(),
    name: z.string(),
    pic: z.string().base64(),
});
export type Profile = z.infer<typeof ZodProfile>;

export const ZodHand = ZodProfile.extend({
    cards: z.array(ZodCard),
});
export type Hand = z.infer<typeof ZodHand>;