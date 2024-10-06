import { TRPCError } from '@trpc/server';

/**
 * BaseError class - must be extended by all module-specific errors such as ServerError, DatabaseError, etc.
 */
export abstract class BaseError extends TRPCError {
  constructor(message: string, code?: TRPCError['code']) {
    super({
      code: code || 'INTERNAL_SERVER_ERROR',
      message,
    });
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Unauthorized user', 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Forbidden', 'FORBIDDEN');
  }
}

export class BadRequestError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Bad request', 'BAD_REQUEST');
  }
}

export class ConflictError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Conflict', 'CONFLICT');
  }
}

export class NotFoundError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Not found', 'NOT_FOUND');
  }
}
