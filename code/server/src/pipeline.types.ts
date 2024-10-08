import type { Profile } from '@core/model/game/Player';
import type { GameInput, GameProfileInput, PlayCardInput } from '@core/model/game/inputs';

export interface CorePipeline {
  game: GamePipeline;
}

export interface GamePipeline {
  createGame: (input: Profile) => Promise<string>;
  joinGame: (input: GameProfileInput) => Promise<void>;
  leaveGame: (input: GameInput) => Promise<void>;
  startGame: (input: GameInput) => Promise<void>;
  playCard: (input: PlayCardInput) => Promise<void>;
}
