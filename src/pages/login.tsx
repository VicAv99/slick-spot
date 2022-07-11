import { AppShell, Button, Center, Header, MantineTheme, Title } from '@mantine/core';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "/", redirect: false });
  };
  const shellBg = (theme: MantineTheme) => ({
    main: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

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
