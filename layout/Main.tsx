import { AppShell, Container, Paper } from '@mantine/core';
import Head from 'next/head';
import React, { FC } from 'react';
import { Heading, Navigation } from './Navigation';

interface MainProps {
  user?: boolean;
}

const PageContainer: FC<MainProps> = (props) => {
  const { children, user = false, ...customMeta } = props;

  const meta = {
    title: 'Next Prisma - template',
    description: 'Authentication app that combines front-end & back-end',
    ...customMeta
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />

        <meta content={meta.description} name="description" />

        <meta property="og:site_name" content="Sander van Ast" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />

        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>
      <Paper>
        <AppShell
          padding="md"
          header={<Heading />}
          navbar={user ? <Navigation /> : undefined}
        >
          <Container>{children}</Container>
        </AppShell>
      </Paper>
    </>
  );
};

export default PageContainer;
