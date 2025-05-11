import type { CoreRepo } from '@data/repos/types.ts';
import { cardServices } from '@services//cardServices.ts';
import { playerServices } from '@services//playerServices.ts';
import type { CoreServices } from '@services//types.ts';
import { gameServices } from './gameServices.ts';
import { streamServices } from './streamServices.ts';
import { GameRepo } from '@data/repos/GameRepo.ts';
import { OrmUtils } from '@data/repos/orm.ts';
import { GameEntity } from '@data/entities/GameEntity.ts';

export const coreServices = (): CoreServices => {
  const repo: GameRepo = new GameRepo(OrmUtils.getEm(), GameEntity)

  const coreRepo: CoreRepo = {
    gameRepo: repo,
  }

  return {
    game: gameServices(coreRepo),
    player: playerServices(coreRepo),
    card: cardServices(coreRepo),
    stream: streamServices,
  }
}
