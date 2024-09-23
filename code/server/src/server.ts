import cors from 'cors';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';

import config from './config.ts';
import { trpcContext } from './trpc/trpc.ts';
import type { CoreRepo } from './repos/types';
import { rootRouter } from './controllers/root.ts';
import { memCore } from './repos/memory/memCore.ts';
import { coreServices, type CoreServices } from './services/coreServices.ts';

export type AppRouter = typeof rootRouter;

async function main() {
  // parse arguments
  const args = Bun.argv;

  console.log('args', args);

  // setup dependencies
  const db: CoreRepo = memCore;
  const services: CoreServices = coreServices(db);

  // setup middlewares
  const logMiddleWare: express.Handler = (req, _res, next) => {
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);
    next();
  };

  // setup TRPC
  const context = trpcContext(services);
  const trpcMiddleware = trpcExpress.createExpressMiddleware({
    router: rootRouter,
    createContext: context,
  });

  // const sessionMiddleware = session({
  //   name: 'COOKIE_ID',
  //   cookie: {
  //     maxAge: 1000 * 60 * 60 * 24, // 1 day
  //     httpOnly: true,
  //     sameSite: 'lax', // reLAXed CSRF - Cross Site Request Forgery
  //     secure: true, // cookie only works in https
  //     domain: 'localhost', // cookie only works if request comes from this domain
  //   },
  //   saveUninitialized: false, // not every session will be stored, only modified once
  //   secret: 'very complicated string', // this string is used to sign the cookie and protect it from modifications.
  //   resave: false, // will not save the session in store on every request, only if was modified
  // });

  const app = express();

  // Setup middlewares
  app.use(cors(/*config.SERVER_OPTIONS.cors*/));
  app.use(logMiddleWare);
  //app.use(sessionMiddleware);
  app.use('/trpc', trpcMiddleware);

  app.listen(config.PORT, () => {
    console.log(`listening on ${config.ORIGIN}`);
  });
}

void main();
