import { Divider, Navbar, ScrollArea, Title } from '@mantine/core';
import React from 'react';

import { useAppSelector } from '../utils/state/hooks';
import { selectPlaylists } from '../utils/state/playlists/playlists.reducer';
import { SideNavListItem } from './SideNavListItem';

interface SideNavProps {
  sidebarOpened: boolean;
}

export const SideNav = (props: SideNavProps) => {
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
        <Navbar height="calc(100vh - 100px)" width={{ base: 250 }} p="sm">
          <Navbar.Section mt="xs">
            <Title px="sm" className="whitespace-nowrap" order={2}>
              Slick Spot
            </Title>
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
