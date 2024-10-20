import type { GamePipeline } from '@/pipeline.types';
import type { GamePlayerInfo } from '@core/model/game/Player';
import type { GameState, Role } from '@core/model/game/State';
import type { GameProfileInput } from '@core/model/game/inputs';

export type CoreRepo = {
  gameRepo: GameRepo;
  playerRepo: PlayerRepo;
};

export type GameRepo = Omit<GamePipeline, 'enterGame' | 'createGame'> & {
  createGame: (input: GameProfileInput) => Promise<void>;
  getGame: (gameId: string) => Promise<GameState>;
  deleteGame: (gameId: string) => Promise<void>;

  addPlayer: (input: GameProfileInput) => Promise<void>;
  updatePlayer: (gameId: string, details: GamePlayerInfo) => Promise<void>;
  isPlayerHost: (gameId: string, playerId: string) => Promise<boolean>;
};

export type PlayerRepo = {
  playerInGame: (playerId: string, gameId?: string) => Promise<boolean>;
  getPlayerDetails: (userId: string) => Promise<GamePlayerInfo>;
  playerHasRole(playerId: string, role: Role): Promise<boolean>;
};
