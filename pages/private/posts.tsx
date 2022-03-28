import PageContainer from '@/layout/Main';
import prisma from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { account } from '@/types/interfaces';
import {
  Alert,
  Badge,
  Button,
  Card,
  Group,
  Skeleton,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { withIronSessionSsr } from 'iron-session/next';
import Router from 'next/router';
import { useState } from 'react';

const Post = ({ user }: { user: account }) => {
  const [message, setMessage] = useState('');
  const form = useForm({
    initialValues: {
      title: '',
      description: ''
    },

    validate: {
      title: (value) => (value === undefined ? 'Title is empty' : null),
      description: (value) =>
        value === undefined ? 'Description is empty' : null
    }
  });

  return (
    <PageContainer account={user}>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

      <Tabs>
        <Tabs.Tab label="Read">
          <Group spacing={20} grow direction="column">
            {user.posts ? (
              user.posts.map((post) => (
                <Card key={post.id} withBorder radius="lg" p="xl" shadow="sm">
                  <Title order={3}>{post.title}</Title>
                  <Badge>{user.username}</Badge>
                  <Text mt={30}>{post.description}</Text>
                </Card>
              ))
            ) : (
              <>
                <Skeleton height={20} radius="lg" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </>
            )}
          </Group>
        </Tabs.Tab>
        <Tabs.Tab label="Create">
          <Title order={2}>Create a post</Title>
          {message && (
            <Alert title="Success!" color="green" my={10}>
              {message}
            </Alert>
          )}

          <form
            onSubmit={form.onSubmit(async (values, event) => {
              event.preventDefault();

              await axios.post('/api/post/create', values).then((res) => {
                setMessage(res.data.message);
                Router.push('/private/posts');
              });
            })}
          >
            <Group direction="column" grow style={{ maxWidth: '75%' }}>
              <TextInput
                label="Your Title"
                mt="sm"
                required
                {...form.getInputProps('title')}
              />
              <Textarea
                mt="sm"
                label="Your Description"
                minRows={5}
                required
                {...form.getInputProps('description')}
              />
              <Button type="submit" mt={20}>
                Create
              </Button>
            </Group>
          </form>
        </Tabs.Tab>
      </Tabs>
    </PageContainer>
  );
};

export default Post;

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {} as any
    };
  }

  const userData = await prisma.user.findFirst({
    where: { username: user.username },
    select: {
      username: true,
      email: true,
      role: true,
      posts: true
    }
  });

  return {
    props: { user: { ...userData, isLoggedIn: true } }
  };
},
sessionOptions);
