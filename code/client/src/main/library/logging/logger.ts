import { createLogger, format, transports } from 'winston';

const dateStr = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ dirname: 'logs', filename: `log-${dateStr}.log` })
  ]
});


export enum LOG_MODULE {
  SERVER = 'SERVER',
  COMPONENT = 'COMPONENT',
  CONTEXT = 'CONTEXT',
  HOOK = 'HOOK',
  PAGE = 'PAGE',
}

export const getLogger = (module: LOG_MODULE) => {
  return logger.child({
    format: format.combine(
      format.timestamp(),
      format.label({ label: `[${module}]` }),
      format.json()
    )
  })
}
