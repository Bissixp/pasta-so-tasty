import { Request, Response, NextFunction } from 'express';
import ErrorHttp from './utils';


const errorHandlerMiddleware = (err: ErrorHttp, _req: Request, res: Response, _next: NextFunction) => {
  const { message, http } = err;
  res.status(http || 500).json({ message });
};

export default errorHandlerMiddleware;