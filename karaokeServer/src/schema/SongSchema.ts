import mongoose from 'mongoose';
import { SongType } from '../types/SongTypes';

export interface ISongSchema extends SongType{
  _id: string;
  userId: string;
}

const SongSchema = new mongoose.Schema<ISongSchema>(
  {
    userId: {type: String, required: true},
    title: { type: String, required: true, unique: true},
    artist: { type: String, required: true},
    videoLink: { type: String, required: true},
    albumCover: { type: String, required: true},
    genre: { type: String, required: true},
    views: { type: Number, required: true},
  },
  {
    timestamps: true
  }
);

export default SongSchema;