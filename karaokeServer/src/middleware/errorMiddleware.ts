import { NextFunction, Response, Request } from "express"
import HttpException from "../ultis/httpException";
import { NODE_ENV } from "../ultis/config";

export const errorHandler = (
  err: HttpException, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    message: message,
    stack: NODE_ENV === 'production' ? null : err.stack
  })
};