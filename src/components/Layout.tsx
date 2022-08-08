import { Header } from '@/components/Header';
import { Player } from '@/components/player/Player';
import { SideNav } from '@/components/SideNav';
import Login from '@/pages/login';
import { authActions, playlistActions, useAppDispatch } from '@/state';
import { isAuthenticated } from '@/utils';
import { AppShell, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useEffect, useState } from 'react';

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useMantineTheme();
  const smallBreak = theme.breakpoints.sm;
  const isLargerScreen = useMediaQuery(`(max-width:${smallBreak}px)`, false);
  const [sidebarOpened, setSidebarOpened] = useState(!isLargerScreen);

  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session || isAuthenticated(session)) return;
    dispatch(authActions.signOutFromApp());
  }, [dispatch, session]);

  useEffect(() => {
    if (!session || !isAuthenticated(session)) return;
    dispatch(playlistActions.fetchPlaylists());
  }, [dispatch, session]);

  useEffect(() => {
    setSidebarOpened(!isLargerScreen);
  }, [isLargerScreen]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated" || !session || !isAuthenticated(session)) {
    return <Login />;
  }

  return (
    <>
      <AppShell
        fixed
        navbar={
          <SideNav
            sidebarOpened={sidebarOpened}
            setSidebarOpened={setSidebarOpened}
          />
        }
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
