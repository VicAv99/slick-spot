export const sessionExpired = (session: any | null) => {
  return Math.floor(Date.now()) >= (session?.user as any)?.expires_at * 1000;
};
