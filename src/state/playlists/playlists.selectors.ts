import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../state.models';
import { selectPlaylists } from './playlists.reducer';

const selectPlaylistsFeature = (state: AppState) => state.playlists;

export const selectAllPlaylists = createSelector(
  selectPlaylistsFeature,
  selectPlaylists
);
