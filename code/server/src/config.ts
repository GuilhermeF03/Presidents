const PORT = Number.parseInt(Bun.env.PORT || '8080');
const ORIGIN = Bun.env.ORIGIN?.split(',') ?? [`http://localhost:${PORT}`];

const SERVER_OPTIONS = {
  cors: {
    origin: '*',
    //credentials: true, // allow credentials (cookies)
    allowedHeaders: ['Authorization', 'Content-Type'],
  },
  connectionStateRecovery: {}, // enable connection state recovery
};

export default {
  PORT,
  ORIGIN,
  SERVER_OPTIONS,
};
