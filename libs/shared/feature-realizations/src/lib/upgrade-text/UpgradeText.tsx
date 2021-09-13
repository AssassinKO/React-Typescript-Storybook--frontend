import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

export interface UpgradeTextProps {
  text: string;
  getPath: GetPathFunction;
}

const Wrapper = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Text = styled.div`
  max-width: 35rem;
  margin: 2rem 0;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    text-align: center;
    margin: 2rem auto;
  }
  span {
    margin-right: 0.5rem;
    font-size: 3rem;
    font-family: ${({ theme }) => theme.config.fonts.DancingScript};
    line-height: 1;
  }
`;

const PackagesLink = styled.div`
  display: table;
  margin-top: 1rem;
  text-decoration: underline;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const UpgradeText: FC<UpgradeTextProps> = ({ text, getPath }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Wrapper>
      <Text>{ReactHtmlParser(text)}</Text>
      <Button pill={false} arrow="none" href={getPath('/my-account')}>
        {t('app.pro.pages.realizations.upgrade')}
      </Button>
      <PackagesLink onClick={() => router.push('/')}>
        {t('app.pro.pages.realizations.viewPackages')}
      </PackagesLink>
    </Wrapper>
  );
};

export default UpgradeText;
