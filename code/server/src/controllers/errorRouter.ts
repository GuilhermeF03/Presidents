import { type AnyRouter, type ProcedureType, TRPCError, type inferRouterContext } from '@trpc/server';

type ErrorHandlerFunction<TRouter extends AnyRouter, TRequest> = (opts: {
  error: TRPCError;
  type: ProcedureType | 'unknown';
  path: string | undefined;
  req: TRequest;
  input: unknown;
  ctx: inferRouterContext<TRouter> | undefined;
}) => void;

export const errorHandler: ErrorHandlerFunction<AnyRouter, Request> = async ({ error }) => {
  console.error('An error occurred:', error);
  // Handle the error
  throw error;
};
