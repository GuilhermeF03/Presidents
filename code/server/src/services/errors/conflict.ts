import { ConflictError } from '@/domain/errors';
import type { Role } from '@core/model/game/State';

class PlayerAlreadyInGameError extends ConflictError {
  constructor(
    public gameId?: string,
    message?: string
  ) {
    super(message ?? `Player already in game ${gameId ? gameId : ''}`);
  }
}

class PlayerAlreadyFinishedError extends ConflictError {
  constructor(
    public role: Role,
    message?: string
  ) {
    super(message ?? `Player already finished as ${role}`);
  }
}

export { PlayerAlreadyFinishedError, PlayerAlreadyInGameError };
