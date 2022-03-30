import PageContainer from '@/layout/Main';
import prisma from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { account } from '@/types/interfaces';
import {
  Badge,
  Button,
  Card,
  Group,
  Modal,
  Notification,
  Skeleton,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';
import axios from 'axios';
import { withIronSessionSsr } from 'iron-session/next';
import Router from 'next/router';
import { useState } from 'react';
import { Check, X } from 'tabler-icons-react';

const Post = ({ user }: { user: account }) => {
  const [message, setMessage] = useState('');
  const [okMessage, setOkMessage] = useState<boolean>();
  const [opened, setOpened] = useState<string | null>('');

  const modals = useModals();

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
  const UpdateForm = useForm({
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

  const openDeleteModal = (id: string | undefined) =>
    modals.openConfirmModal({
      title: 'Delete your post',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your post? This action is destructive
          and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete Post', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () =>
        await axios
          .delete(`/api/post/delete?identifier=${id}`)
          .finally(() => Router.push('/dashboard/posts'))
    });
  return (
    <PageContainer account={user}>
      {okMessage == undefined ? null : okMessage ? (
        <Notification
          icon={<Check size={18} />}
          color="teal"
          my={30}
          title="Success!"
          disallowClose
        >
          {message}
        </Notification>
      ) : (
        <Notification
          icon={<X size={18} />}
          color="red"
          my={30}
          title="Bummer!"
        >
          {message}
        </Notification>
      )}
      <Tabs>
        <Tabs.Tab label="Read">
          <Group spacing={20} grow direction="column">
            {user.posts ? (
              user.posts.map((post) => (
                <div key={post.id}>
                  <Modal
                    opened={opened === post.id ? true : false}
                    onClose={() => setOpened('')}
                    title="Edit post"
                    centered
                  >
                    <form
                      onSubmit={UpdateForm.onSubmit(async (values, event) => {
                        event.preventDefault();

                        await axios
                          .put(`/api/post/update?identifier=${post.id}`, values)
                          .then((res) => {
                            setOkMessage(res.data.ok);

                            setMessage(res.data.message);

                            Router.push('/dashboard/posts');
                          })
                          .finally(() => {
                            UpdateForm.reset();
                            setOpened('');
                            setTimeout(() => setOkMessage(undefined), 8000);
                          });
                      })}
                    >
                      <Group direction="column" grow>
                        <TextInput
                          label="Your Title"
                          mt="sm"
                          required
                          {...UpdateForm.getInputProps('title')}
                        />
                        <Textarea
                          mt="sm"
                          label="Your Description"
                          minRows={5}
                          required
                          {...UpdateForm.getInputProps('description')}
                        />
                        <Button type="submit" mt={20}>
                          Update
                        </Button>
                      </Group>
                    </form>
                  </Modal>
                  <Card withBorder radius="lg" p="xl" shadow="sm">
                    <Title order={3}>{post.title}</Title>
                    <Badge>{user.username}</Badge>
                    <Text mt={30}>{post.description}</Text>
                    <Group position="right">
                      <Button
                        onClick={() => {
                          UpdateForm.setValues({
                            title: post.title,
                            description: post.description
                          });
                          setOpened(post.id);
                        }}
                      >
                        Edit post
                      </Button>
                      <Button
                        color="red"
                        onClick={() => openDeleteModal(post.id)}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </div>
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

          <form
            onSubmit={form.onSubmit(async (values, event) => {
              event.preventDefault();

              await axios
                .post('/api/post/create', values)
                .then((res) => {
                  setOkMessage(res.data.ok);
                  setMessage(res.data.message);
                  Router.push('/dashboard/posts');
                })
                .finally(() => {
                  form.reset();
                  setTimeout(() => setOkMessage(undefined), 8000);
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
