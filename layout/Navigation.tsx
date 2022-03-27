import { ifUser } from '@/lib/session';
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Header,
  Navbar,
  useMantineColorScheme
} from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { Moon, Sun } from 'tabler-icons-react';

export const Navigation = () => {
  return <Navbar width={{ base: 300 }}>Navigation</Navbar>;
};

export const Heading = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { user } = ifUser({});

  const PageItem = ({
    label,
    link,
    onClick
  }: {
    label: string;
    link: string;
    onClick?: () => void;
  }) => (
    <Anchor component={Link} href={link}>
      <Button variant="light" compact onClick={onClick}>
        {label}
      </Button>
    </Anchor>
  );

  // Static nav
  // return user ? account nav : static nav
  return user?.isLoggedIn ? (
    <Header height={60} p="lg">
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>Welcome, {user.username}</Box>
        <Group position="right">
          <PageItem
            label="Logout"
            link="/"
            onClick={async () =>
              (await axios.post('/api/auth/logout')) && Router.push('/')
            }
          />
          <ActionIcon
            variant="outline"
            ml={4}
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  ) : (
    <Header height={60} p="lg">
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>The App</Box>
        <Group position="right">
          <PageItem label="Home" link="/" />
          <PageItem label="About" link="/#" />
          <ActionIcon
            variant="outline"
            ml={4}
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
};
