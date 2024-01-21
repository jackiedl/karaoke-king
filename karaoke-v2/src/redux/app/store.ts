import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import songSliceReducer from "../features/songSlice";
import searchSlice from "../features/searchSlice";
import authSlice from "../features/authSlice";

const rootReducer = combineReducers({
  songs: songSliceReducer,
  search: searchSlice,
  auth: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>


export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware => {
    //   return getDefaultMiddleware().concat(quotesApiSlice.middleware)
    // },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
