import { UserData } from '@homeproved/shared/data-access';
export * from '@homeproved/shared-feature-auth-codana';
declare module '@homeproved/shared-feature-auth-codana' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends UserData {}
}
