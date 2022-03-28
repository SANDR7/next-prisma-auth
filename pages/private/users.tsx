import PageContainer from '@/layout/Main';
import prisma from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { account } from '@/types/interfaces';
import { ScrollArea, Table } from '@mantine/core';
import { user } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import React from 'react';

const Users = ({ user, allUser }: { user: account; allUser: account[] }) => {
  const rows = allUser.map((row: any) => (
    <tr key={row.username}>
      <td>{row.username}</td>
      <td>{row.email}</td>
      <td>{row.role}</td>
      <td>{row?._count?.posts}</td>
    </tr>
  ));

  return (
    <PageContainer account={user}>
      <ScrollArea sx={{ height: 800 }}>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Post Amount</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </PageContainer>
  );
};

export default Users;

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res
}) {
  const user = req.session.user as user;

  if (user === undefined || user.role === 'USER') {
    res.setHeader('location', '/private/dashboard');
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

  const allUser = await prisma.user.findMany({
    select: {
      username: true,
      role: true,
      email: true,
      _count: {
        select: {
          posts: true
        }
      }
    }
  });

  return {
    props: { user: { ...userData, isLoggedIn: true }, allUser }
  };
},
sessionOptions);
