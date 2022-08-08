import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetcher } from '../../utils';

export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  async () => {
    return (await (await fetcher(`/api/spot/playlists`)).json()).items;
  }
);
