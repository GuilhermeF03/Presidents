import type { CoreRepo } from '@/main/repos/types.ts';
import type { PlayerServices } from '@/main/services/types.ts';
import type { GamePlayerInfo } from '@core/model/game/player.ts';

export function playerServices(repos: CoreRepo): PlayerServices {
  const updateProfile: PlayerServices['updateProfile'] = async (gameId: string, details: GamePlayerInfo) => {
    const game = await repos.gameRepo.getGame(gameId);
    const player = game.players.find(p => p.playerId === details.playerId);
    if (!player) throw new Error('Player not found');
    player.value.name = details.name;
    player.value.picture = details.picture;
    await repos.gameRepo.updateGame(gameId, game);
  };

  const isPlayerHost: PlayerServices['isPlayerHost'] = async input => {
    const { gameId, playerId } = input;
    const game = await repos.gameRepo.getGame(gameId);
    return game.host === playerId;
  };

  const playerInAnyGame: PlayerServices['playerInAnyGame'] = async playerId => {
    return await repos.playerRepo.playerInAnyGame(playerId);
  };

  const playerInGame: PlayerServices['playerInGame'] = async input => {
    const { gameId, playerId } = input;
    return await repos.playerRepo.playerInGame(gameId, playerId);
  };

  const getPlayerDetails: PlayerServices['getPlayerDetails'] = async userId => {
    return await repos.playerRepo.getPlayerDetails(userId);
  };

  return {
    updateProfile,
    isPlayerHost,
    playerInAnyGame,
    playerInGame,
    getPlayerDetails,
  };
}
