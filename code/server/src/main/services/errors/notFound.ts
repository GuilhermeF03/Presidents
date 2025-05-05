import { type ErrorData, NotFoundError } from '@/main/domain/errors.ts';

export class PlayerNotInGameError extends NotFoundError<ErrorData> {
  constructor(playerId: string, gameId: string) {
    const data = {
      prop: 'player',
      reason: `Player ${playerId} is not in game ${gameId}`,
    };
    super(data, 'Player not in game');
  }
}
