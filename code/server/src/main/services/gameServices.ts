import { GAME_CONSTANTS } from '@/main/domain/GameConstants.ts';
import type { CoreRepo } from '@/main/repos/types.ts';
import * as BadRequestErrors from '@/main/services/errors/bad.ts';
import { PlayerAlreadyInGameError } from '@/main/services/errors/conflict.ts';
import type { GameServices } from '@/main/services/types.ts';
import { LinkedListNode } from '@core/model/LinkedList.ts';
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
    const { playerRepo, gameRepo } = repos;

    if (await playerRepo.playerInAnyGame(playerId)) throw new PlayerAlreadyInGameError();

    return await gameRepo.createGame(input);
  };

  /**
   * Joins a game, registers the player and returns the streamId
   * @param input
   */
  const joinGame: GameServices['joinGame'] = async input => {
    const { gameId, playerId, name, picture } = input;
    const { gameRepo, playerRepo } = repos;

    if (await playerRepo.playerInGame(input)) throw new PlayerAlreadyInGameError(gameId);

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new BadRequestErrors.InvalidGameStateError('PENDING');

    const playerNumber = playerCount(game);
    if (playerNumber === GAME_CONSTANTS.MAX_PLAYERS) throw new BadRequestErrors.GameFullError();

    const newPlayerNode: LinkedListNode<GamePlayerInfo> = new LinkedListNode({
      playerId,
      name,
      picture,
      hand: new Hand(),
    });

    game.players.append(newPlayerNode);

    await gameRepo.updateGame(gameId, game); //TODO: Implement this method in the gameRepo

    return streamServices.registerStream(playerId);
  };

  /**
   * Starts the game, shuffles the deck and deals cards to players, also sets up the game
   * @param input
   */
  const startGame: GameServices['startGame'] = async input => {
    const { gameId, playerId } = input;
    const { gameRepo, playerRepo } = repos;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new BadRequestErrors.InvalidGameStateError('PENDING');

    if (!(await playerRepo.isPlayerHost(input))) throw new PlayerNotHostError(playerId, gameId);

    const nPlayers = playerCount(game);
    if (nPlayers < GAME_CONSTANTS.MIN_PLAYERS)
      throw new BadRequestErrors.InvalidNumberOfPlayersError(nPlayers, 'Not enough players');

    const deck = new Deck();
    deck.shuffle();

    // Deal cards to players
    const players = game.players;

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

    // Set up the game - Get IDs of the players with the roles
    const presidentId = game.roles[Role.President];
    const scumId = game.roles[Role.Scum];
    const vicePresidentId = game.roles[Role.VicePresident];
    const viceScumId = game.roles[Role.ViceScum];

    // Swap cards between the president and scum
    if (presidentId && scumId) {
      const president = players.find(player => player.playerId === presidentId);
      const scum = players.find(player => player.playerId === scumId);

      if (president && scum) {
        const topScumCards: Card[] = scum.value.hand.getHighestCards(2);
        const worstPresidentCards: Card[] = president.value.hand.getLowestCards(2);

        Hand.swapCards(president.value.hand, scum.value.hand, worstPresidentCards, topScumCards);
      }
    }

    // Swap cards between the vice president and vice scum
    if (vicePresidentId && viceScumId) {
      const vicePresident = players.find(player => player.playerId === vicePresidentId);
      const viceScum = players.find(player => player.playerId === viceScumId);

      if (vicePresident && viceScum) {
        const topViceScumCards: Card[] = viceScum.value.hand.getHighestCards(1);
        const worstVicePresidentCards: Card[] = vicePresident.value.hand.getLowestCards(1);

        Hand.swapCards(vicePresident.value.hand, viceScum.value.hand, worstVicePresidentCards, topViceScumCards);
      }
    }

    gameRepo.updateGame(gameId, game); //TODO: Implement this method in the gameRepo
    await gameRepo.startGame(input);
  };

  const leaveGame: GameServices['leaveGame'] = async input => {
    const { gameRepo } = repos;
    await gameRepo.leaveGame(input);
    // TODO: Finish this method
  };

  return {
    createGame,
    joinGame,
    // In-game operations
    startGame,
    leaveGame,
  };
}
