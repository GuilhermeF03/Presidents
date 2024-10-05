import BaseError from '@/model/Error';
import { BadRequestError } from '@/model/errors/ControllerError';
import { TRPCError } from '@trpc/server';
import type { Context } from 'hono';
import { getCookie as getHonoCookie } from 'hono/cookie';
import type { Type } from 'typescript';
import { ZodType, type z } from 'zod';

/**
 * Wrap an HTTP request with error handling
 * @param operation  The operation to perform
 * @returns The result of the operation or an error
 */
const wrapHttpRequest = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      });
    }
  }
};

/**
 * Attempts to get a cookie from the request and parse it using the provided schema, throwing an error if the cookie is missing
 * @param c The context object
 * @param name  The name of the cookie
 * @param schema  The schema to use to parse the cookie
 * @param err  A custom error to throw if the cookie is missing, otherwise a **BadRequestError** is thrown
 * @returns
 */
const getParsedCookie = <T>(c: Context, name: string, schema: ZodType<T>, err?: BaseError): T => {
  const cookie = getHonoCookie(c, name);
  if (!cookie) {
    if (!err) throw new BadRequestError(`Missing cookie: ${name}`);
    throw err;
  }
  return schema.parse(JSON.parse(cookie)); // Use the schema to parse the cookie
};

export { wrapHttpRequest, getParsedCookie };
