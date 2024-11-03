import type { InjectedContext } from '@/trpc/trpc.ts';
import type { AnyRouter, DefaultErrorShape, ProcedureType, TRPCError, inferRouterContext } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { type TRPCErrorShape, TRPC_ERROR_CODES_BY_KEY, TRPC_ERROR_CODES_BY_NUMBER } from '@trpc/server/rpc';
import type { Context, Env } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';

export type ErrorFormatterOptions<T> = {
  error: TRPCError;
  type: ProcedureType | 'unknown';
  path: string | undefined;
  input: unknown;
  ctx: InjectedContext<T> | undefined;
  shape: DefaultErrorShape;
};

export const errorFormatter = <T>({
  error,
  input,
  shape,
}: ErrorFormatterOptions<InjectedContext<T>>): TRPCErrorShape => {
  console.log('Input:', input);
  return {
    ...shape,
    data: shape.data,
    message: error.message,
    code: TRPC_ERROR_CODES_BY_KEY.UNPROCESSABLE_CONTENT,
  };
};
