import crypto from 'crypto';

const dotenv = require('dotenv');
dotenv.config;
const SECRET = process.env.ADMIN || ""; 

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication  = (salt:string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}