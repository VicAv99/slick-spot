import { AppShell, Button, Center, Header, MantineTheme, Title } from '@mantine/core';
import { FaSpotify } from 'react-icons/fa';

import { signInWithSpotify } from '../state/auth/auth.actions';
import { useAppDispatch } from '../state/state.models';

export default function Login() {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(signInWithSpotify());
  };
  const shellBg = (theme: MantineTheme) => ({
    main: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  });

  return (
    <AppShell fixed padding="md" styles={shellBg}>
      <Header height={50} p="xs">
        <Title px="sm" className="whitespace-nowrap" order={2}>
          Slick Spot
        </Title>
      </Header>
      <Center className="h-full">
        <Button
          onClick={handleLogin}
          leftIcon={<FaSpotify />}
          variant="outline"
          size="xl"
          uppercase
        >
          Log in with Spotify
        </Button>
      </Center>
    </AppShell>
  );
}
