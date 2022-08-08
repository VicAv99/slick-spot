import { fetcher } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPlaylists = createAsyncThunk(
  "[PLAYLISTS] Fetch Playlists",
  async () => {
    return (await (await fetcher(`/api/spot/playlists`)).json()).items;
  }
);
