import express from 'express';
import Song from "../models/SongModel";

export const getSongs = async (req: express.Request, res: express.Response) => {
  try{
    const songs = await Song.find({});
    res.status(200).json(songs);
  }
  catch (error){
    console.log(error);
    res.status(404).json({ message: error })
  }
}

export const addSong = async (req: express.Request, res: express.Response) => {

  const song = req.body;

  const newSong = new Song(song);

  try{
    await newSong.save();
    res.status(201).json(newSong);
  }
  catch (error){
    console.log(error);
    res.status(409).json({ message: error })
  }
}

export const updateViewCount = async (req: express.Request, res: express.Response) => {  
  const { id } = req.params;
  try{
    const song = await Song.findById(id);
    if (song){
      song.views += 1;
      await song.save();
    }
    return res.status(200).json(song).end();
  }
  catch (error){
    console.log(error);
    res.status(400).json({ message: error })
  }
  
}