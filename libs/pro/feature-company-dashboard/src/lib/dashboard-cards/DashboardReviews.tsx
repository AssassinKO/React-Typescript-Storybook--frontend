import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  Label,
  Amount,
  StyledButtonWrapper,
  StyledButton,
  NoResultLabel,
  NoResultTitle,
  Text,
  StyledA,
} from './Atoms';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import Link from 'next/link';

export interface DashboardReviewsProps {
  amount: number;
  getPath: GetPathFunction;
  isMobile: boolean;
}

export const DashboardReviews: FC<DashboardReviewsProps> = ({ amount, getPath, isMobile }) => {
  const { t } = useTranslation();

  return (
    <Wrapper amount={amount} isMobile={isMobile}>
      {amount > 0 && (
        <>
          <Label marginBottom isMobile={isMobile}>
            {t('app.pro.pages.dashboard.totalReviews')}
          </Label>
          <img src="./dashboard-icon-review.png" alt={t('app.pro.pages.dashboard.totalReviews')} />
        </>
      )}
      {amount === 0 &&
        (isMobile ? (
          <>
            <img
              src="./dashboard-icon-review.png"
              alt={t('app.pro.pages.dashboard.totalReviews')}
            />
            <Label isMobile>{t('app.pro.pages.dashboard.reviewTime')}</Label>
            <Text>
              {t('app.pro.pages.dashboard.noReviewsMobile')}
              <Link passHref href={getPath('/')}>
                <StyledA href={getPath('/')}>
                  {t('app.pro.pages.dashboard.noReviewsMobileLink')}
                </StyledA>
              </Link>
            </Text>
          </>
        ) : (
          <>
            <NoResultTitle>{t('app.pro.pages.dashboard.reviewTime')}</NoResultTitle>
            <NoResultLabel isMobile={isMobile}>
              {t('app.pro.pages.dashboard.noReviews')}
            </NoResultLabel>
          </>
        ))}
      {amount > 0 && <Amount>{amount}</Amount>}
      {!isMobile && (
        <StyledButtonWrapper>
          {amount === 0 ? (
            <StyledButton variant={'light'} size={'small'}>
              {t('app.pro.pages.dashboard.tenTips')}
            </StyledButton>
          ) : (
            <StyledButton variant={'light'} size={'small'} href={getPath('/invitation')}>
              {t('app.pro.pages.dashboard.inviteClients')}
            </StyledButton>
          )}
        </StyledButtonWrapper>
      )}
    </Wrapper>
  );
};
