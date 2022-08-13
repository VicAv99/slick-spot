import { fetcher } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTracks = createAsyncThunk(
  "[TRACKS] Fetch Tracks",
  async () => {
    return await (await fetcher(`/api/spot/recently-played`)).json();
  }
);

export const playRecentlyPlayedTrack = createAsyncThunk(
  "[TRACKS] Play Recently Played Track",
  async ({ uri, accessToken }: { uri: string; accessToken: string }) => {
    return await (
      await fetcher("/me/player/play", false, {
        method: "PUT",
        body: {
          uris: [uri],
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).json();
  }
);
