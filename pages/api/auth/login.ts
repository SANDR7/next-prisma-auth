// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { validateString } from '@/lib/xss';
import { user } from '@prisma/client';
import { compare } from 'bcrypt';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from 'lib/prisma';
import { sessionOptions } from 'lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Invalid request' });

  const { email, password } = req.body;
  var html = validateString(email);
  console.log(html);

  const loggedInUser = await prisma.user.findFirst({
    where: { email },
    select: { id: true, username: true, role: true }
  });
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        username: true,
        password: true
      }
    });

    const verifyPassword = await compare(
      password,
      findUser?.password as string
    );

    if (!verifyPassword)
      return res.json({ message: 'Invalid Credentials', ok: false });

    req.session.user = loggedInUser as user;

    await req.session.save();

    return res.status(200).json({ ...loggedInUser, ok: true });
  } catch (error) {
    if (loggedInUser?.id === undefined)
      return res.json({ message: "User doesn't exists", ok: false });
    return res
      .status(500)
      .json({ message: (error as Error).message, ok: false });
  }
}
