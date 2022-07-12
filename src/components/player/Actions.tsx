import { ActionIcon, Box, Slider } from '@mantine/core';
import React from 'react';
import { FiMic, FiVolume2 } from 'react-icons/fi';

interface PlayerActionsProps {
  isLargerScreen: boolean;
}

export const PlayerActions = (props: PlayerActionsProps) => {
  const classes = `flex items-center ${
    props.isLargerScreen ? "justify-between" : "justify-end"
  }`;

  return (
    <Box className={classes}>
      <ActionIcon mr={10} size={35} variant="light" radius="xl" color="teal">
        <FiMic className="ml-px" size={15} color="gray" />
      </ActionIcon>
      <div className="flex items-center">
        <ActionIcon mr={10} size={35} variant="light" radius="xl" color="teal">
          <FiVolume2 className="ml-px" size={15} color="gray" />
        </ActionIcon>
        <Slider
          className={`w-[${props.isLargerScreen ? "100px" : "150px"}]`}
          size="xs"
          color="teal"
          marks={[{ value: 50 }]}
        />
      </div>
    </Box>
  );
};
