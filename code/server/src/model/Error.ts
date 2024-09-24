abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.cause = 'error';
  }
}

export default BaseError;
