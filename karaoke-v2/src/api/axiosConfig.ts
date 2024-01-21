import axios from 'axios';
import type { Song } from '../redux/features/songSlice';
import type { LoginData } from '../redux/utils/Authentication';

const devMode = false;

const API = axios.create({
  baseURL: devMode ? 'http://192.168.86.233:8080':'https://karaoke-mongodb-api.onrender.com',
  headers: {"ngrok-skip-browser-warning": "true"}
})

export const getSongs = () => API.get("/api/songs");
export const addSong = (song: Song) => API
  .post("/api/songs", song, 
    {headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('users')}`
    }}
  );

export const login = (user: LoginData) => API.post("/api/users/login", user);

