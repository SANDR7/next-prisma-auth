// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';
import type { user } from '@prisma/client';
import useSWR from 'swr';
import { useEffect } from 'react';
import Router from 'next/router';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'iron_prisma',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  }
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: user;
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ifUser = ({ redirectTo = '', redirectIfFound = false }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: user } = useSWR('/api/private/user', fetcher);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo, redirectIfFound]);

  return {user}
};
