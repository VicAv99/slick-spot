import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchSpot } from '../api-utils/fetch-spot';

// import { fetchPlaylists } from './playlists.actions';

export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  async (session: any) => {
    const response = await fetchSpot(
      `/users/${session.user.sub}/playlists`,
      session
    );
    return response.items;
  }
);

const playlistsAdapter = createEntityAdapter<any>({
  selectId: (playlist) => playlist.id,
});

const initialState = playlistsAdapter.getInitialState({
  loading: false,
  selectedPlaylist: null,
  error: "",
});

export const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    // fetchPlaylists: playlistsAdapter.setAll,
    addPlaylist: playlistsAdapter.addOne,
    removePlaylist: playlistsAdapter.removeOne,
    updatePlaylist: playlistsAdapter.updateOne,
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
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
