import { AppShell, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import React, { PropsWithChildren, useState } from 'react';
import { useEffect } from 'react';

import Login from '../pages/login';
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

  useEffect(() => {
    setSidebarOpened(!isLargerScreen);
  }, [isLargerScreen]);

  if (!session || session.status === "unauthenticated") {
    return <Login />;
  }

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppShell
        padding="md"
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
          body: { height: `calc(100vh - ${bodyHeight}px)` },
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <div className="mt-[60px]">{children}</div>
      </AppShell>
    </>
  );
};
