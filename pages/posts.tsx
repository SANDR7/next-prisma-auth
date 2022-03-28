import PageContainer from '@/layout/Main';
import prisma from '@/lib/prisma';
import { Badge, Card, Group, Text, Title } from '@mantine/core';
import { post } from '@prisma/client';
import React from 'react';

interface withUser extends post {
  users: { username: string };
}

const Posts = ({ posts }: { posts: withUser[] }) => {
  return (
    <PageContainer>
      <Group direction="column" grow>
        {posts &&
          posts.map((post) => (
            <Card key={post.id} withBorder radius="lg" p="xl" shadow="sm">
              <Title order={3}>{post.title}</Title>
              <Badge>{post.users.username}</Badge>
              <Text mt={30}>{post.description}</Text>
            </Card>
          ))}
      </Group>
    </PageContainer>
  );
};

export default Posts;

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    include: {
      users: {
        select: {
          username: true
        }
      }
    }
  });

  return {
    props: {
      posts
    }
  };
};
