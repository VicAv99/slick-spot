import { configureStore } from '@reduxjs/toolkit';

import { playlistSlice } from './playlists/playlists.reducer';
import { tracksSlice } from './tracks/tracks.reducer';

export function makeStore() {
  return configureStore({
    reducer: {
      [playlistSlice.name]: playlistSlice.reducer,
      [tracksSlice.name]: tracksSlice.reducer,
    },
    preloadedState: {},
    devTools: process.env.NODE_ENV !== "production" ?? {
      name: "SLICK_SPOT_STORE",
    },
  });
}

export const store = makeStore();
