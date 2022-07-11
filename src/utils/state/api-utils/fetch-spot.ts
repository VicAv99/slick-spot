import { Session } from 'next-auth';

import { BASE_URL } from '..';

export const fetchSpot = async (
  url: string,
  session: Session | { user: any } | null
) => {
  return await (
    await fetch(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  ).json();
};
