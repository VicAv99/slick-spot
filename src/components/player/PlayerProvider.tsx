import { Track } from '@/utils';
import { createContext, PropsWithChildren } from 'react';

import { usePlayerContext } from './use-player-context';

export interface PlayerState {
  active: boolean;
  currentTrack?: Partial<Track>;
  next?: () => Promise<void>;
  paused: boolean;
  player?: Spotify.Player;
  previous?: () => Promise<void>;
  shuffle?: () => Promise<void>;
  tracks: Partial<[Track[], Track[]]>;
  togglePlay?: () => Promise<void>;
}

export const PlayerContext = createContext<PlayerState>({
  active: false,
  paused: true,
  tracks: [],
});

export const PlayerProvider = ({ children }: PropsWithChildren<unknown>) => {
  const player = usePlayerContext();
  return (
    <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
  );
};
