import type { GameState, Role } from '@core/model/game/State.ts';
import type { GamePlayerInfo, Profile } from '@core/model/game/player.ts';
import type { GamePlayerTuple, JoinGameInfo } from '@core/model/game/game.ts';
import type { Card } from '@core/model/game/card.ts';

export type CoreRepo = {
  gameRepo: GameRepoType;
};

export type GameRepoType = {
  // Game CRUD operations
  createGame: (profile: Profile) => Promise<string>;
  getGame: (gameId: string) => Promise<GameState>;
  updateGame: (gameId: string, gameState: GameState) => Promise<void>;
  leaveGame: (input: GamePlayerTuple) => Promise<void>;

  joinGame: (input : JoinGameInfo) => Promise<void>;
  startGame: (gameId: string) => Promise<void>;

  // Player CRUD operations
  addPlayer: (gameId: string, profile: Profile) => Promise<void>;
  getPlayerDetails: (userId: string) => Promise<GamePlayerInfo>;
  updatePlayer: (gameId: string, playerId: string, profile: Profile) => Promise<void>;
  removePlayer: (gameId: string, playerId: string) => Promise<void>;

  // Player validation
  playerInGame: (gameId: string, playerId: string) => Promise<boolean>;
  playerInAnyGame: (playerId: string) => Promise<boolean>;
  isGameHost: (gameId: string, playerId: string) => Promise<boolean>;
};
