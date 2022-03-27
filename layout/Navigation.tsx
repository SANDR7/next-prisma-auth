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
import Link from 'next/link';
import React from 'react';
import { Moon, Sun } from 'tabler-icons-react';

export const Navigation = () => {
  return <Navbar width={{ base: 300 }}>Navigation</Navbar>;
};

export const Heading = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const PageItem = ({ label, link }: { label: string; link: string }) => (
    <Anchor component={Link} href={link}>
      <Button variant="light" compact>
        {label}
      </Button>
    </Anchor>
  );

  // Static nav
  // return user ? account nav : static nav
  return (
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
          {/* <PageItem label="Login" link="/login" /> */}
          {/* <PageItem label="Register" link="/register" /> */}
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
