import prisma from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'PUT' || 'PATCH') {
    try {
      const { title, description } = req.body;
      const { identifier } = req.query;
      if (!title && !description)
        return res.json({ message: 'no data given', ok: false });

        
      const updatePost = await prisma.post.update({
        where: {
          id: identifier as string
        },
        data: {
          title,
          description
        },
        include: {
          users: {
            select: {
              username: true
            }
          }
        }
      });

      if (
        updatePost.title === title &&
        updatePost.description === description
      ) {
        return res.json({ message: 'Post is kept the same', ok: true });
      }

      return res
        .status(200)
        .json({ post: updatePost, message: 'updated post', ok: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: (error as Error).message, ok: false });
    }
  }
}
