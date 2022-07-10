import { SimpleGrid } from '@mantine/core';
import React from 'react';

import { PlayerActions } from './Actions';
import { PlayerControls } from './Controls';
import { PlayerData } from './Data';

export const Player = () => {
  return (
    <SimpleGrid className="h-full" cols={3} spacing="xs">
      <PlayerData />
      <PlayerControls />
      <PlayerActions />
    </SimpleGrid>
  );
};
