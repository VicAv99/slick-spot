import { store } from '@/state/store';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { setCookie } from 'cookies-next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

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
    <SessionProvider session={props.session} refetchInterval={0}>
      <ReduxProvider store={store}>
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
            {children}
          </MantineProvider>
        </ColorSchemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};
