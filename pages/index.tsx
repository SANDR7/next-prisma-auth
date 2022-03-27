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
      <Title order={1}>
        The{' '}
        <Text component="span" color="green" inherit>
          Application for you
        </Text>{' '} <br />
        by Sander van Ast
      </Title>
      <Group mt={70}>
        <Anchor component={Link} href="/login">
          <Button leftIcon={<Login />} variant="subtle">
            Login
          </Button>
        </Anchor>
        <Button component="a">
          Register
        </Button>
      </Group>
    </PageContainer>
  );
};

export default Home;
