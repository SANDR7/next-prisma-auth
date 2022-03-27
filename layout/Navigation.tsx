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
  Text,
  Title,
  useMantineColorScheme
} from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { Moon, Sun } from 'tabler-icons-react';

export const Navigation = () => {
  const { user } = ifUser({}) as {
    user: { isLoggedIn: boolean; username: string };
  };

  return (
    <Navbar width={{ base: 300 }} p="lg">
      <Navbar.Section>
        <Title order={2}>
          Welcome,{' '}
          <Text component="span" inherit style={{textTransform: 'capitalize'}}>
            {user.username}
          </Text>
        </Title>
      </Navbar.Section>
      <Navbar.Section grow mt="xl">
        <Group position="right" direction="column" grow>
          <Button variant="light">Account</Button>
          <Button variant="light">Account</Button>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export const Heading = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { user } = ifUser({}) as {
    user: { isLoggedIn: boolean; username: string };
  };

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

  return (
    <Header height={60} p="lg">
      <Container
        style={{
          display: 'flex',
          justifyContent: user.isLoggedIn ? 'end' : 'space-between',
          alignItems: 'center'
        }}
      >
        {/* return user ? account nav : static nav */}
        {user?.isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </Header>
  );
};
