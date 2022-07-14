import { ActionIcon, Card, Image, Text, Title, Transition, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import React from 'react';
import { FiPlay } from 'react-icons/fi';

import { Track } from '../utils';

interface TrackCard {
  track: Track;
}

export const TrackCard = ({ track }: TrackCard) => {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Card className="cursor-pointer" ref={ref} shadow="sm" p="lg" radius={10}>
      <Card.Section>
        <Image
          src={track.album.images?.[0].url ?? ""}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Text my={10} lineClamp={1} component={Title} order={4}>
        {track.name}
      </Text>

      <Text
        size="sm"
        className={`text-[${secondaryColor}] leading-6`}
        color="dimmed"
      >
        {track.artists?.[0].name}
      </Text>

      <Transition
        mounted={hovered}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <ActionIcon
            mt={14}
            color="teal"
            size="xl"
            radius="xl"
            variant="filled"
            className="absolute top-[95px] right-2"
            style={styles}
          >
            <FiPlay className="ml-1" color="white" size={20} />
          </ActionIcon>
        )}
      </Transition>
    </Card>
  );
};
