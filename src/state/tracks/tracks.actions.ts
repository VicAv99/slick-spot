import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppSession, fetchSpot, Track } from '../../utils';

export const fetchTracks = createAsyncThunk(
  "[TRACKS] Fetch Tracks",
  async (session: AppSession) => {
    const response = await (
      await fetchSpot(`/me/player/recently-played`, session)
    ).json();

    return response.items.map(({ track }: { track: Track }) => track);
  }
);
