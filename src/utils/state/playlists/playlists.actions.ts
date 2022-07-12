import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchSpot } from '../api-utils/fetch-spot';

export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  async (session: any) => {
    const response = await (
      await fetchSpot(`/users/${session.user.sub}/playlists`, session)
    ).json();
    return response.items;
  }
);
