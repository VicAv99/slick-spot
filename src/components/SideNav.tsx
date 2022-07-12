import { Burger, Divider, Navbar, ScrollArea, Title, useMantineTheme } from '@mantine/core';
import React from 'react';

import { useAppSelector } from '../utils/state/hooks';
import { selectPlaylists } from '../utils/state/playlists/playlists.reducer';
import { SideNavListItem } from './SideNavListItem';

interface SideNavProps {
  sidebarOpened: boolean;
  setSidebarOpened: (sidebarOpened: (o: boolean) => boolean) => void;
}

export const SideNav = (props: SideNavProps) => {
  const theme = useMantineTheme();
  const playlists = useAppSelector((state) => selectPlaylists(state.playlists));
  const links = [
    { label: "Home" },
    { label: "Search" },
    { label: "Browse" },
    { label: "My Albums" },
  ];

  return (
    <>
      {props.sidebarOpened && (
        <Navbar
          fixed
          position={{ top: 1, bottom: 1010 }}
          width={{ base: 250 }}
          p="sm"
          height="calc(100% - 60px)"
        >
          <Navbar.Section className="flex justify-between items-center" mt="xs">
            <Title px="sm" className="whitespace-nowrap" order={2}>
              Slick Spot
            </Title>
            <Burger
              opened={props.sidebarOpened}
              onClick={() => props.setSidebarOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </Navbar.Section>

          <Navbar.Section mt="xs">
            {links.map((playlist) => (
              <SideNavListItem key={playlist.label} label={playlist.label} />
            ))}
          </Navbar.Section>

          <Divider />

          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {playlists.map((playlist) => (
              <SideNavListItem key={playlist.id} label={playlist.name} />
            ))}
          </Navbar.Section>
        </Navbar>
      )}
    </>
  );
};
