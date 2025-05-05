import { LOG_MODULE, getLogger } from '@/main/library/logging/logger.ts';
import memCardRepo from '@/main/repos/memory/memCardRepo.ts';
import { memGameRepo } from '@/main/repos/memory/memGameRepo.ts';
import { memPlayerRepo } from '@/main/repos/memory/memPlayerRepo.ts';
import type { CoreRepo } from '../types.ts';

export const memCore = (): CoreRepo => {
  const logger = getLogger(LOG_MODULE.REPO);
  return {
    gameRepo: memGameRepo(logger),
    playerRepo: memPlayerRepo(logger),
    cardRepo: memCardRepo(logger),
  };
};
