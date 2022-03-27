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
      <Title order={1} style={{textAlign: "center"}}>
        The{' '}
        <Text component="span" color="green" inherit>
          Application for you
        </Text>{' '}
        by Sander van Ast
      </Title>
      <Group mt={70} position="center">
        <Anchor component={Link} href="/login">
          <Button leftIcon={<Login />} variant="subtle">
            Login
          </Button>
        </Anchor>
        <Button color="grape" component="a">
          Register
        </Button>
      </Group>
    </PageContainer>
  );
};

export default Home;
