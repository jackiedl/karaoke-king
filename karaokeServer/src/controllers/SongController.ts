import { Response, Request } from "express";
const asyncHandler = require("express-async-handler");

import { getSongs, addSong, getSongById, updateSongById, deleteSongById } from "../services/SongService";
import { AuthorizedUserRequest } from "../middleware/authMiddleware";

//@desc Get all songs
//@route GET /api/songs
//@access Public
const getSongsHandler = asyncHandler(async (req: Request, res: Response) => {
  const songs = await getSongs();
  res.status(200).json(songs);
});

//@desc Add a songs
//@route POST /api/songs
//@access Private
const addSongHandler = asyncHandler(async (req: AuthorizedUserRequest, res: Response) => {
  const song = await addSong(req.body, req.user?._id);

  res.status(201).json(song);
});

//@desc Get a songs by id
//@route GET /api/songs/:id
//@access Public
const getSongByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const song = await getSongById(req.params.id);
  res.status(200).json(song);
});

//@desc Update a songs by id
//@route PUT /api/songs/:id
//@access Private
const updateSongHandler = asyncHandler(async (req: AuthorizedUserRequest, res: Response) => {
  const song = await updateSongById(req.params.id, req.body, req.user?._id);
  
  res.status(200).json(song);
});

//@desc Delete a songs by id
//@route DELETE /api/songs/:id
//@access Private
const deleteSongHandler = asyncHandler(async (req: AuthorizedUserRequest, res: Response) => { 
  await deleteSongById(req.params.id, req.user?._id);
  res.status(200).json({message: `Song ${req.params.id} deleted`});
});


module.exports = { 
  getSongsHandler, 
  addSongHandler, 
  getSongByIdHandler, 
  updateSongHandler, 
  deleteSongHandler 
};
