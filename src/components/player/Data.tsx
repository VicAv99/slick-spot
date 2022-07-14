import { ActionIcon, Box, Image, Text } from '@mantine/core';
import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { MdPictureInPicture } from 'react-icons/md';

import { Track } from '../../utils/models';

interface PlayerDataProps {
  isLargerScreen: boolean;
  track: Partial<Track>;
}

export const PlayerData = (props: PlayerDataProps) => {
  const classes = `flex items-center ${
    props.isLargerScreen ? "justify-between" : "justify-start"
  }`;

  if (!props.track?.name) return <Box className={classes} />;

  return (
    <Box className={classes}>
      <div className="flex items-center">
        <Image
          src={props.track?.album?.images?.[0].url ?? ""}
          height={50}
          alt=""
        />
        <div className="flex flex-col mx-2">
          <Text size="md" weight={800}>
            {props.track.name}
          </Text>
          <Text size="sm" weight={500}>
            {props.track.artists?.[0].name}
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
