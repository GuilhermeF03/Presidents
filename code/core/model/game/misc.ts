import { z } from 'zod';

export const ZodID = z.string().uuid();

export const ZodEncodedImage = z.string().base64();
