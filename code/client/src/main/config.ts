import process from 'node:process';
import { DEFAULT_CLIENT_CONFIG } from '../../../core/config.ts';

const PORT = Number.parseInt(process.env.PORT || DEFAULT_CLIENT_CONFIG.port.toString());
const ORIGIN = process.env.ORIGIN?.split(',')[0] ?? DEFAULT_CLIENT_CONFIG.origin;

export default {
  PORT,
  ORIGIN,
};
