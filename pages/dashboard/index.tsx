import PageContainer from '@/layout/Main';
import prisma from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { account } from '@/types/interfaces';
import { Button, Text, Tabs, ScrollArea } from '@mantine/core';
import { useModals } from '@mantine/modals';
import axios from 'axios';
import { withIronSessionSsr } from 'iron-session/next';
import Router from 'next/router';
import { UserCircle, Code, Settings } from 'tabler-icons-react';

const Dashboard = ({ user }: { user: account }) => {
  const modals = useModals();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () =>
        await axios
          .delete(`/api/private/user?identifier=${user.id}`)
          .finally(() => Router.push('/'))
    });
  return (
    <PageContainer account={user}>
      <Tabs variant="pills">
        <Tabs.Tab label="Profile" icon={<UserCircle size={14} />}></Tabs.Tab>
        <Tabs.Tab label="Raw" icon={<Code size={14} />}>
          <ScrollArea style={{ width: 430, height: 500 }}>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </ScrollArea>
        </Tabs.Tab>
        <Tabs.Tab label="Settings" icon={<Settings size={14} />}>
          <Button onClick={openDeleteModal} color="red">
            Delete account
          </Button>
        </Tabs.Tab>
      </Tabs>
    </PageContainer>
  );
};

export default Dashboard;

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
    include: {
      posts: true
    }
  });

  return {
    props: { user: { ...userData, isLoggedIn: true } }
  };
},
sessionOptions);
