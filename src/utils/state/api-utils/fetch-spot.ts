import { Session } from 'next-auth';

import { BASE_URL } from '../state.constants';

export const fetchSpot = async <T = any>(
  url: string,
  session: Session | { user: any } | null
): Promise<T & { items: T[] }> => {
  return await (
    await fetch(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  ).json();
};
