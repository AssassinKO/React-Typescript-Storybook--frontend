import React from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { useRouter } from 'next/router';
import { RegistrationVerifyEmailPage } from '@homeproved/pro/feature-registration';

export const RegistrationVerifyEmail: PageWithAuthorization = () => {
  const router = useRouter();
  const { id, hash, expires, signature } = router.query;

  return (
    <RegistrationVerifyEmailPage
      id={id as string}
      hash={hash as string}
      expires={expires as string}
      signature={signature as string}
    />
  );
};

export default RegistrationVerifyEmail;
