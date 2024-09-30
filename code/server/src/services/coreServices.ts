import type { CoreRepo } from '@/repos/types';
import type { CorePipeline } from '../pipeline.types';
import gameServices from './gameServices';

export interface CoreServices extends CorePipeline {}

export const coreServices = (repo: CoreRepo): CoreServices => ({
  game: gameServices(repo.game),
});
