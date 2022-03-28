import prisma from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method == 'POST') {
    const { title, description } = req.body;

    if (!title && !description)
      return res.json({ message: 'no data given', ok: false });

    try {
       await prisma.user.update({
        where: {
          id: req?.session?.user?.id as string
        },
        data: {
          posts: {
            create: {
              title,
              description
            }
          }
        },
        select: {
          username: true,
          posts: {
            select: {
              id: true,
              title: true,
              description: true
            }
          }
        }
      });

      return res.status(200).json({ message: 'post created', ok: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: (error as Error).message, ok: false });
    }
  }
}
