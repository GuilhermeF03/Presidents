import type { GameState } from '@core/model/game/State';

function playerCount(game: GameState) {
  return Object.keys(game.players).length;
}

export { playerCount };
