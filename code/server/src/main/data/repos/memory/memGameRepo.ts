import type { PendingGameState } from '@core/model/game/State.ts';
import { v4 as uuid } from 'uuid';
import type { Logger } from 'winston';
import { GameNotFoundError } from '../errors/notFound.ts';
import type { GameRepo } from '../types.ts';
import { newActiveGame, newPendingGame, newPlayer } from '../utils.ts';
import { memData } from './data.ts';

export const memGameRepo = (logger: Logger): GameRepo => {
  const { games } = memData;

  const createGame: GameRepo['createGame'] = async input => {
    const gameId = uuid();

    games[gameId] = newPendingGame(gameId, input);
    return gameId;
  };

  const getGame: GameRepo['getGame'] = async (gameId: string) => {
    const game = games[gameId];
    if (!game) throw new GameNotFoundError(gameId);

    return game;
  };

  const joinGame: GameRepo['joinGame'] = async input => {
    const { gameId, ...profile } = input;
    const game = (await getGame(gameId)) as PendingGameState;

    const newPlayerNode = newPlayer(profile)

    game.players.append(newPlayerNode)
  };

  const updateGame: GameRepo['updateGame'] = async (gameId, gameState) => {
    const game = await getGame(gameId);
    Object.assign(game, gameState);
  }

  const leaveGame: GameRepo['leaveGame'] = async ({gameId, playerId}) => {
    const game = await getGame(gameId);
    const node = game.players.find(player => player.playerId === playerId);
    if (node) {
      game.players.remove(node);
    } else {
      logger.warn(`Player ${playerId} not found in game ${gameId}`);
    }
  };

  const startGame: GameRepo['startGame'] = async (gameId) => {
    const game = (await getGame(gameId)) as PendingGameState;
    Object.assign(game, newActiveGame(game));
  };

  return {
    getGame,
    createGame,
    updateGame,
    joinGame,
    leaveGame,
    startGame,
  };
};
