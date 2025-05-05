import type { ActiveGameState, PendingGameState } from '@core/model/game/State.ts';
import type { Hand } from '@core/model/game/player.ts';
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
    const { gameId, playerId } = input;
    const game = (await getGame(gameId)) as PendingGameState;
    game.players[playerId] = newPlayer(input);
  };

  const leaveGame: GameRepo['leaveGame'] = async input => {
    const { gameId, playerId } = input;
    const game = await getGame(gameId);
    delete game.players[playerId];
  };

  const startGame: GameRepo['startGame'] = async input => {
    const { gameId } = input;
    const game = (await getGame(gameId)) as PendingGameState;
    games[gameId] = newActiveGame(game);
  };

  return {
    getGame,
    createGame,
    joinGame,
    leaveGame,
    startGame,
  };
};
