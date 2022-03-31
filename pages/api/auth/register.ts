import prisma from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { user } from '@prisma/client';
import { hash } from 'bcrypt';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Invalid request', ok: false });

  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.json({ message: 'No data given', ok: false });

  try {
    const checkTakenUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email
        }
      }
    });

    if (!email.includes('.') || !email.includes('@')) {
      return res.json({ message: 'format is unvalid', ok: false });
    }

    if (checkTakenUser) {
      return res.json({
        message: 'User already exists (email is used)',
        ok: false
      });
    }

    if (password.length < 6) {
      return res.json({ message: 'password is too short', ok: false });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'USER'
      }
    });
    req.session.user = user as user;

    await req.session.save();

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: (error as Error).message, ok: false });
  }
}
