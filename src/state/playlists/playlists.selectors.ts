import { AppState } from '@/state';
import { createSelector } from '@reduxjs/toolkit';

import { selectPlaylists } from './playlists.reducer';

const selectPlaylistsFeature = (state: AppState) => state.playlists;

export const selectAllPlaylists = createSelector(
  selectPlaylistsFeature,
  selectPlaylists
);
