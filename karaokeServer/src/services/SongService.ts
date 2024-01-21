import SongModel from '../models/SongModel';
import { ISongSchema } from '../schema/SongSchema';
import { SongType } from '../types/SongTypes'
import { checkIsValidObjectId } from "../database/db";
import { SanitizeSong } from '../sanitizers/SongSanitizer';
import HttpException from '../ultis/httpException';
import { sanitizedId } from '../sanitizers/UserSanitizer';

export async function getSongs(): Promise<SongType[]>{
  try{
    const songs = await SongModel.find();
    if (!songs) throw new HttpException('Songs not found', 404);

    return songs;
  }
  catch(err){
    throw new HttpException(`Error finding songs ${err}`, 400);
  }
}

export async function addSong(song: SongType, userId: string | undefined): Promise<SongType>{
  const sanitizeSong = SanitizeSong(song, userId);
  try{
    const newSong = await SongModel.create(sanitizeSong);
    if (!newSong) throw new HttpException('Song was not created', 401);

    return newSong;
  }
  catch(err){
    throw new HttpException(`Error adding song ${err}`, 400);
  }
}

export async function getSongById(songId: string): Promise<ISongSchema>{
  checkIsValidObjectId(songId);
  try{
    const song = await SongModel.findById(songId);
    if (!song) throw new HttpException('Song not found', 404);

    return song;
  }
  catch(err){
    throw new HttpException(`Error finding song ${err}`, 400);
  }
}

export async function updateSongById(songId: string, song: SongType, userId: string | undefined): Promise<ISongSchema>{
  checkIsValidObjectId(songId);

  //check userid is same userid in song
  await isUserAuthorized(userId, songId);

  const sanitizeSong = SanitizeSong(song, userId);
  try{
    const updatedSong = await SongModel.findByIdAndUpdate(songId, sanitizeSong, {new: true});
    if (!updatedSong) throw new HttpException('Song was not found', 404);

    return updatedSong;
  }
  catch(err){
    throw new HttpException(`Error updating song ${err}`, 400);
  }
}

export async function deleteSongById(songId: string, userId: string | undefined): Promise<void>{
  checkIsValidObjectId(songId);
  await isUserAuthorized(userId, songId);
  try{
    const song = await SongModel.findByIdAndDelete(songId);
    if (!song) throw new HttpException('Song was not found', 404);
  }
  catch(err){
    throw new HttpException(`Error deleting song ${err}`, 400);
  }
}

async function isUserAuthorized(userId:string | undefined, songId:string): Promise<void> {
  checkIsValidObjectId(songId);

  const sanitizedUserId = sanitizedId(userId);
  const songToUpdate = await getSongById(songId);

  if (sanitizedUserId !== songToUpdate._id){
    throw new HttpException("You are not authorized to perform this action", 401);
  }
}