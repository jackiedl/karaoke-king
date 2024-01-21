import JWT, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../ultis/config";
import HttpException from "../ultis/httpException";

interface UserPayload extends JwtPayload{
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean
}

export function generateToken(user: UserPayload): string{
  return JWT.sign(user, JWT_SECRET,{
    expiresIn: "1d",
  });
}

export function verifyToken(token: string): UserPayload{
  try{
    return JWT.verify(token, JWT_SECRET) as UserPayload;
  }
  catch (err){
    throw new HttpException('Invaild token', 401);
  }
}

 