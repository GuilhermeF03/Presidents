import type { CoreRepo } from '@data/repos/types.ts';
import * as BadRequestErrors from '@services/errors/bad.ts';
import type { CardServices } from '@services/types.ts';
import { ActiveGameState } from '@core/model/game/State.ts';
import { PlayerNotInGameError } from '@services/errors/notFound.ts';

export function cardServices(repos: CoreRepo): CardServices {
  const playCards: CardServices['playCards'] = async (input, ...cards) => {
    const { gameId, playerId} = input;
    const { gameRepo, playerRepo, cardRepo } = repos;

    if(!playerRepo.playerInGame(gameId, playerId)){
      throw new PlayerNotInGameError(playerId, gameId);
    }

    const game = await gameRepo.getGame(gameId);
    if (!(game instanceof ActiveGameState)) {
      throw new BadRequestErrors.InvalidGameStateError('ACTIVE');
    }
    await cardRepo.playCards(input, ...cards);
  };

  return {
    playCards
  };
}
