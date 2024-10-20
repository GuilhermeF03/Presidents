import { GAME_CONSTANTS } from '@/domain/GameConstants.ts';
import { BadRequestError, type ErrorData } from '@/domain/errors';
import type { Card } from '@core/model/game/card';

type State = 'PENDING' | 'ACTIVE' | 'FINISHED';
export class InvalidGameStateError extends BadRequestError<ErrorData> {
  constructor(expectedState: State) {
    const data = {
      prop: 'gameState',
      reason: `Expected ${expectedState}, got other instead.`,
    };
    super(data, 'Invalid game state.');
  }
}

export class GameFullError extends BadRequestError<ErrorData> {
  constructor() {
    const data = {
      prop: 'game',
      reason: 'Game is full',
    };
    super(data, 'Game is full');
  }
}

type InvalidNumberOfPlayersErrorData = ErrorData<{
  minPlayers: number;
  maxPlayers: number;
  actualPlayers: number;
}>;
export class InvalidNumberOfPlayersError extends BadRequestError<InvalidNumberOfPlayersErrorData> {
  constructor(actualPlayers: number, message?: string) {
    const data = {
      prop: 'players',
      reason: {
        minPlayers: GAME_CONSTANTS.MIN_PLAYERS,
        maxPlayers: GAME_CONSTANTS.MAX_PLAYERS,
        actualPlayers,
      },
    };
    super(data, message ?? 'Invalid number of players.');
  }
}

type InvalidCardErrorData = ErrorData<Card>;
export class InvalidCardError extends BadRequestError<InvalidCardErrorData> {
  constructor(card: Card) {
    const data = {
      prop: 'card',
      reason: card,
    };
    super(data, 'Invalid card');
  }
}
