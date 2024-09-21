import type { CoreRepo } from '@/repos/types';
import gameServices from './gameServices';

export const coreServices = (repo: CoreRepo) => ({
  game: gameServices(repo),
});

export type CoreServices = ReturnType<typeof coreServices>;
