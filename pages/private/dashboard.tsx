import PageContainer from '@/layout/Main';
import prisma from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { account } from '@/types/interfaces';
import { withIronSessionSsr } from 'iron-session/next';

const Dashboard = ({ user }: { user: account }) => {
  return (
    <PageContainer account={user}>
      <pre>{JSON.stringify(user, null, 2)}</pre>
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
