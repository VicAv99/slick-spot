export const isAuthenticated = async (session: any | null) => {
  const sessionExpired =
    Math.floor(Date.now()) >= (session.user as any).expires_at * 1000;
  return !session || sessionExpired ? false : true;
};
