import type { CoreRepo } from '@/main/repos/types.ts';
import { cardServices } from '@/main/services/cardServices.ts';
import { playerServices } from '@/main/services/playerServices.ts';
import type { CoreServices } from '@/main/services/types.ts';
import { gameServices } from './gameServices.ts';
import { streamServices } from './streamServices.ts';

export const coreServices = (repo: CoreRepo): CoreServices => ({
  game: gameServices(repo),
  player: playerServices(repo),
  card: cardServices(repo),
  stream: streamServices,
});
