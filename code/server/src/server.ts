import { trpcServer } from '@hono/trpc-server';
import { Hono, type MiddlewareHandler } from 'hono';
import { cors } from 'hono/cors';
import { config } from './config.ts';
import { rootRouter } from './controllers/rootRouter.ts';
import { memCore } from './repos/memory/memCoreRepo.ts';
import type { CoreRepo } from './repos/types';
import { coreServices } from './services/coreServices.ts';
import type { CoreServices } from './services/types';
import { trpcContext } from './trpc/trpc.ts';

// Configure deployment based on cli args
const args = Bun.argv;
console.log('args', args);

// Setup services
const db: CoreRepo = memCore();
const services: CoreServices = coreServices(db);

// Setup middleware
const logMiddleWare: MiddlewareHandler = async (c, next) => {
  const { req } = c;
  console.log('⬅️ ', req.method, req.path, c.body ?? req.query, JSON.stringify(c, null, 2));
  await next();
};

const trpcMiddleware: MiddlewareHandler = trpcServer({
  router: rootRouter,
  endpoint: '/',
  createContext: trpcContext(services),
});

// Config server
const app = new Hono();

app.use('/*', cors(config.SERVER_OPTIONS.cors));
app.use('/*', logMiddleWare);
app.use('/*', trpcMiddleware);

export default {
  port: config.PORT,
  fetch: app.fetch,
};
