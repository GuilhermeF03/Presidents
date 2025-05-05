import type { GameState } from '@core/model/game/State.ts';

function playerCount(game: GameState) {
  return Object.keys(game.players).length;
}

export { playerCount };
