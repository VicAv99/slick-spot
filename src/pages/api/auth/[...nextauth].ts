import NextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const SCOPES = [
  //Listening History
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
  //Spotify Connect
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  //Playback - For SDK Playback //https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
  "streaming",
  //Playlists
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  //Library
  "user-library-modify",
  "user-library-read",
  //Users - For SDK Playback //https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
  "user-read-email",
  "user-read-private",
];

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID ?? "",
      clientSecret: process.env.SPOTIFY_SECRET ?? "",
      authorization: {
        params: { scope: SCOPES.join(" ") },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
