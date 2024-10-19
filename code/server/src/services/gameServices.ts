import { GAME_CONSTANTS } from '@/domain/GameConstants.ts';
import type { CoreRepo } from '@/repos/types';
import { InvalidGameStateError, InvalidNumberOfPlayersError } from '@/services/errors/bad';
import { PlayerAlreadyInGameError } from '@/services/errors/conflict';
import type { GameServices } from '@/services/types';
import { Deck } from '@core/model/game/Deck';
import type { Hand } from '@core/model/game/Player';
import { ActiveGameState, PendingGameState } from '@core/model/game/State';
import { range } from 'lodash';
import { v4 as uuid } from 'uuid';
import { PlayerNotHostError } from './errors/auth';
import { streamServices } from './streamServices';
import { playerCount } from './utils';

export function gameServices(repos: CoreRepo): GameServices {
  const createGame: GameServices['createGame'] = async input => {
    const { playerId } = input;
    const { playerRepo, gameRepo } = repos;

    if (await playerRepo.getPlayer(playerId)) throw new PlayerAlreadyInGameError();

    const gameId = uuid();
    await gameRepo.createGame({ gameId, ...input });

    return gameId;
  };

  const joinGame: GameServices['joinGame'] = async input => {
    const { gameId, playerId } = input;
    const { gameRepo, playerRepo } = repos;

    if (await playerRepo.getPlayer(playerId)) throw new PlayerAlreadyInGameError(gameId);

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new InvalidGameStateError('PENDING');

    if (playerCount(game) === GAME_CONSTANTS.MAX_PLAYERS) throw new InvalidNumberOfPlayersError('Game is full');

    await gameRepo.addPlayerToGame(input);
  };

  const enterGame: GameServices['enterGame'] = async input => {
    return streamServices.registerStream(input.playerId);
  };

  // In-game operations

  const startGame: GameServices['startGame'] = async input => {
    const { gameId, playerId } = input;
    const { playerRepo, gameRepo } = repos;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new InvalidGameStateError('PENDING');

    if (!(await playerRepo.playerIsHost(gameId, playerId))) throw new PlayerNotHostError(playerId, gameId);

    if (playerCount(game) < GAME_CONSTANTS.MIN_PLAYERS) throw new InvalidNumberOfPlayersError('Not enough players');

    const deck = new Deck();
    deck.shuffle();

    // Deal cards to players
    const player = Object.values(game.players);

    for (const i of range(0, deck.cards.length)) {
      const card = deck.draw();
      if (!card) break;
      (player[i % player.length].state as Hand).cards.push(card);
    }

    for (const entry of player) await gameRepo.updatePlayer(gameId, entry);

    await gameRepo.startGame(input);
  };

  const leaveGame: GameServices['leaveGame'] = async input => {
    const { gameRepo } = repos;
    await gameRepo.leaveGame(input);
  };

  const playCard: GameServices['playCard'] = async input => {
    const { gameId } = input;
    const { gameRepo } = repos;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof ActiveGameState)) throw new InvalidGameStateError();

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
