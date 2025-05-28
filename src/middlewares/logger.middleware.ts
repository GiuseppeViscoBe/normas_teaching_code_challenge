import morgan, { TokenIndexer } from 'morgan';
import pino from 'pino';
import { Request, Response } from 'express';

const logger = pino();

export const loggerMiddleware = morgan(
  (tokens: TokenIndexer<Request, Response>, req: Request, res: Response): string | null => {
    const logEntry = {
      time: new Date().toISOString(),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      responseTime: `${tokens['response-time'](req, res)} ms`,
    };

    logger.info(logEntry, 'HTTP Request');

    return null;
  }
);
