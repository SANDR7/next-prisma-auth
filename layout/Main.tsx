import { ifUser } from '@/lib/session';
import { AppShell, Container, Paper } from '@mantine/core';
import Head from 'next/head';
import Router from 'next/router';
import React, { FC } from 'react';
import { Heading, Navigation } from './Navigation';

interface MainProps {
  user?: any;
}

const PageContainer: FC<MainProps> = (props) => {
  const { children,  ...customMeta } = props;
 
  const { user } = ifUser({}) as {
    user: { isLoggedIn: boolean; username: string };
  };


  const meta = {
    title: `Next Prisma - template`,
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
          navbar={user?.isLoggedIn && Router.asPath !== '/' ? <Navigation /> : undefined}
        >
          {user.isLoggedIn ? children: (
            <Container>{children}</Container>
          )}
        </AppShell>
      </Paper>
    </>
  );
};

export default PageContainer;
