import prisma from '@/lib/prisma';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.session.user) {
    if (req.method === 'DELETE') {
      const { identifier } = req.query;
   
      await prisma.post.delete({
        where: { id: identifier as string }
      });

      return res.status(200).json({ message: 'User deleted', ok: true });
    }
    return res.json({
      ...req.session.user,
      isLoggedIn: true
    });
  } else {
    return res.json({
      isLoggedIn: false
    });
  }
}
