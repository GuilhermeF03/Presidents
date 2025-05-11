import type { ActiveGameState, GameState } from '@core/model/game/State.ts';
import type { Card } from '@core/model/game/card.ts';

function playerCount(game: GameState) {
  return game.players.length
}

export { playerCount };
