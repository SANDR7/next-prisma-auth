import { Container, Header, Navbar } from '@mantine/core';
import React from 'react';

export const Navigation = () => {
  return <Navbar width={{base: 300}}>Navigation</Navbar>;
};

export const Heading = () => {
  return (
    <Header height={60} p="md">
      <Container>
      Heading
      </Container>
    </Header>
  );
};
