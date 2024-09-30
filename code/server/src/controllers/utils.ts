import BaseError from '@/model/Error';
import { TRPCError } from '@trpc/server';

/**
 * Wrap an HTTP request with error handling
 * @param operation  The operation to perform
 * @returns The result of the operation or an error
 */
const wrapHttpRequest = async <T>(operation: () => Promise<T>) => {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof BaseError) {
    } else {
      return new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      });
    }
  }
};

export { wrapHttpRequest };
