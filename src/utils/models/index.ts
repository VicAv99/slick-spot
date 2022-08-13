import { DefaultSession } from 'next-auth';

export interface Album {
  id: string;
  name: string;
  artists: [Artist];
  images?: [Image];
  album_type?: string;
  release_date?: string;
  tracks?: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images?: [Image];
  followers?: {
    total: number;
  };
  genres?: [string];
}

interface Image {
  height: number | null;
  url: string | null;
  width: number | null;
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: [Artist];
  duration_ms: number;
  preview_url: string;
  uri: string;
}

interface AppUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  sub?: string | null;
  expires_at?: number | null;
  accessToken?: string | null;
  iat?: number | null;
  exp?: number | null;
  jti?: number | null;
}

export interface AppSession extends Omit<DefaultSession, "user"> {
  user?: AppUser;
  expires: string;
}
