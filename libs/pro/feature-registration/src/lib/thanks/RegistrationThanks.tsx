import React, { FC } from 'react';
import { Button, DancingScriptQuote } from '@homeproved/shared/ui';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

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

export const RegistrationThanks: FC = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const translationBaseKey = 'app.pro.pages.registration.steps.thanks';

  return (
    <Wrapper>
      <ThankYouMessage>
        <DancingScriptQuote quote={t(`${translationBaseKey}.quote`)} color="dark" size={4.8} />
        <ThumbsUp>
          <img src="/approved2.png" alt="" loading="lazy" />
        </ThumbsUp>
      </ThankYouMessage>
      <Title>{t(`${translationBaseKey}.title`)}</Title>
      <ThanksDescription>
        {ReactHtmlParser(t(`${translationBaseKey}.description`))}
      </ThanksDescription>
      <Button size="large" href={getPath('/login')}>
        {t('app.pro.pages.login.title')}
      </Button>
    </Wrapper>
  );
};
