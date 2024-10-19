import type { CorePipeline, GamePipeline } from '@/pipeline.types';
import type { GamePlayerInfo, Profile } from '@core/model/game/Player';
import type { GameState, Role } from '@core/model/game/State';
import type { GameProfileInput } from '@core/model/game/inputs';
import type { Override } from '@core/utils';

export type CoreRepo = {
  gameRepo: GameRepo;
  playerRepo: PlayerRepo;
};

export type GameRepo = Omit<GamePipeline, 'enterGame' | 'createGame'> & {
  getGame: (gameId: string) => Promise<GameState>;
  addPlayerToGame: (input: GameProfileInput) => Promise<void>;
  updatePlayer: (gameId: string, details: GamePlayerInfo) => Promise<void>;
  createGame: (input: GameProfileInput) => Promise<void>;
  playerIsHost: (gameId: string, playerId: string) => Promise<boolean>;
};

export type PlayerRepo = {
  getPlayer: (userId: string) => Promise<Profile>;
  getPlayerDetails: (userId: string) => Promise<GamePlayerInfo>;
  playerHasRole(playerId: string, role: Role): Promise<boolean>;
};
