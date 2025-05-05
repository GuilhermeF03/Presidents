import type { CardPipeline } from '@/main/pipeline.types.ts';
import type { CoreRepo } from '@/main/repos/types.ts';
import * as BadRequestErrors from '@/main/services/errors/bad.ts';
import type { CardServices, GameServices } from '@/main/services/types.ts';
import { ActiveGameState } from '@core/model/game/State.ts';
import type { Card, Hand } from '@core/model/game/card.ts';

export function cardServices(repos: CoreRepo): CardServices {
  const playCards: CardServices['playCards'] = async (input, ...cards) => {
    const { gameId, playerId } = input;
    const { gameRepo, playerRepo } = repos;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof ActiveGameState)) {
      throw new BadRequestErrors.InvalidGameStateError('ACTIVE');
    }

    const player = await playerRepo.getPlayerDetails(playerId);
    const hand = player.state.hand as Hand;

    for (const card of cards) {
      const errorCards: Card[] = [];
      if (!hand.includes(card)) {
        errorCards.push(card);
      }
      if (errorCards.length > 0) {
        throw new BadRequestErrors.InvalidCardError(errorCards);
      }
    }
    // Remove the cards from the player's hand
    player.state = {
      ...player.state,
      hand: hand.filter(c => !cards.includes(c)),
    };

    await gameRepo.updatePlayerHand(gameId, player);
    await gameRepo.putCardsOnPile(cards); // TODO: Implement this method in the gameRepo
  };

  return {
    playCards,
  };
}
