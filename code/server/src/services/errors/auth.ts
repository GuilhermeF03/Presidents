import { type ErrorData, UnauthorizedError } from '@/domain/errors';

export class PlayerNotHostError extends UnauthorizedError<ErrorData> {
  constructor(playerId: string, gameId: string) {
    const data = {
      prop: 'player',
      reason: `Player ${playerId} is not host of game ${gameId}`,
    };
    super(data, 'Player is not host of game');
  }
}
