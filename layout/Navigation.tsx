import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Header,
  Navbar
} from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export const Navigation = () => {
  return <Navbar width={{ base: 300 }}>Navigation</Navbar>;
};

export const Heading = () => {
  const PageItem = ({ label, link }: { label: string; link: string }) => (
    <Anchor component={Link} href={link}>
      <Button variant="light" compact>
        {label}
      </Button>
    </Anchor>
  );
  return (
    <Header height={60} p="lg">
      <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box>
          The App
        </Box>
        <Group position='right'>
          <PageItem label="Home" link="/" />
          {/* <PageItem label="Login" link="/login" /> */}
          {/* <PageItem label="Register" link="/register" /> */}
          <PageItem label="About" link="/#" />
        </Group>
      </Container>
    </Header>
  );
};
