import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchPlaylists } from './playlists.actions';

const playlistsAdapter = createEntityAdapter<any>({
  selectId: (playlist) => playlist.id,
});

const initialState = playlistsAdapter.getInitialState({
  loading: false,
  selectedPlaylistId: null,
  error: "",
});

export const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setSelectedPlaylist: (state, action) => ({
      ...state,
      selectedPlaylistId: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchPlaylists.fulfilled, (state, { payload }) => {
        return playlistsAdapter.setAll({ ...state, loading: false }, payload);
      })
      .addCase(fetchPlaylists.rejected, (state, { error }) => ({
        ...state,
        loading: false,
        error: error.message ?? "",
      }));
  },
});

export const {
  selectAll: selectPlaylists,
  selectById: selectPlaylistById,
  selectEntities: selectPlaylistEntities,
  selectIds: selectPlaylistIds,
  selectTotal: selectPlaylistTotal,
} = playlistsAdapter.getSelectors();
