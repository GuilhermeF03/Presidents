import { BadRequestError } from '@/controllers/ControllerError';
import { GAME_CONSTANTS } from '@/domain/GameConstants.ts';
import type { GameState } from '@core/model/game/State';

class InvalidGameStateError extends BadRequestError {
  constructor(
    public invalidState?: GameState['state'],
    message?: string
  ) {
    super(message ?? `Invalid game state ${invalidState ? `: ${invalidState}` : ''}`);
  }
}

class InvalidNumberOfPlayersError extends BadRequestError {
  minPlayers: number;
  maxPlayers: number;

  constructor(message?: string) {
    super(message ?? 'Invalid number of players');
    this.minPlayers = GAME_CONSTANTS.MIN_PLAYERS;
    this.maxPlayers = GAME_CONSTANTS.MAX_PLAYERS;
  }
}

export { InvalidNumberOfPlayersError, InvalidGameStateError };
