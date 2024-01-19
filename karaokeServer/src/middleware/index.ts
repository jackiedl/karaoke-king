import express from 'express';
import { merge } from 'lodash';

import { getUserBySessionToken } from '../models/UserModel';

export const isAuthenticated = async (req:express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['KARAOKE-AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }

    if (!existingUser.admin){
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } 
  catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}