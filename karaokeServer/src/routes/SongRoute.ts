import express from 'express';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

const { getSongsHandler, 
        addSongHandler, 
        getSongByIdHandler, 
        updateSongHandler, 
        deleteSongHandler 
} = require("../controllers/SongController");

router
  .route('/') 
  .get(getSongsHandler)
  .post(protect, addSongHandler);
router
  .route('/:id')  
  .get(getSongByIdHandler)
  .put(protect, updateSongHandler)
  .delete(protect, deleteSongHandler);

module.exports = router;
