import { BASE_URL } from '@/utils';

type GenericObj = { [key: string]: any };
type FetcherOpts = Partial<
  Omit<RequestInit, "body"> & { body?: GenericObj | null }
>;

export const fetcher = async (
  url: string,
  isLocal = true,
  opts: FetcherOpts = {
    method: "GET",
  }
) => {
  const body = JSON.stringify(opts.body ?? {});
  const fullUrl = isLocal ? url : `${BASE_URL}${url}`;
  return await fetch(fullUrl, {
    ...opts,
    ...(opts.body ? { body } : null),
  } as RequestInit);
};
