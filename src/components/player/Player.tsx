import { Footer, SimpleGrid, useMantineTheme } from '@mantine/core';
import React from 'react';

import { PlayerActions } from './Actions';
import { PlayerControls } from './Controls';
import { PlayerData } from './Data';

export const Player = () => {
  const theme = useMantineTheme();
  return (
    <Footer height={80} p="md">
      <SimpleGrid className="h-full" cols={3} spacing="xs">
        <PlayerData />
        <PlayerControls />
        <PlayerActions />
      </SimpleGrid>
    </Footer>
  );
};
