import express from 'express';

import { addSong, getSongs, updateViewCount } from '../controllers/SongController';

const router = express.Router();

router.get("/songs", getSongs);
router.post("/addSong", addSong);
router.patch("/updateView/:id", updateViewCount);

export default router;