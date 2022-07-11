import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { setCookie } from 'cookies-next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '../utils/state/store';

interface ProvidersProps {
  colorScheme: ColorScheme;
  session: Session;
}

export const Providers = ({
  children,
  ...props
}: PropsWithChildren<ProvidersProps>) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme,
        }}
      >
        <SessionProvider session={props.session} refetchInterval={0}>
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
