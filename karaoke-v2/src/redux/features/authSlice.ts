import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../../api/axiosConfig";
import type { LoginData } from '../utils/Authentication';

export interface UserReturnType {
  username: string;
  email:string;
  isAdmin: boolean;
  token: string;
}

export interface AuthState {
  isLoggedIn: boolean,
  isLoading: boolean,
}

const initialState: AuthState = {
  isLoggedIn: sessionStorage.getItem("users") ? true : false,
  isLoading: false,
}

export const login = createAsyncThunk("login", async (user: LoginData, thunkAPI) => {
  try{
    const response = await api.login(user);
    return response.data;
  }
  catch(error){
    console.log(error);
  }
})

export const authSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('users');
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      sessionStorage.setItem('users', action.payload.token);
      state.isLoggedIn = true;
    })
    builder.addCase(login.rejected, (state) => {
      console.log('hello')
      state.isLoading = false;
    })
  }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;