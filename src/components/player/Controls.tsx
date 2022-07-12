import { ActionIcon, Box } from '@mantine/core';
import React from 'react';
import { FiPlay, FiRepeat, FiShuffle, FiSkipBack, FiSkipForward } from 'react-icons/fi';

export const PlayerControls = () => {
  return (
    <Box className="flex justify-center items-center">
      <ActionIcon mr={10} size={40} variant="light" radius="xl" color="teal">
        <FiShuffle className="ml-px" size={20} color="gray" />
      </ActionIcon>
      <ActionIcon mx={10} size={40} variant="light" radius="xl" color="teal">
        <FiSkipBack className="ml-px" size={20} color="gray" />
      </ActionIcon>
      <ActionIcon mx={10} size={45} variant="light" radius="xl" color="teal">
        <FiPlay className="ml-px" size={25} color="gray" />
      </ActionIcon>
      <ActionIcon mx={10} size={45} variant="light" radius="xl" color="teal">
        <FiSkipForward className="ml-px" size={25} color="gray" />
      </ActionIcon>
      <ActionIcon ml={10} size={40} variant="light" radius="xl" color="teal">
        <FiRepeat className="ml-px" size={20} color="gray" />
      </ActionIcon>
    </Box>
  );
};
