import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signOut } from 'next-auth/react';

import { AppSession } from '../../utils';

export const hydrateToken = createAction<AppSession | undefined>(
  "[AUTH Init] Hydrate Token"
);

export const signInWithSpotify = createAsyncThunk(
  "[AUTH Page] Sign In With Spotify",
  async () => {
    await signIn("spotify", { callbackUrl: "/", redirect: false });
  }
);

export const signOutFromApp = createAsyncThunk(
  "[AUTH Page] Sign Out From App",
  async () => {
    await signOut();
  }
);
