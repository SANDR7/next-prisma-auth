import PageContainer from '@/layout/Main';
import {
  Anchor,
  Button,
  Group,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Login } from 'tabler-icons-react';

const Home: NextPage = () => {
  const theme = useMantineTheme();
  return (
    <PageContainer>
      <div>
        <Title order={1}>
          The{' '}
          <Text component="span" color="green" inherit>
            Application for you
          </Text>{' '}
          <br />
          by Sander van Ast
        </Title>
        <Text color={theme.colors.gray[5]} mt={10} style={{ width: '75%' }}>
          Build fully functional accessible web applications with ease. Mantine
          includes more than 100 customizable components and hooks to cover you
          in any situation
        </Text>
      </div>
      <Group mt={70}>
        <Anchor component={Link} href="/login">
          <Button leftIcon={<Login />}>Login</Button>
        </Anchor>
        <Anchor component={Link} href="/register">
          <Button variant="outline">Register</Button>
        </Anchor>
      </Group>
    </PageContainer>
  );
};

export default Home;
