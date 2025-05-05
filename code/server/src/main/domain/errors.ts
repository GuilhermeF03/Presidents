import { TRPCError } from '@trpc/server';

export type ErrorData<T = unknown> = {
  prop: string;
  reason: T;
};

export abstract class BaseError<T extends ErrorData> extends TRPCError {
  constructor(
    message: string,
    code: TRPCError['code'],
    readonly data: T
  ) {
    super({
      code: code || 'INTERNAL_SERVER_ERROR',
      message,
      cause: data,
    });
  }
}

export class UnauthorizedError<T extends ErrorData> extends BaseError<T> {
  constructor(data: T, message?: string) {
    super(message ?? 'Unauthorized user', 'UNAUTHORIZED', data);
  }
}

export class ForbiddenError<T extends ErrorData> extends BaseError<T> {
  constructor(data: T, message?: string) {
    super(message ?? 'Forbidden', 'FORBIDDEN', data);
  }
}

export class BadRequestError<T extends ErrorData> extends BaseError<T> {
  constructor(data: T, message?: string) {
    super(message ?? 'Bad request', 'BAD_REQUEST', data);
  }
}

export class ConflictError<T extends ErrorData> extends BaseError<T> {
  constructor(data: T, message?: string) {
    super(message ?? 'Conflict', 'CONFLICT', data);
  }
}

export class NotFoundError<T extends ErrorData> extends BaseError<T> {
  constructor(data: T, message?: string) {
    super(message ?? 'Not found', 'NOT_FOUND', data);
  }
}
