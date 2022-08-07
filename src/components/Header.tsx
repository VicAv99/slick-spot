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
import React from 'react';
import { FiChevronLeft, FiChevronRight, FiMoon, FiSun, FiUser } from 'react-icons/fi';

import { signOutFromApp } from '../state/auth/auth.actions';
import { useAppDispatch } from '../state/state.models';

interface HeaderProps {
  largerScreen: boolean;
  sidebarOpened: boolean;
  setSidebarOpened: (sidebarOpened: (o: boolean) => boolean) => void;
}

export const Header = (props: HeaderProps) => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const ThemeIcon = colorScheme === "dark" ? FiSun : FiMoon;
  const toggleTheme = () => toggleColorScheme();
  const leftPosition = props.largerScreen ? 0 : 250;
  const logout = () => dispatch(signOutFromApp());

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
              <FiChevronLeft size={25} color="teal" />
            </ActionIcon>
            <ActionIcon color="dark" size="lg" radius="xl" variant="outline">
              <FiChevronRight size={25} color="teal" />
            </ActionIcon>
          </Group>
          <Group className="h-full" px={20} position="right">
            <Badge
              onClick={logout}
              sx={{ paddingLeft: 0 }}
              size="xl"
              radius="xl"
              color="dark"
              leftSection={<FiUser color="teal" strokeWidth={1} size={30} />}
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
