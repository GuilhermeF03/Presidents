import { GAME_CONSTANTS } from '@/domain/GameConstants.ts';
import type { CoreRepo } from '@/repos/types';
import * as BadRequestErrors from '@/services/errors/bad';
import { PlayerAlreadyInGameError } from '@/services/errors/conflict';
import type { GameServices } from '@/services/types';
import { Deck } from '@core/model/game/Deck';
import type { Hand } from '@core/model/game/Player';
import { ActiveGameState, PendingGameState } from '@core/model/game/State';
import { range } from 'lodash';
import { v4 as uuid } from 'uuid';
import { PlayerNotHostError } from './errors/auth';
import { PlayerNotInGameError } from './errors/notFound';
import { streamServices } from './streamServices';
import { playerCount } from './utils';

export function gameServices(repos: CoreRepo): GameServices {
  const createGame: GameServices['createGame'] = async input => {
    const { playerId } = input;
    const { playerRepo, gameRepo } = repos;

    if (await playerRepo.playerInGame(playerId)) throw new PlayerAlreadyInGameError();

    const gameId = uuid();
    await gameRepo.createGame({ gameId, ...input });

    return gameId;
  };

  const joinGame: GameServices['joinGame'] = async input => {
    const { gameId, playerId } = input;
    const { gameRepo, playerRepo } = repos;

    if (await playerRepo.playerInGame(playerId)) throw new PlayerAlreadyInGameError(gameId);

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new BadRequestErrors.InvalidGameStateError('PENDING');

    const playerNumber = playerCount(game);
    if (playerNumber === GAME_CONSTANTS.MAX_PLAYERS) throw new BadRequestErrors.GameFullError();

    await gameRepo.addPlayer(input);
  };

  const enterGame: GameServices['enterGame'] = async input => {
    const { playerRepo } = repos;
    if (!playerRepo.playerInGame(input.playerId, input.gameId))
      throw new PlayerNotInGameError(input.playerId, input.gameId);

    if (streamServices.getStream(input.playerId)) throw new PlayerAlreadyInGameError(input.gameId);

    return streamServices.registerStream(input.playerId);
  };

  // In-game operations
  const startGame: GameServices['startGame'] = async input => {
    const { gameId, playerId } = input;
    const { gameRepo } = repos;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new BadRequestErrors.InvalidGameStateError('PENDING');

    if (!(await gameRepo.isPlayerHost(gameId, playerId))) throw new PlayerNotHostError(playerId, gameId);

    const nPlayers = playerCount(game);
    if (nPlayers < GAME_CONSTANTS.MIN_PLAYERS)
      throw new BadRequestErrors.InvalidNumberOfPlayersError(nPlayers, 'Not enough players');

    const deck = new Deck();
    deck.shuffle();

    // Deal cards to players
    const players = Object.values(game.players);

    for (const i of range(0, deck.cards.length)) {
      const card = deck.draw();
      if (!card) break;

      const hand = players[i % players.length].state as Hand;
      hand.cards.push(card);
    }

    for (const player of players) {
      await gameRepo.updatePlayer(gameId, player);
    }

    await gameRepo.startGame(input);
  };

  const leaveGame: GameServices['leaveGame'] = async input => {
    const { gameRepo } = repos;
    await gameRepo.leaveGame(input);
  };

  const playCard: GameServices['playCard'] = async input => {
    const { gameId, playerId, card } = input;
    const { gameRepo, playerRepo } = repos;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof ActiveGameState)) {
      throw new BadRequestErrors.InvalidGameStateError('ACTIVE');
    }

    const player = await playerRepo.getPlayerDetails(playerId);
    const hand = player.state as Hand;

    if (!hand.cards.includes(card)) {
      throw new BadRequestErrors.InvalidCardError(card);
    }

    const _newHand = hand.cards.filter(c => c !== card);

    return await gameRepo.playCard(input);
  };

  return {
    createGame,
    joinGame,
    enterGame,
    // In-game operations
    startGame,
    leaveGame,
    playCard,
  };
}
