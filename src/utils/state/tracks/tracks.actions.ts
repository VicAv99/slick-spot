import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppSession, Track } from '../../models';
import { fetchSpot } from '../api-utils/fetch-spot';

export const fetchTracks = createAsyncThunk(
  "[TRACKS] Fetch Tracks",
  async (session: AppSession) => {
    const response = await fetchSpot<{ track: Track }>(
      `/me/player/recently-played`,
      session
    );
    return response.items.map(({ track }) => track);
  }
);
