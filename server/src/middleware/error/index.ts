import { NextFunction, Request, Response } from 'express';

import { DEFAULT_ERROR_MESSAGE, DEFAULT_ERROR_CODE } from '../../constants';
import log from '../../logger';

const errorHandler = (err: any, _: Request, res: Response, next: NextFunction) => {
  if (err) {
    log.error('Request Error', err);
    const { message = DEFAULT_ERROR_MESSAGE, statusCode = DEFAULT_ERROR_CODE } = err || {};
    return res.status(statusCode).send({ message, statusCode });
  }
  return next();
};

export default errorHandler;
