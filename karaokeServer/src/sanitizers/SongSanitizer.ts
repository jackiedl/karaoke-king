import { SongType } from "../types/SongTypes";
import { sanitizedId } from "./UserSanitizer";
import HttpException from "../ultis/httpException";
import { ISongSchema } from "../schema/SongSchema";

export function SanitizeSong(song: SongType, userId: string | undefined) :ISongSchema{
  const sanitizeId = sanitizedId(userId);
  const sanitizedSong = <ISongSchema>{
    userId: sanitizeId,
    title: "",
    artist: song.artist,
    videoLink: song.videoLink,
    albumCover: song.albumCover,
    genre: song.genre,
    views: song.views,
  };

  sanitizedSong.title = sanitizeTitle(song.title);
  return sanitizedSong;
}

function sanitizeTitle(title: string):string{
  //Types
  if (title === undefined){
    throw new HttpException("Title is undefined", 400);
  }
  if (typeof title !== 'string'){
    throw new HttpException("Title is not a string", 400);
  }
  
  //Attributes
  title = title.trim();
  if (title.length < 3){
    throw new HttpException("Title must be at least 3 characters", 400);
  }

  if (title.length > 50){
    throw new HttpException("Title must be less than 50 character", 400);
  }

  return title;
}