import { DEFAULT_SERVER_CONFIG } from '@core/config';

const PORT = Number.parseInt(Bun.env.PORT || DEFAULT_SERVER_CONFIG.port.toString());
const ORIGIN = Bun.env.ORIGIN?.split(',') ?? [DEFAULT_SERVER_CONFIG.origin];

const SERVER_OPTIONS = {
  cors: {
    origin: '*',
    credentials: true, // allow credentials (cookies),
  },
  connectionStateRecovery: {}, // enable connection state recovery
};

export default {
  PORT,
  ORIGIN,
  SERVER_OPTIONS,
};
