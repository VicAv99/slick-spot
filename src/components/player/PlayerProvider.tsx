import { Track } from '@/utils';
import { createContext, PropsWithChildren } from 'react';

import { usePlayerContext } from './use-player-context';

export interface PlayerState {
  active: boolean;
  currentTrack?: Partial<Track>;
  paused: boolean;
  player?: Spotify.Player;
}

export const PlayerContext = createContext<PlayerState>({
  active: false,
  paused: true,
});

export const PlayerProvider = ({ children }: PropsWithChildren<unknown>) => {
  const player = usePlayerContext();
  return (
    <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
  );
};
