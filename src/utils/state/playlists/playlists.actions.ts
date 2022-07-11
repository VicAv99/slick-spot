import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchSpot } from '../api-utils/fetch-spot';

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

export const fetchPlaylistsPending = fetchPlaylists.pending;
export const fetchPlaylistsFulfilled = fetchPlaylists.fulfilled;
export const fetchPlaylistsRejected = fetchPlaylists.rejected;
