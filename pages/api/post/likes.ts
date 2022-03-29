import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { identifier } = req.query;
  const { currentLikes, clicked } = req.body;
  if (req.method === 'PUT' || 'PATCH') {
    try {
      const post = await prisma.post.update({
        where: { id: identifier as string },
        data: { likes: clicked ? currentLikes + 1 : currentLikes - 1 }
      });

      return res.status(200).json({ ok: true, likes: post.likes });
    } catch (error) {
      return res
        .status(500)
        .json({ message: (error as Error).message, ok: false });
    }
  }

  return res.json({ message: 'wrong method' });
};

export default handler;
