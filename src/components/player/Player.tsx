import { Footer, Progress, SimpleGrid, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

import { PlayerActions } from './Actions';
import { PlayerControls } from './Controls';
import { PlayerData } from './Data';

export const Player = () => {
  const theme = useMantineTheme();
  const smallBreak = theme.breakpoints.sm;
  const isLargerScreen = useMediaQuery(`(max-width:${smallBreak}px)`, false);
  return (
    <>
      <Footer height={isLargerScreen ? 180 : 80} px="md" pb="md">
        <Progress color="teal" radius="xs" size="sm" value={50} mx={-17} />
        <SimpleGrid
          className="h-full"
          cols={3}
          spacing="xs"
          breakpoints={[{ maxWidth: smallBreak, cols: 1 }]}
        >
          <PlayerData isLargerScreen={isLargerScreen} />
          <PlayerControls />
          <PlayerActions isLargerScreen={isLargerScreen} />
        </SimpleGrid>
      </Footer>
    </>
  );
};
