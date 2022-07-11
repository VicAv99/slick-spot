import '../styles/globals.css';

import { ColorScheme } from '@mantine/core';
import { getCookie } from 'cookies-next';
import App, { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '../components/Layout';
import { Providers } from '../components/Providers';

export default function SCApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Slick Spot</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Providers colorScheme={pageProps?.colorScheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}

App.getInitialProps = async (context) => {
  const pageProps = await App.getInitialProps(context);
  return {
    ...pageProps,
    colorScheme: getCookie("mantine-color-scheme", context.ctx) || "light",
  };
};