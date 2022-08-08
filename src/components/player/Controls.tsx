import { ActionIcon, Box } from '@mantine/core';
import { FiPause, FiPlay, FiRepeat, FiShuffle, FiSkipBack, FiSkipForward } from 'react-icons/fi';

interface PlayerControls {
  player?: Spotify.Player;
  isPaused: boolean;
}

export const PlayerControls = ({ player, isPaused }: PlayerControls) => {
  const TogglePlayIcon = isPaused ? FiPlay : FiPause;
  const wat = () => {
    console.log("wat");
    player?.togglePlay();
  };
  return (
    <Box className="flex justify-center items-center">
      <ActionIcon
        disabled
        mr={10}
        size={40}
        variant="light"
        radius="xl"
        color="teal"
      >
        <FiShuffle className="ml-px" size={20} color="gray" />
      </ActionIcon>
      <ActionIcon
        onClick={() => player?.previousTrack()}
        mx={10}
        size={40}
        variant="light"
        radius="xl"
        color="teal"
      >
        <FiSkipBack className="ml-px" size={20} color="gray" />
      </ActionIcon>
      <ActionIcon
        onClick={wat}
        mx={10}
        size={45}
        variant="light"
        radius="xl"
        color="teal"
      >
        <TogglePlayIcon className="ml-px" size={25} color="gray" />
      </ActionIcon>
      <ActionIcon
        onClick={() => player?.nextTrack()}
        mx={10}
        size={45}
        variant="light"
        radius="xl"
        color="teal"
      >
        <FiSkipForward className="ml-px" size={25} color="gray" />
      </ActionIcon>
      <ActionIcon
        disabled
        ml={10}
        size={40}
        variant="light"
        radius="xl"
        color="teal"
      >
        <FiRepeat className="ml-px" size={20} color="gray" />
      </ActionIcon>
    </Box>
  );
};
