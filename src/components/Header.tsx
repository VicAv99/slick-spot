import { ActionIcon, Badge, Group, Header as MTHeader, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { ChevronLeft, ChevronRight, MoonStars, Sun, UserCircle } from 'tabler-icons-react';

export const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const ThemeIcon = colorScheme === "dark" ? Sun : MoonStars;
  const toggleTheme = () => toggleColorScheme();

  return (
    <MTHeader fixed position={{ left: 250, right: 0 }} height={50} px={20}>
      <Group className="h-full" px={20} position="apart">
        <Group className="h-full" px={20} position="left">
          <ActionIcon color="dark" size="lg" radius="xl" variant="outline">
            <ChevronLeft color="teal" />
          </ActionIcon>
          <ActionIcon color="dark" size="lg" radius="xl" variant="outline">
            <ChevronRight color="teal" />
          </ActionIcon>
        </Group>
        <Group className="h-full" px={20} position="right">
          <Badge
            sx={{ paddingLeft: 0 }}
            size="xl"
            radius="xl"
            color="dark"
            leftSection={<UserCircle color="teal" strokeWidth={1} size={30} />}
          >
            <Text variant="text" size="md">
              username
            </Text>
          </Badge>
          <ActionIcon
            variant="outline"
            color="teal"
            radius="xl"
            onClick={toggleTheme}
            size="lg"
          >
            <ThemeIcon size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </MTHeader>
  );
};
