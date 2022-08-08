import { Track } from '@/utils';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchTracks } from './tracks.actions';

interface TrackState {
  error?: string | null;
  loading: boolean;
  selectedId?: string | null;
}

const tracksAdapter = createEntityAdapter<Track>({
  selectId: (track) => track.id,
});

const initialState = tracksAdapter.getInitialState<TrackState>({
  loading: false,
});

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setSelectedTrack: (state, action) => ({
      ...state,
      selectedId: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchTracks.fulfilled, (state, { payload }) => {
        return tracksAdapter.setAll({ ...state, loading: false }, payload);
      })
      .addCase(fetchTracks.rejected, (state, { error }) => ({
        ...state,
        loading: false,
        error: error.message ?? "",
      }));
  },
});

export const {
  selectAll: selectTracks,
  selectById: selectTrackById,
  selectEntities: selectTrackEntities,
  selectIds: selectTrackIds,
  selectTotal: selectTracksTotal,
} = tracksAdapter.getSelectors();
