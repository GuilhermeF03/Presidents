import type { CardRepo } from '@data/repos/types.ts';
import type { Logger } from 'winston';
import { memData } from '@data/repos/memory/data.ts';
import { ActiveGameState } from '@core/model/game/State.ts';

const memCardRepo = (logger: Logger) => {
  const { games } = memData;

  const playCards: CardRepo['playCards'] = async (input, ...cards) => {
    const { gameId, playerId } = input;
    const game = games[gameId];
    // Check if the game is an instance of ActiveGameState

    if (!(game instanceof ActiveGameState)) {
      logger.error(`Game ${gameId} is not in an active state`);
      throw new Error(`Game ${gameId} is not in an active state`);
    }

    const player = game.players.find(player => player.playerId === playerId);
    if (!player) {
      logger.error(`Player ${playerId} not found in game ${gameId}`);
      throw new Error(`Player ${playerId} not found in game ${gameId}`);
    }

    // Logic to play cards,
    // For example, remove cards from the player's hand and add to the game board
    for (const card of cards){
      player.value.hand.removeCard(card)
    }
    game.pile.push(...cards)
  }
  return {
    playCards,
  };
};

export default memCardRepo;
