import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../state.models';
import { selectTracks } from './tracks.reducer';

const selectTracksFeature = (state: AppState) => state.tracks;

export const selectAllTracks = createSelector(
  selectTracksFeature,
  selectTracks
);
