import axios from 'axios';
import type { Song } from '../redux/features/songSlice';

const devMode = true;

const API = axios.create({
  baseURL: devMode ? 'http://192.168.86.233:8080':'https://karaoke-mongodb-api.onrender.com',
  headers: {"ngrok-skip-browser-warning": "true"}
})

export const getSongs = () => API.get("/api/v1/songs");
export const addSong = (song: Song) => API.post("/api/v1/addSong", song);
