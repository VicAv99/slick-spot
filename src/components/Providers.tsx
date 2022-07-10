import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { setCookie } from 'cookies-next';
import React, { PropsWithChildren, useState } from 'react';

interface ProvidersProps {
  colorScheme: ColorScheme;
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
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
