import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { createContext } from './trpc/trpc.ts';
import { rootRouter } from './routers/root.ts';
import cors from 'cors';
import session from 'express-session';
import config from './config.ts';

export type AppRouter = typeof rootRouter;

const logMiddleWare: express.Handler = (req, _res, next) => {
  console.log('⬅️ ', req.method, req.path, req.body ?? req.query);
  next();
};

const trpcMiddleware = trpcExpress.createExpressMiddleware({
  router: rootRouter,
  createContext,
});

const sessionMiddleware = session({
  name: 'COOKIE_ID',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    sameSite: 'lax', // reLAXed CSRF - Cross Site Request Forgery
    secure: true, // cookie only works in https
    domain: 'localhost', // cookie only works if request comes from this domain
  },
  saveUninitialized: false, // not every session will be stored, only modified once
  secret: 'very complicated string', // this string is used to sign the cookie and protect it from modifications.
  resave: false, // will not save the session in store on every request, only if was modified
});

async function main() {
  const app = express();

  // Setup middlewares
  app.use(cors(config.SERVER_OPTIONS.cors));
  app.use(logMiddleWare);
  app.use(sessionMiddleware);

  app.use('/trpc', trpcMiddleware);

  app.listen(4321, () => {
    console.log('listening on port 4321');
  });
}

void main();
