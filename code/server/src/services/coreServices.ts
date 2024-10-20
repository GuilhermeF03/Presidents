import type { CoreRepo } from '@/repos/types';
import type { CoreServices } from '@/services/types';
import { gameServices } from './gameServices';
import { streamServices } from './streamServices';

export const coreServices = (repo: CoreRepo): CoreServices => ({
  game: gameServices(repo),
  stream: streamServices,
});
