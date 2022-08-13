import { PlayerActions, PlayerControls, PlayerData } from '@/components/player';
import { Footer, Progress, SimpleGrid, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useContext } from 'react';

import { PlayerContext, PlayerProvider } from './PlayerProvider';

export const WrappedPlayer = () => {
  return (
    <PlayerProvider>
      <Player />
    </PlayerProvider>
  );
};

export const Player = () => {
  const theme = useMantineTheme();
  const smallBreak = theme.breakpoints.sm;
  const isLargerScreen = useMediaQuery(`(max-width:${smallBreak}px)`, false);
  const { currentTrack, paused, player } = useContext(PlayerContext);

  return (
    <Footer height={isLargerScreen ? 180 : 80} px="md" pb="md">
      <Progress color="teal" radius="xs" size="sm" value={50} mx={-17} />
      <SimpleGrid
        className="h-full"
        cols={3}
        spacing="xs"
        breakpoints={[{ maxWidth: smallBreak, cols: 1 }]}
      >
        <PlayerData
          track={currentTrack ?? {}}
          isLargerScreen={isLargerScreen}
        />
        <PlayerControls isPaused={paused} player={player} />
        <PlayerActions
          player={player ?? ({} as Spotify.Player)}
          isLargerScreen={isLargerScreen}
        />
      </SimpleGrid>
    </Footer>
  );
};
