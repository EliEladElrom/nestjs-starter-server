/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
*/

const PINO_LOG_LEVEL = process.env.PINO_LOG_LEVEL;
const LogLevelMap: Record<string, string> = {
  Infinity: 'silent',
  '10': 'trace',
  '20': 'debug',
  '30': 'info',
  '40': 'warn',
  '50': 'error',
  '60': 'fatal',
};

const prettyPrintConfig = {
  colorize: true,
  crlf: true,
  // no space after comma
  ignore: 'pid,hostname',
  // human-readable time, set to false for UNIX timestamp
  translateTime: true,
};

export const pinoConfig = {
  name: 'nest-server',
  level: LogLevelMap[PINO_LOG_LEVEL || '30'],
  prettyPrint: process.env.NODE_ENV !== 'production' ? prettyPrintConfig : false,
};
