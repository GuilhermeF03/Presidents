import BaseError from '@/model/Error';
import { TRPCError } from '@trpc/server';

const httpWrap = async <T extends any>(operation: () => Promise<T>) => {
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

export { httpWrap };
