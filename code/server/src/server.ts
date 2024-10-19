import { trpcServer } from '@hono/trpc-server';
import { serve } from 'bun';
import { Hono, type MiddlewareHandler } from 'hono';
import { cors } from 'hono/cors';
import { config } from './config.ts';
import { errorHandler } from './controllers/errorRouter.ts';
import { rootRouter } from './controllers/rootRouter.ts';
import { memCore } from './repos/memory/memCoreRepo.ts';
import type { CoreRepo } from './repos/types';
import { coreServices } from './services/coreServices.ts';
import type { CoreServices } from './services/types';
import { trpcContext } from './trpc.ts';

async function main() {
  // parse arguments
  const args = Bun.argv;

  console.log('args', args);

  // setup dependencies
  const db: CoreRepo = memCore();
  const services: CoreServices = coreServices(db);

  // setup middlewares
  const logMiddleWare: MiddlewareHandler = async (c, next) => {
    const { req } = c;
    console.log('⬅️ ', req.method, req.path, c.body ?? req.query, JSON.stringify(c, null, 2));
    await next();
  };

  // setup TRPC
  const context = trpcContext(services);
  const trpcMiddleware: MiddlewareHandler = trpcServer({
    onError: errorHandler,
    router: rootRouter,
    createContext: context,
  });

  const app = new Hono();

  app.use(cors(config.SERVER_OPTIONS.cors));
  app.use(logMiddleWare);
  app.use('/trpc/*', trpcMiddleware);

  serve({
    ...app,
    port: config.PORT,
  });

  console.log(`Server running on http://localhost:${config.PORT}`);
}

void main();
