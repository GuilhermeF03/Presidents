import type { InjectedContext } from '@/main/trpc/trpc.ts';
import type { DefaultErrorShape, ProcedureType, TRPCError } from '@trpc/server';
import { type TRPCErrorShape, TRPC_ERROR_CODES_BY_KEY } from '@trpc/server/rpc';

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
