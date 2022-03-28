import { account } from '@/types/interfaces';
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
import { useRouter } from 'next/router';
import React from 'react';
import { Moon, Sun } from 'tabler-icons-react';

export const Navigation = ({ account }: { account: account }) => {
  return (
    <Navbar width={{ base: 300 }} p="lg">
      <Navbar.Section>
        <Title order={2}>
          Welcome,{' '}
          <Text
            component="span"
            inherit
            transform='capitalize'
          >
            {account.username || "Imposter"}
            <Text color="gray">Type: {account.role || "nothing"}</Text>
          </Text>
        </Title>
      </Navbar.Section>
      <Navbar.Section grow mt="xl">
        <Group position="right" direction="column" grow>
          <Button variant="light">Account</Button>
          <Button variant="light">Posts</Button>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export const Heading = ({ account }: { account: account | undefined }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

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

  const router = useRouter();
  return (
    <Header height={60} p="lg">
      <Container
        style={{
          display: 'flex',
          justifyContent: account?.isLoggedIn ? 'end' : 'space-between',
          alignItems: 'center'
        }}
      >
        {/* return user ? account nav : static nav */}
        {account?.isLoggedIn ? (
          <>
            <Group position="right">
              <PageItem
                label="Logout"
                link="/"
                onClick={async () =>
                  (await axios.post('/api/auth/logout')) &&
                  router.push('/login')
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
            <Anchor component={Link} href="/" >
              <Box style={{ cursor: 'pointer' }}>The App</Box>
            </Anchor>
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
