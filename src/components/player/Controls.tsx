import { Track } from '@/utils';
import { ActionIcon, Box } from '@mantine/core';
import { FiPause, FiPlay, FiRepeat, FiShuffle, FiSkipBack, FiSkipForward } from 'react-icons/fi';

interface PlayerControls {
  isPaused: boolean;
  next?: () => Promise<void>;
  previous?: () => Promise<void>;
  shuffle?: () => Promise<void>;
  tracks: Partial<[Track[], Track[]]>;
  togglePlay?: () => Promise<void>;
}

export const PlayerControls = (props: PlayerControls) => {
  const TogglePlayIcon = props.isPaused ? FiPlay : FiPause;
  const [previous, next] = props.tracks;

  const onPlayClicked = () => {
    props.togglePlay?.();
  };

  return (
    <Box className="flex justify-center items-center">
      <ActionIcon
        onClick={props.shuffle}
        // disabled={!previous || !next}
        mr={10}
        size={40}
        variant="light"
        radius="xl"
        color="teal"
      >
        <FiShuffle className="ml-px" size={20} color="gray" />
      </ActionIcon>
      <ActionIcon
        onClick={props.previous}
        mx={10}
        size={40}
        variant="light"
        radius="xl"
        color="teal"
        disabled={!previous?.length}
      >
        <FiSkipBack className="ml-px" size={20} color="gray" />
      </ActionIcon>
      <ActionIcon
        onClick={onPlayClicked}
        mx={10}
        size={45}
        variant="light"
        radius="xl"
        color="teal"
      >
        <TogglePlayIcon className="ml-px" size={25} color="gray" />
      </ActionIcon>
      <ActionIcon
        onClick={props.next}
        mx={10}
        size={45}
        variant="light"
        radius="xl"
        color="teal"
        disabled={!next?.length}
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
