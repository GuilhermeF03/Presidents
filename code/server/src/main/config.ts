import { DEFAULT_SERVER_CONFIG } from '@core/config.ts';

const PORT = Number.parseInt(Bun.env.PORT || DEFAULT_SERVER_CONFIG.port.toString());
const ORIGIN = Bun.env.ORIGIN?.split(',') ?? [DEFAULT_SERVER_CONFIG.origin];

export enum ServerProfile {
  DEV = 'dev',
  PROD = 'prod',
}

const SERVER_OPTIONS = {
  cors: {
    origin: 'http://localhost:5432',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //credentials: true, // allow credentials (cookies),
  },
  connectionStateRecovery: {}, // enable connection state recovery
};

export const config = {
  PORT,
  ORIGIN,
  SERVER_OPTIONS,
  profile: ServerProfile.DEV
};
