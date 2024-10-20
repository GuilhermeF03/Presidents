import type { Profile } from '@core/model/game/Player';
import { PlayerNotFoundError } from '../errors/notFound';
import type { PlayerRepo } from '../types';
import { isRole } from '../utils';
import { memData } from './data';

export const memPlayer = (): PlayerRepo => {
  const { games } = memData;

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

  const getPlayer: PlayerRepo['getPlayer'] = async (userId: string) => (await getPlayerDetails(userId)) as Profile;

  const playerHasRole: PlayerRepo['playerHasRole'] = async (playerId, role) => {
    const { state } = await getPlayerDetails(playerId);
    return isRole(state) && state === role;
  };

  return {
    getPlayerDetails,
    getPlayer,
    playerHasRole,
  };
};
