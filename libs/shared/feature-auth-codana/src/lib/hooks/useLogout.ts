import {useAuthContext} from "../AuthorizationContext";

export const useLogout = () => {
  const { setJwt, setUser } = useAuthContext();
  return () => {
    setJwt(null);
    setUser(null);
  };
};
