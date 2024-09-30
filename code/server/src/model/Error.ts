/**
 * BaseError class - must be extended by all module-specific errors such as ServerError, DatabaseError, etc.
 */
abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.cause = 'error';
  }
}

export default BaseError;
