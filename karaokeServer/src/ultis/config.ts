const dotenv = require('dotenv').config();

export const PORT = process.env.PORT || 3030;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || null;
export const JWT_SECRET = process.env.JWT_SECRET || "";