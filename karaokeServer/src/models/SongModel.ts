import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true},
  artist: { type: String, required: true},
  videoLink: { type: String, required: true},
  albumCover: { type: String, required: true},
  genre: { type: String, required: true},
  views: { type: Number, required: true},
});

export default mongoose.model("Song", SongSchema);