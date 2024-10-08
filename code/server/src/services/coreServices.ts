import type { CoreRepo } from '@/repos/types';
import type { CoreServices } from '@/services/types';
import gameServices from './gameServices';

export const coreServices = (repo: CoreRepo): CoreServices => ({
  game: gameServices(repo.game),
});
