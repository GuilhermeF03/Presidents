import { trpcServer } from '@hono/trpc-server';
import { Hono, type MiddlewareHandler } from 'hono';
import { cors } from 'hono/cors';
import { rootRouter } from './controllers/root.ts';
import { memCore } from './repos/memory/memCore.ts';
import type { CoreRepo } from './repos/types';
import { type CoreServices, coreServices } from './services/coreServices.ts';
import { trpcContext } from './trpc/trpc.ts';

async function main() {
  // parse arguments
  const args = Bun.argv;

  console.log('args', args);

  // setup dependencies
  const db: CoreRepo = memCore;
  const services: CoreServices = coreServices(db);

  // setup middlewares
  const logMiddleWare: MiddlewareHandler = async (c, next) => {
    const { req } = c;
    console.log('⬅️ ', req.method, req.path, c.body ?? req.query);
    next();
  };

  // setup TRPC
  const context = trpcContext(services);
  const trpcMiddleware = trpcServer({
    router: rootRouter,
    createContext: context,
  });

  const app = new Hono();

  app.use(cors(/*config.SERVER_OPTIONS.cors*/));
  app.use(logMiddleWare);
  app.use('/trpc', trpcMiddleware);
}

void main();
