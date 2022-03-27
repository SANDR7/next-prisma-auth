import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export type User = {
  isLoggedIn: boolean
  login: string
  avatarUrl: string
}

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    return res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    return res.json({
      isLoggedIn: false,
    })
  }
}
