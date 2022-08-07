import { createSlice } from '@reduxjs/toolkit';

import { AppSession } from '../../utils';
import { hydrateToken, signInWithSpotify, signOutFromApp } from './auth.actions';

interface AuthState {
  authenticated: boolean;
  error?: any;
  loading: boolean;
  user?: AppSession["user"];
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    [hydrateToken.name]: (state, { payload }) => ({
      ...state,
      authenticated: payload.authenticated,
      user: payload.user,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithSpotify.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(signOutFromApp.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(signInWithSpotify.fulfilled, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(signOutFromApp.fulfilled, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(signInWithSpotify.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
      }))
      .addCase(signOutFromApp.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
      }));
  },
});
