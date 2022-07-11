import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { playlistSlice } from './playlists/playlists.reducer';

export const BASE_URL = "https://api.spotify.com/v1";

export function makeStore() {
  return configureStore({
    reducer: {
      playlists: playlistSlice.reducer,
    },
    preloadedState: {},
    devTools: process.env.NODE_ENV !== "production" ?? {
      name: "SLICK_SPOT_STORE",
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
