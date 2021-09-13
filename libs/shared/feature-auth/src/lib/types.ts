import { NextComponentType, NextPage, NextPageContext } from 'next';
import { AppProps as NextAppProps } from 'next/app';
import { PageWithAuthorizationProps } from './PageAuthenticationWrapper';

type AnyObject = Record<string, unknown>

export type ComponentWithAuthorization<C = NextPageContext, IP = AnyObject, P = AnyObject> = NextComponentType<
  C,
  IP,
  P
>;

export interface AppProps<P = AnyObject> extends NextAppProps<P> {
  Component: ComponentWithAuthorization<NextPageContext, unknown, P> & PageWithAuthorization;
}

export type PageWithAuthorization<P = AnyObject, IP = P> = NextPage<P, IP> & PageWithAuthorizationProps;
