import { AppSession, fetcher } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const player = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as AppSession;

  if (!session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  switch (req.method) {
    case "PUT": {
      await fetcher("/me/player/play", false);
      res.status(200);
    }
    default:
      res.setHeader("Allow", "[GET]");
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default player;
