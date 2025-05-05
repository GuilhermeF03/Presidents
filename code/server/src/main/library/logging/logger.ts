import { createLogger, format, transports } from 'winston';

export enum LOG_MODULE {
  SERVER = 'SERVER',
  CONTROLLER = 'CONTROLLER',
  SERVICE = 'SERVICE',
  REPO = 'REPO',
}

const dateStr = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [new transports.File({ dirname: 'logs', filename: `log-${dateStr}.log` }), new transports.Console()],
});

export const getLogger = (module: LOG_MODULE) => {
  return logger.child({
    format: format.combine(format.timestamp(), format.label({ label: `[${module}]` }), format.json()),
  });
};
