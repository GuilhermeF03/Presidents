import type { CorePipeline, GamePipeline } from '@/pipeline.types';
import type { Override } from '@core/utils';
import type { StreamServices } from './streamServices';

export type CoreServices = Override<
  CorePipeline,
  {
    game: GameServices;
    stream: StreamServices;
  }
>;

export type GameServices = GamePipeline;
