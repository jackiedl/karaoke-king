import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/axiosConfig";


export type Song = {
  title: string,
  artist: string,
  videoLink: string,
  albumCover: string,
  genre: string,
  views: number
}

export interface SongState{
  songs: Song[],
  queue: Song[],
  current: Song | null,
  isLoading: boolean,
  isError: boolean,
}

const initialState: SongState = {
  songs: [],
  queue: [],
  current: null,
  isLoading: false,
  isError: false
}

export const getSongs = createAsyncThunk("getSongs", async () => {
  try{
    const response = await api.getSongs();
    return response.data;
  }
  catch(error){
    console.log(error);
  }
})

export const addSong = createAsyncThunk("addSong", async (song: Song, thunkAPI) => {
  try{
    console.log(song);
    const response = await api.addSong(song);
    return response.data;
  }
  catch(error){
    console.log(error);
  }
})

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSongToQueue: (state, action) => {
      if (state.current === null){
        state.current = action.payload;
      }else{
        state.queue = [...state.queue, action.payload];
      }
    },
    playNextSong: (state) => {
      state.current = state.queue[0];
      state.queue = state.queue.slice(1)
    },
    playThisSong: (state, action) => {
      const index = action.payload;
      state.current = state.queue[index];
      state.queue = [...state.queue.slice(0, index),...state.queue.slice(index+1)]
    },
    removeSong: (state, action) => {
      const index = action.payload;
      state.queue = [...state.queue.slice(0, index),...state.queue.slice(index+1)]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSongs.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getSongs.fulfilled, (state, action) => {
      state.isLoading = false;
      const arr = action.payload;
      arr.sort(function(a:any, b:any) {
        const x = a.views;
        const y = b.views;
        return x > y ? -1 : x < y ? 1 : 0
      })
      state.songs = [...arr]
    })
    builder.addCase(getSongs.rejected, (state) => {
      state.isLoading = false;
    })
    builder.addCase(addSong.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(addSong.fulfilled, (state) => {
      state.isLoading = false;
    })
    builder.addCase(addSong.rejected, (state) => {
      state.isLoading = false;
    })
  }
})

export const {addSongToQueue, playNextSong, playThisSong, removeSong} = songSlice.actions;

export default songSlice.reducer;