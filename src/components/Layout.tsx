import { AppShell, Container } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

import { Header } from './Header';
import { Player } from './player/Player';
import { SideNav } from './SideNav';

interface LayoutProps {}

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <AppShell
        padding="md"
        navbar={<SideNav />}
        header={<Header />}
        styles={(theme) => ({
          body: { height: "calc(100vh - 100px)" },
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
      <Container fluid className="h-[100px] bg-neutral-800 text-white">
        <Player />
      </Container>
    </>
  );
};
