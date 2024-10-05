import { UnauthorizedError } from '@/domain/errors';

class PlayerNotHostError extends UnauthorizedError {
  constructor(
    public playerId: string,
    public gameId: string,
    message?: string
  ) {
    super(message ?? `Player ${playerId} is not host of game ${gameId}`);
  }
}

export { PlayerNotHostError };
