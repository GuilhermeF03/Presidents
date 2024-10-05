import { z } from 'zod';

export const ZodID = z.string().uuid();

export const EncodedImage = z.string().base64();
