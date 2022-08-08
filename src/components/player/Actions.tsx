import { useAsync } from '@/utils';
import { ActionIcon, Box, Slider } from '@mantine/core';
import { useEffect } from 'react';
import { FiMic, FiVolume2 } from 'react-icons/fi';

interface PlayerActionsProps {
  isLargerScreen: boolean;
  player: Spotify.Player;
}

export const PlayerActions = (props: PlayerActionsProps) => {
  const { value: defVolume, execute } = useAsync(
    props.player?.getVolume,
    false
  );
  const classes = `flex items-center ${
    props.isLargerScreen ? "justify-between" : "justify-end"
  }`;

  useEffect(() => {
    if (!props.player) return;
    execute();
  }, [execute, props.player]);

  console.log(defVolume);

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
          min={0}
          max={1}
          step={0.1}
          value={defVolume ?? 0}
          className={`w-[160px]`}
          size="xs"
          color="teal"
          marks={[{ value: 50 }]}
        />
      </div>
    </Box>
  );
};
