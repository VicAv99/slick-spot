import { AppState } from '@/state';
import { createSelector } from '@reduxjs/toolkit';

import { selectTracks } from './tracks.reducer';

const selectTracksFeature = (state: AppState) => state.tracks;

export const selectAllTracks = createSelector(
  selectTracksFeature,
  selectTracks
);
