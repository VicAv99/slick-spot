import { AppShell, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import React, { PropsWithChildren, useState } from 'react';
import { useEffect } from 'react';

import Login from '../pages/login';
import { useAppDispatch } from '../utils/state/hooks';
import { fetchPlaylists } from '../utils/state/playlists/playlists.actions';
import { Header } from './Header';
import { Player } from './player/Player';
import { SideNav } from './SideNav';

interface LayoutProps {}

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const smallBreak = theme.breakpoints.sm;
  const isLargerScreen = useMediaQuery(`(max-width:${smallBreak}px)`, false);
  const [sidebarOpened, setSidebarOpened] = useState(!isLargerScreen);
  const bodyHeight = isLargerScreen ? 130 : 80;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      dispatch(fetchPlaylists(session));
    }
  }, [session?.user?.email]);

  useEffect(() => {
    setSidebarOpened(!isLargerScreen);
  }, [isLargerScreen]);

  if (session?.status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.status === "unauthenticated") {
    return <Login />;
  }

  return (
    <>
      <AppShell
        fixed
        navbar={<SideNav sidebarOpened={sidebarOpened} />}
        header={
          <Header
            largerScreen={isLargerScreen}
            sidebarOpened={sidebarOpened}
            setSidebarOpened={setSidebarOpened}
          />
        }
        footer={<Player />}
        styles={(theme) => ({
          body: { height: `100%` },
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <div className="h-full">{children}</div>
      </AppShell>
    </>
  );
};
