import { fetcher } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTracks = createAsyncThunk(
  "[TRACKS] Fetch Tracks",
  async () => {
    return await (await fetcher(`/api/spot/recently-played`)).json();
  }
);
