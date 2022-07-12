import { Session } from 'next-auth';

import { BASE_URL } from '../state.constants';

export const fetchSpot = async (
  url: string,
  session: Session | { user: any } | null,
  method = "GET",
  body?: any
) => {
  return await fetch(`${BASE_URL}${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
};
