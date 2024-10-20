import { ConflictError, type ErrorData } from '@/domain/errors';
import type { Role } from '@core/model/game/State';

export class PlayerAlreadyInGameError extends ConflictError<ErrorData> {
  constructor(gameId?: string) {
    const data = {
      prop: 'gameId',
      reason: `Player already in game ${gameId ? gameId : ''}.`,
    };
    super(data, 'Player already in game');
  }
}

export class PlayerAlreadyFinishedError extends ConflictError<ErrorData> {
  constructor(role: Role) {
    const data = {
      prop: 'role',
      reason: `Player already finished as ${role}`,
    };
    super(data, 'Player already finished');
  }
}
