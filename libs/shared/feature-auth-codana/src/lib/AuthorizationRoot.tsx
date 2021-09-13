import React, { FC, useEffect, useState } from 'react';
import { AuthContext } from './AuthorizationContext';
import { useCookies } from 'react-cookie';
import moment, { Moment } from 'moment';
import { User } from '../types';

type Props = {
  autoLogin: React.ReactElement;
  cookieName?: string;
  cookieDomain?: string;
};

const COOKIE_NAME = 'app_jwt';

export const AuthorizationRoot: FC<Props> = ({
  children,
  autoLogin,
  cookieDomain,
  cookieName = COOKIE_NAME,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

  const cookie = cookies[cookieName];
  const [jwt, setJwt] = useState<string>(cookie);
  const [expiresIn, setExpiresIn] = useState<Moment>();
  const [user, setUser] = useState<User | undefined>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (cookie) {
      setJwt(cookie);
    } else {
      removeCookie(cookieName);
    }
    setInitialized(true);
  }, [setJwt, setInitialized, cookie, removeCookie, cookieName]);

  useEffect(() => {
    if (initialized) {
      if (jwt) {
        setCookie(cookieName, jwt, {
          expires: expiresIn?.toDate(),
          path: '/',
          domain: cookieDomain,
        });
      } else {
        removeCookie(cookieName, {
          path: '/',
          domain: cookieDomain,
        });
      }
    }
  }, [initialized, jwt, setCookie, expiresIn, removeCookie, cookieName, cookieDomain]);

  const updateJwt = (jwt: string, rememberMe = false, expiresIn: number) => {
    setJwt(jwt);
    setExpiresIn(rememberMe ? moment().add(expiresIn, 'seconds') : undefined);
  };

  return (
    <AuthContext.Provider value={{ jwt, setJwt: updateJwt, user, setUser }}>
      {jwt && !user ? React.cloneElement(autoLogin, { children }) : children}
    </AuthContext.Provider>
  );
};
