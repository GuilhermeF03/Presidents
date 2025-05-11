import { z } from 'zod';

export const ZodID = z.string().uuid();
export type ID = z.infer<typeof ZodID>;

export const ZodEncodedImage = z.string()
export type EncodedImage = z.infer<typeof ZodEncodedImage>;
