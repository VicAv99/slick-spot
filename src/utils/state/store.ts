import { configureStore } from '@reduxjs/toolkit';

import { playlistSlice } from './playlists/playlists.reducer';

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

export const store = makeStore();
