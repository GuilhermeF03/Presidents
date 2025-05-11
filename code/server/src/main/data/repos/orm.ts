import { MikroORM } from '@mikro-orm/core';
import config from '@/mikro-orm.config.ts';

const orm = await MikroORM.init(config)
const getEm = () => orm.em.fork();

export const OrmUtils = {
  getEm,
  orm,
}