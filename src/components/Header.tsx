import {
  ActionIcon,
  Badge,
  Burger,
  Group,
  Header as MTHeader,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { signOut } from 'next-auth/react';
import React from 'react';
import { ChevronLeft, ChevronRight, MoonStars, Sun, UserCircle } from 'tabler-icons-react';

interface HeaderProps {
  largerScreen: boolean;
  sidebarOpened: boolean;
  setSidebarOpened: (sidebarOpened: (o: boolean) => boolean) => void;
}

export const Header = (props: HeaderProps) => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const ThemeIcon = colorScheme === "dark" ? Sun : MoonStars;
  const toggleTheme = () => toggleColorScheme();
  const leftPosition = props.largerScreen ? 0 : 250;
  const logout = () => signOut();

  return (
    <MTHeader
      fixed={!props.largerScreen}
      position={{ left: leftPosition, right: 0 }}
      height={50}
      px={20}
      className="min-w-[300px]"
    >
      {props.largerScreen ? (
        <Group className="h-full" px={20} position="left">
          <Burger
            opened={props.sidebarOpened}
            onClick={() => props.setSidebarOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
          {!props.sidebarOpened && (
            <Title px="sm" className="whitespace-nowrap" order={2}>
              Slick Spot
            </Title>
          )}
        </Group>
      ) : (
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
              onClick={logout}
              sx={{ paddingLeft: 0 }}
              size="xl"
              radius="xl"
              color="dark"
              leftSection={
                <UserCircle color="teal" strokeWidth={1} size={30} />
              }
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
      )}
    </MTHeader>
  );
};
