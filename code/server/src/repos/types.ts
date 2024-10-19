import type { CorePipeline, GamePipeline } from '@/pipeline.types';
import type { GamePlayerInfo, Profile } from '@core/model/game/Player';
import type { GameState, Role } from '@core/model/game/State';
import type { GameProfileInput } from '@core/model/game/inputs';
import type { Override } from '@core/utils';

export type CoreRepo = Override<
  CorePipeline,
  {
    game: GameRepo;
  }
>;

export type GameRepo = Omit<GamePipeline, 'enterGame' | 'createGame'> & {
  // Validation methods
  getPlayer: (userId: string) => Promise<Profile>;
  getPlayerDetails: (userId: string) => Promise<GamePlayerInfo>;
  updatePlayer: (gameId: string, details: GamePlayerInfo) => Promise<void>;

  playerHasRole(playerId: string, role: Role): Promise<boolean>;
  playerIsHost: (gameId: string, playerId: string) => Promise<boolean>;

  getGame: (gameId: string) => Promise<GameState>;
  addPlayerToGame: (input: GameProfileInput) => Promise<void>;
  createGame: (input: GameProfileInput) => Promise<void>;
};
