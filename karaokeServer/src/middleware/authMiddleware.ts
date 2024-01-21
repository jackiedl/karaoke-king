import { NextFunction, Request, Response } from "express";
import HttpException from "../ultis/httpException";
import { verifyToken } from "../services/TokenService";
import { getUserById } from "../services/UserService";
import { UserReturnType, UserType } from "../types/UserTypes";

const asyncHandler = require("express-async-handler");

export interface GetUserAuthInfoRequest extends Request{
  user: UserType
}

export interface AuthorizedUserRequest extends Request{
  user?: UserReturnType
}

export const protect = asyncHandler(async(req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization === null ||
    req.headers.authorization === '' ||
    req.headers.authorization === undefined ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    throw new HttpException('Unauthorized', 401);
  }

  const token = req.headers.authorization.split(" ")[1];
  const decoded = verifyToken(token);

  req.user = await getUserById(decoded._id);

  next();
})