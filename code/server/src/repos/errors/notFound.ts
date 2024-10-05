import { NotFoundError } from '@/domain/errors';

export class GameNotFoundError extends NotFoundError {
  constructor(
    public gameId: string,
    message?: string
  ) {
    super(message ?? `Game ${gameId} not found`);
  }
}

export class PlayerNotFoundError extends NotFoundError {
  constructor(
    public playerId: string,
    message?: string
  ) {
    super(message ?? `Player ${playerId} not found`);
  }
}
