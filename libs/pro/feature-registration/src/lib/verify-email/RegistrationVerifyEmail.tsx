import React, { FC, useEffect } from 'react';
import { Button, DancingScriptQuote } from '@homeproved/shared/ui';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getErrorMessage, useQueryFetch } from '@homeproved/shared/data-access';
import { useRouter } from 'next/router';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useSnackbar } from 'notistack';

type RegistrationVerifyEmailProps = {
  id: string;
  hash: string;
  expires: string;
  signature: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0 6rem 0;
`;

const ThankYouMessage = styled.div`
  display: flex;
  margin-bottom: 4rem;
`;

const ThumbsUp = styled.div`
  margin-left: 1.5rem;
  width: 5rem;

  img {
    width: 100%;
  }
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
`;

const ThanksDescription = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 300;
  margin-bottom: 6rem;
  text-align: center;
  max-width: 60rem;
`;

export const RegistrationVerifyEmail: FC<RegistrationVerifyEmailProps> = ({
  id,
  hash,
  expires,
  signature,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const translationBaseKey = 'app.pro.pages.registration.steps.verifyEmail';
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const apiRoute = `/api/auth/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`;
  const { query } = useQueryFetch('verify-email', apiRoute, {
    options: {
      enabled: false,
      retry: false,
    },
  });

  useEffect(() => {
    if (query.isSuccess) {
      closeSnackbar();
      router.push(getPath('/registration/thanks')).then();
    }
    if (query.isError) {
      enqueueSnackbar(getErrorMessage(query, t), {
        variant: 'error',
      });
    }
  }, [closeSnackbar, enqueueSnackbar, getPath, query, router, t]);

  return (
    <Wrapper>
      <ThankYouMessage>
        <DancingScriptQuote quote={t(`${translationBaseKey}.quote`)} color="dark" size={4.8} />
        <ThumbsUp>
          <img src="/approved2.png" alt="" />
        </ThumbsUp>
      </ThankYouMessage>
      <Title>{t(`${translationBaseKey}.title`)}</Title>
      <ThanksDescription>
        {ReactHtmlParser(t(`${translationBaseKey}.description`))}
      </ThanksDescription>
      <Button size="large" onClick={() => query.refetch().then()}>
        {t(`${translationBaseKey}.verifyBtn`)}
      </Button>
    </Wrapper>
  );
};
