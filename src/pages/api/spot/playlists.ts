import { AppSession, fetcher } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const playlists = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as AppSession;

  if (!session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const playlists = await fetcher(
    `/users/${session?.user?.sub}/playlists`,
    false,
    {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );

  res.status(200).json(await playlists.json());
};

export default playlists;
