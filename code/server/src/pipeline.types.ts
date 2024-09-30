import type { GameOpInput, GameProfileOpInput, PlayCardInput, PlayerOpInput } from '@core/models/game/Input';
import type { Profile } from '@core/models/game/Player';

export type CorePipeline = {
  game: GamePipeline;
};

export type GamePipeline = {
  create: (input: Profile) => Promise<string>;
  join: (input: GameProfileOpInput) => Promise<void>;
  leave: (input: GameOpInput) => Promise<void>;
  start: (input: GameOpInput) => Promise<void>;
  play: (input: PlayCardInput) => Promise<void>;
};
