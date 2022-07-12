import { ActionIcon, Box, Image, Text } from '@mantine/core';
import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { MdPictureInPicture } from 'react-icons/md';

interface PlayerDataProps {
  isLargerScreen: boolean;
}

export const PlayerData = (props: PlayerDataProps) => {
  const classes = `flex items-center ${
    props.isLargerScreen ? "justify-between" : "justify-start"
  }`;

  return (
    <Box className={classes}>
      <div className="flex items-center">
        <Image src="https://picsum.photos/50/50" height={50} alt="" />
        <div className="flex flex-col mx-2">
          <Text size="md" weight={800}>
            Some Song
          </Text>
          <Text size="sm" weight={500}>
            Some Artist
          </Text>
        </div>
      </div>
      <div className="flex items-center">
        <ActionIcon size={35} variant="light" radius="xl" color="teal">
          <FiHeart size={15} color="gray" />
        </ActionIcon>
        <ActionIcon size={35} variant="light" radius="xl" color="teal">
          <MdPictureInPicture size={15} color="gray" />
        </ActionIcon>
      </div>
    </Box>
  );
};
