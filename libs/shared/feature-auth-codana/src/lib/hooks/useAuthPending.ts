import { useUser } from './useUser';
import { useJwt } from './useJwt';

export const useAuthPending = () => {
  const user = useUser();
  const jwt = useJwt();

  return jwt && !user;
};
