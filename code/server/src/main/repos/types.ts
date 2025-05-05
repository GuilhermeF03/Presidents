import type { CardServices, GameServices, PlayerServices } from '@/main/services/types.ts';
import type { GameState, Role } from '@core/model/game/State.ts';
import type { GamePlayerInfo, Profile } from '@core/model/game/player.ts';

export type CoreRepo = {
  gameRepo: GameRepo;
  cardRepo: CardRepo;
  playerRepo: PlayerRepo;
};

export type GameRepo = Omit<GameServices, 'enterGame'> & {
  getGame: (gameId: string) => Promise<GameState>;
  updateGame: (gameId: string, gameState: GameState) => Promise<void>;
};

export type PlayerRepo = Omit<PlayerServices, 'getPlayerDetails'> & {
  getPlayerDetails: (userId: string) => Promise<GamePlayerInfo>;
  playerInAnyGame: (playerId: string) => Promise<boolean>;
  playerInGame: (gameId: string, playerId: string) => Promise<boolean>;
};

export type CardRepo = CardServices;
