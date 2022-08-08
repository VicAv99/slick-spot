import { Action, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import { signOutFromApp } from './auth/auth.actions';
import { playlistSlice } from './playlists/playlists.reducer';
import { AppState } from './state.models';
import { tracksSlice } from './tracks/tracks.reducer';

const combinedReducer = combineReducers({
  [playlistSlice.name]: playlistSlice.reducer,
  [tracksSlice.name]: tracksSlice.reducer,
});

const rootReducer: Reducer = (state: AppState, action: Action) => {
  if (action.type === signOutFromApp.name) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

function makeStore() {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {},
    devTools: process.env.NODE_ENV !== "production" && {
      name: "SLICK_SPOT_STORE",
    },
  });
}

export const store = makeStore();
