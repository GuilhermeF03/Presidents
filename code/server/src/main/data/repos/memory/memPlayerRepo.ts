import memUtils from '@data/repos/memory/memUtils.ts';
import type { PendingGameState } from '@core/model/game/State.ts';
import type { Profile } from '@core/model/game/player.ts';
import type { Logger } from 'winston';
import { PlayerNotFoundError } from '../errors/notFound.ts';
import type { GameRepo, PlayerRepo } from '../types.ts';
import { isRole, newPlayer } from '../utils.ts';
import { memData } from './data.ts';

export const memPlayerRepo = (logger: Logger): PlayerRepo => {
  const { games } = memData;

  const addPlayer: PlayerRepo['addPlayer'] = async (gameId, profile) => {
    const game = (await memUtils.getGame(gameId)) as PendingGameState;
    game.players.append(newPlayer(profile))
  };

  const getPlayerDetails: PlayerRepo['getPlayerDetails'] = async userId => {
    for (const gameId in games) {
      const game = games[gameId];
      const player = game.players[userId];
      if (player) {
        return player;
      }
    }
    throw new PlayerNotFoundError(userId);
  };

  const updatePlayer: PlayerRepo['updatePlayer'] = async (gameId, details) => {
    const game = await memUtils.getGame(gameId);
    game.players[details.playerId] = details;
  };

  const isPlayerHost: PlayerRepo['isPlayerHost'] = async _input => {
    throw new Error('Not implemented yet!!');
  };

  const playerHasRole: PlayerRepo['playerHasRole'] = async input => {
    const { playerId, role } = input;
    const { state } = await getPlayerDetails(playerId);
    return isRole(state) && state === role;
  };

  const playerInGame: PlayerRepo['playerInGame'] = async input => {
    const { gameId, playerId } = input;
    if (gameId) {
      const game = games[gameId];
      return !!game.players[playerId];
    }
    for (const gameId in games) {
      const game = games[gameId];
      if (game.players[playerId]) {
        return true;
      }
    }
    return false;
  };

  return {
    addPlayer,
    updatePlayer,
    isPlayerHost,
    getPlayerDetails,
    playerInGame,
    playerHasRole,
  };
};
