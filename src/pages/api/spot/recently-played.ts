import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { AppSession, fetcher, Track } from '../../../utils';

const recentlyPlayed = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as AppSession;

  if (!session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const tracks = await fetcher(`/me/player/recently-played`, false, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  const recentlyPlayedRes = await tracks.json();
  const recentlyPlayedTracks = recentlyPlayedRes.items.map(
    ({ track }: { track: Track }) => track
  );

  res.status(200).json(recentlyPlayedTracks);
};

export default recentlyPlayed;
