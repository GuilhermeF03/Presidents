import { LOG_MODULE } from '@/main/library/logging/logger.ts';
import { trpcServer } from '@hono/trpc-server';
import { Hono, type MiddlewareHandler } from 'hono';
import { cors } from 'hono/cors';
import { config } from './config.ts';
import { rootRouter } from './controllers/rootRouter.ts';
import { getLogger } from './library/logging/logger.ts';
import { memCore } from './repos/memory/memCoreRepo.ts';
import type { CoreRepo } from './repos/types.ts';
import { coreServices } from './services/coreServices.ts';
import type { CoreServices } from './services/types.ts';
import { trpcContext } from './trpc/trpc.ts';

// Import logger
const logger = getLogger(LOG_MODULE.SERVER);
logger.info('Bootstrapping server...');

// Configure deployment based on cli args
// const args = Bun.argv;

// Setup services
logger.info('Setting up modules...');
const db: CoreRepo = memCore();
const services: CoreServices = coreServices(db);

// Override console logs
const overrideConsoleLogs = () => {
  console.log = (...args) => logger.info(args.join(' '));
  console.error = (...args) => logger.error(args.join(' '));
  console.warn = (...args) => logger.warn(args.join(' ')); // Fix: `warn` instead of `warning`
};
overrideConsoleLogs();

// Setup middleware
const logMiddleWare: MiddlewareHandler = async (c, next) => {
  const { req } = c;

  logger.info('⬅️ Request:', {
    method: req.method,
    path: req.path,
    query: req.query,
    body: c.body ?? null,
    timestamp: new Date().toISOString(),
  });

  await next();

  logger.info('➡️ Response:', {
    status: c.res.status,
    headers: c.res.headers,
    timestamp: new Date().toISOString(),
  });
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
