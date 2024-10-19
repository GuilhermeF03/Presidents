import type { CorePipeline, GamePipeline } from '@/pipeline.types';
import type { GameInput } from '@core/model/game/inputs';
import type { Override } from '@core/utils';
import type { StreamServices } from './streamServices';

export type CoreServices = Override<
  CorePipeline,
  {
    game: GameServices;
    stream: StreamServices;
  }
>;

export type GameServices = GamePipeline & {
  playerIsInGame: (input: GameInput) => Promise<boolean>;
};
