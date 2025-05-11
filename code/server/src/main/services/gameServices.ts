import { GAME_CONSTANTS } from '@/main/domain/GameConstants.ts';
import type { CoreRepo } from '@data/repos/types.ts';
import * as BadRequestErrors from '@services//errors/bad.ts';
import { PlayerAlreadyInGameError } from '@services//errors/conflict.ts';
import type { GameServices } from '@services//types.ts';
import type { LinkedList } from '@core/model/LinkedList.ts';
import { Deck } from '@core/model/game/Deck.ts';
import { Hand } from '@core/model/game/Hand.ts';
import { PendingGameState, Role } from '@core/model/game/State.ts';
import type { Card } from '@core/model/game/card.ts';
import type { GamePlayerInfo } from '@core/model/game/player.ts';
import { range } from 'lodash';
import { PlayerNotHostError } from './errors/auth.ts';
import { streamServices } from './streamServices.ts';
import { playerCount } from './utils.ts';

export function gameServices(repos: CoreRepo): GameServices {
  /**
   * Creates a game, registers the player as host and returns the gameId
   * @param input
   */
  const createGame: GameServices['createGame'] = async input => {
    const { playerId } = input;
    const { gameRepo } = repos;

    if (await gameRepo.playerInAnyGame(playerId)) throw new PlayerAlreadyInGameError();

    return {
      id: await gameRepo.createGame(input),
      stream: streamServices.registerStream(playerId),
    }
  };

  /**
   * Joins a game, registers the player and returns the streamId
   * @param input
   */
  const joinGame: GameServices['joinGame'] = async input => {
    const { gameId, playerId, name, picture } = input;
    const { gameRepo } = repos;

    if (await gameRepo.playerInGame(gameId, playerId))
      throw new PlayerAlreadyInGameError(gameId);

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState))
      throw new BadRequestErrors.InvalidGameStateError('PENDING');

    const playerNumber = playerCount(game);
    if (playerNumber === GAME_CONSTANTS.MAX_PLAYERS)
      throw new BadRequestErrors.GameFullError();

    // DB operations
    await gameRepo.addPlayer(gameId, {playerId, name, picture});
    await gameRepo.updateGame(gameId, game); //TODO: Implement this method in the gameRepo

    return streamServices.registerStream(playerId);
  };

  /**
   * Starts the game, shuffles the deck and deals cards to players, also sets up the game
   * @param input
   */
  const startGame: GameServices['startGame'] = async input => {
    const { gameId, playerId } = input;
    const { gameRepo } = repos;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new BadRequestErrors.InvalidGameStateError('PENDING');

    if (!(await gameRepo.isGameHost(gameId, playerId)))
      throw new PlayerNotHostError(playerId, gameId);

    const nPlayers = playerCount(game);
    if (nPlayers < GAME_CONSTANTS.MIN_PLAYERS)
      throw new BadRequestErrors.InvalidNumberOfPlayersError(nPlayers, 'Not enough players');

    const deck = new Deck();
    deck.shuffle();

    // Deal cards to players
    dealCards(deck, game.players);
    swapCards(game);


    await gameRepo.updateGame(gameId, game);
    await gameRepo.startGame(input.gameId);
  };

  const leaveGame: GameServices['leaveGame'] = async input => {
    const { gameRepo } = repos;
    await gameRepo.leaveGame(input);
  };

  const dealCards: (deck: Deck, players: LinkedList<GamePlayerInfo>) => void = (deck, players) => {
    for (const i of range(0, deck.cards.length)) {
      const card = deck.draw();
      if (!card) break;

      const currPlayer = players.get(i % players.length);
      if (!currPlayer) break;
      const hand = currPlayer.value.hand;
      hand.addCard(card);

      // Update the player's hand
      currPlayer.value.hand = hand;
    }
  }

  const swapCards: (game : PendingGameState) => void = (game) => {
    const presidentId = game.roles[Role.President];
    const scumId = game.roles[Role.Scum];
    const vicePresidentId = game.roles[Role.VicePresident];
    const viceScumId = game.roles[Role.ViceScum];

    const players = game.players;

    if (presidentId && scumId) {
      const president = players.find(player => player.playerId === presidentId);
      const scum = players.find(player => player.playerId === scumId);

      if (president && scum) {
        const topScumCards: Card[] = scum.value.hand.getHighestCards(2);
        const worstPresidentCards: Card[] = president.value.hand.getLowestCards(2);

        Hand.swapCards(president.value.hand, scum.value.hand, worstPresidentCards, topScumCards);
      }
    }

    if (vicePresidentId && viceScumId) {
      const vicePresident = players.find(player => player.playerId === vicePresidentId);
      const viceScum = players.find(player => player.playerId === viceScumId);

      if (vicePresident && viceScum) {
        const topViceScumCards: Card[] = viceScum.value.hand.getHighestCards(1);
        const worstVicePresidentCards: Card[] = vicePresident.value.hand.getLowestCards(1);

        Hand.swapCards(vicePresident.value.hand, viceScum.value.hand, worstVicePresidentCards, topViceScumCards);
      }
    }
  }

  return {
    createGame,
    joinGame,
    // In-game operations
    startGame,
    leaveGame,
  };
}
