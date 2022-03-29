import PageContainer from '@/layout/Main';
import prisma from '@/lib/prisma';
import { ActionIcon, Badge, Card, Group, Text, Title } from '@mantine/core';
import { post } from '@prisma/client';
import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { Heart } from 'tabler-icons-react';

interface withUser extends post {
  users: { username: string };
}

const Posts = ({ posts }: { posts: withUser[] }) => {
  const [clicked, setClicked] = useState(true);
  return (
    <PageContainer>
      <Group direction="column" grow>
        {posts &&
          posts.map((post) => (
            <Card key={post.id} withBorder radius="lg" p="xl" shadow="sm">
              <Title order={3}>{post.title}</Title>
              <Group>
                <Badge>{post.likes} likes</Badge>
                <Badge>{post.users.username}</Badge>
              </Group>
              <Text mt={30}>{post.description}</Text>

              <ActionIcon
                variant="outline"
                mt={30}
                p={4}
                color="red"
                onClick={async () => {
                  setClicked(!clicked);
                  await axios
                    .put(`/api/post/likes?identifier=${post.id}`, {
                      currentLikes: post.likes,
                      clicked: clicked
                    })
                    .then(() => Router.push('/posts'));
                }}
              >
                <Heart />
              </ActionIcon>
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
