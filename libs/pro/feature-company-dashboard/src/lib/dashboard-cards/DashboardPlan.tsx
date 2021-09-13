import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { StyledButton, StyledButtonWrapper, Wrapper } from './Atoms';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';
import { PlanUid } from '@homeproved/pro/feature-plans';

export interface DashboardPlanProps {
  getPath: GetPathFunction;
  plan: PlanUid;
  isMobile: boolean;
}

const Label = styled(({ plan, isMobile, ...restProps }) => <div {...restProps} />)`
  display: table;
  margin: ${({ isMobile }) => (isMobile ? '1rem auto 0' : 'auto')};
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
  font-size: 2.2rem;
  position: relative;

  ${({ plan, isMobile }) =>
    plan &&
    `
    &:after {
      content: '';
      background: url('/plan_arrow.png') no-repeat;
      width: 1.9rem;
      height: 3rem;
      display: block;
      position: absolute;
      top: ${isMobile ? `-3rem` : `unset`};
      right: ${isMobile ? `-1rem` : `unset`};
      bottom: ${isMobile ? `unset` : `-2rem`};
      left: ${isMobile ? `unset` : `calc(100% + 1rem)`};
    }
  `}
`;

const PlanWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ isMobile }) => (isMobile ? '8rem' : '13.2rem')};
  height: ${({ isMobile }) => (isMobile ? '8rem' : '13.2rem')};
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['A400']};
  border-radius: 50%;
  margin: ${({ isMobile }) => (isMobile ? '0 auto' : '2rem auto 0')};
  padding: 1rem;
`;

const Homeproved = styled.div`
  font-size: 1.4rem;
  margin: 0.5rem 0 -0.5rem;
`;

const Plan = styled.div`
  font-size: 2.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 600;
  text-transform: uppercase;
`;

export const DashboardPlan: FC<DashboardPlanProps> = ({ getPath, plan, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Wrapper isMobile={isMobile}>
      {!isMobile && (
        <Label plan={plan === PlanUid.TEAM}>{t('app.pro.pages.dashboard.yourPlan')}</Label>
      )}
      <PlanWrapper isMobile={isMobile}>
        <SvgIcon
          icon={plan === PlanUid.TEAM ? Icons.HELMET_SOLID : Icons.QUOTE}
          size={isMobile ? 4.5 : 3.8}
          color={plan === PlanUid.TEAM ? 'gradient' : theme.palette.grey['A400']}
        />
        {!isMobile && (
          <>
            <Homeproved>{'Homeproved'}</Homeproved>
            <Plan>{plan}</Plan>
          </>
        )}
      </PlanWrapper>
      {!isMobile ? (
        <StyledButtonWrapper>
          <StyledButton href={getPath('/my-account')} variant={'light'} size={'small'}>
            {t('app.pro.pages.dashboard.yourAccount')}
          </StyledButton>
        </StyledButtonWrapper>
      ) : (
        <>
          <Label plan={plan === PlanUid.TEAM} isMobile={isMobile}>
            {t('app.pro.pages.dashboard.yourPlan')}
          </Label>
          <Plan>{plan}</Plan>
        </>
      )}
    </Wrapper>
  );
};
