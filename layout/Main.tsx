import { Account } from '@/types/interfaces';
import { AppShell, Container, Paper } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Heading, Navigation } from './Navigation';

const PageContainer: FC<Account> = (props ) => {
  const { children, account, ...customMeta } = props;

  const router = useRouter();
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
          header={<Heading account={account} />}
          navbar={
            account?.isLoggedIn && router.asPath !== '/' ? (
              <Navigation account={account} />
            ) : undefined
          }
        >
          {account?.isLoggedIn ? children : <Container>{children}</Container>}
        </AppShell>
      </Paper>
    </>
  );
};

export default PageContainer;
