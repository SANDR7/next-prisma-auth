import { account } from '@/types/interfaces';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Header,
  Navbar,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Logout, Moon, Sun } from 'tabler-icons-react';

const PageItem = ({
  label,
  link,
  icon,
  compact = true,
  onClick
}: {
  label: string;
  link: string;
  compact?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  const router = useRouter();
  return (
    <Anchor component={Link} href={link}>
      <Button
        variant={router.asPath === link ? 'light' : 'subtle'}
        rightIcon={icon}
        compact={compact}
        onClick={onClick}
      >
        {label}
      </Button>
    </Anchor>
  );
};

export const Navigation = ({ account }: { account: account }) => {
  const theme = useMantineTheme();
  return (
    <Navbar width={{ lg: 400, sm: 300, xs: 200 }} p="lg">
      <Navbar.Section>
        <Group>
          <Avatar radius="xl" color={theme.primaryColor}>
            {account.username.substring(0, 2).toUpperCase()}
          </Avatar>
          <Title order={2}>
            Welcome,{' '}
            <Text component="span" inherit transform="capitalize">
              {account.username || 'Imposter'}
              <Text color="gray">Type: {account.role || 'nothing'}</Text>
            </Text>
          </Title>
        </Group>
      </Navbar.Section>
      <Navbar.Section grow mt="xl">
        <Group position="right" direction="column" grow>
          <PageItem label="Account" link="/dashboard" compact={false} />
          <PageItem label="Posts" link="/dashboard/posts" compact={false} />
          {account.role === 'ADMIN' && (
            <PageItem label="Users" link="/dashboard/users" compact={false} />
          )}
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export const Heading = ({ account }: { account: account | undefined }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const router = useRouter();
  return (
    <Header height={60} p="lg">
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start'
        }}
      >
        {/* return user ? account nav : static nav */}
        {account?.isLoggedIn ? (
          <>
            <Anchor component={Link} href="/dashboard">
              <Box style={{ cursor: 'pointer' }}>The App</Box>
            </Anchor>
            <Group position="right">
              <PageItem
                label="Logout"
                link="/"
                icon={<Logout size={16} />}
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
            <Anchor component={Link} href="/">
              <Box style={{ cursor: 'pointer' }}>The App</Box>
            </Anchor>
            <Group position="right">
              <PageItem label="Home" link="/" />
              <PageItem label="Posts" link="/posts" />
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
