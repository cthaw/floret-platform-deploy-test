import winston, { format } from 'winston';
import { LOG_LEVEL } from '../constants';

const logFormat = format.printf((info) => {
  const {
    level,
    message,
    timestamp,
    metadata,
  } = info;
  let msg = `[${timestamp}]`;
  const stack = metadata.stack || metadata.error?.stack;
  if (metadata.dataType && metadata._id) {
    msg = `${msg} [${metadata.dataType} ${metadata._id}]`;
  }
  msg = `${msg} [${level}]: ${message}`;
  if (stack) {
    msg = `${msg}\n${stack}`;
  }
  return msg;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      level: LOG_LEVEL,
      format: format.combine(
        format.label({ label: 'floret-platform' }),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
        format.errors({ stack: true }),
        format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        logFormat,
      ),
    }),
  ],
});

export default logger;
