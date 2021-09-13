import React, { useContext } from 'react';
import { User } from '../types';

type AuthContextType = {
  jwt: string | null;
  setJwt: (jwt: string | null, rememberMe?: boolean, expiresIn?: number) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  jwt: null,
  setJwt: () => null,
  user: null,
  setUser: () => null,
});

export const useAuthContext = () => useContext(AuthContext);
