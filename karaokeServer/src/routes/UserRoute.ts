import express from 'express';

import { getAllUsers } from '../controllers/Users';
import { isAuthenticated } from '../middleware';

const router = express.Router();

router.get("/users", isAuthenticated, getAllUsers);

export default router;