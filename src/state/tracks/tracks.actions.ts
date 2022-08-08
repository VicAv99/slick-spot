import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetcher } from '../../utils';

export const fetchTracks = createAsyncThunk(
  "[TRACKS] Fetch Tracks",
  async () => {
    return await (await fetcher(`/api/spot/recently-played`)).json();
  }
);
