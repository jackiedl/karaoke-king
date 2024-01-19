import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from "@reduxjs/toolkit";
import type { Song } from './songSlice';

export interface ResultState {
  results: Song[]
  text: string,
}

const initialState: ResultState = {
  results: [],
  text: "",
}

export const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<Song[]>) => {
      state.results = action.payload;
    },
    handleOnChange: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    }
  }
})

export const { search, handleOnChange } = resultSlice.actions;

export default resultSlice.reducer;