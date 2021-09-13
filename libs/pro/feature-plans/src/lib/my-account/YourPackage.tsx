import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';
import { Feature } from '../feature/Feature';
import { PlanUid } from '../util/helpers';
import { PlanData } from '@homeproved/shared/data-access';

export interface YourPackageProps {
  plan: PlanUid;
  teamPlan: PlanData;
  isMobile: boolean;
}

const Wrapper = styled(({ isMobile, plan, ...restProps }) => <div {...restProps} />)`
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: 1rem;
  flex-basis: 28rem;
  margin: ${({ isMobile, plan }) => (isMobile ? '0 0 2rem' : plan === 'team' ? '0' : '0 2rem 0 0')};

  ${({ plan, isMobile }) =>
    plan === 'team' &&
    !isMobile &&
    `
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `};
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
  font-size: 2.6rem;
  text-align: center;
  display: table;
  margin: 2rem auto;
  position: relative;

  &:after {
    content: '';
    background: url('./curved-arrow-down.svg') no-repeat;
    width: 2.8rem;
    height: 4.2rem;
    display: block;
    position: absolute;
    top: 50%;
    right: -3rem;
  }
`;

const PlanWrapper = styled.div`
  text-align: center;
`;

const Plan = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 600;
  font-size: 2.6rem;
  text-transform: uppercase;
`;

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  border: solid ${({ theme }) => theme.palette.grey['A400']};
  border-width: 0.1rem 0;
  display: inline-block;
  padding: 0.5rem 2rem;

  span {
    font-size: 1rem;
    font-weight: 400;
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
  }
`;

const Features = styled.div`
  margin-top: 2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1rem;
`;

const Image = styled.img`
  display: block;
  margin: 2rem auto 0;
  max-width: 90%;
`;

export const YourPackage: FC<YourPackageProps> = ({ plan, teamPlan, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const freeFeatures: string[] = t('app.pro.pages.upgradeModal.freeFeatures', {
    returnObjects: true,
    defaultValue: [],
  });

  return (
    <Wrapper isMobile={isMobile} plan={plan}>
      <Title>{t('app.pro.pages.myAccount.yourPackage')}</Title>
      <PlanWrapper>
        <SvgIcon
          icon={plan === PlanUid.TEAM ? Icons.HELMET_SOLID : Icons.QUOTE}
          color={plan === PlanUid.TEAM ? 'gradient' : theme.palette.grey['A400']}
        />
        <div>{'Homeproved'}</div>
        <Plan>{plan}</Plan>
        <Price>
          {plan === PlanUid.FREE ? '€0' : `€${teamPlan.price / 100}`}
          <span>{t('app.pro.pages.upgradeModal.perMonth')}</span>
        </Price>
      </PlanWrapper>
      {plan === PlanUid.FREE ? (
        <Features>
          {freeFeatures.map((feature, index) => (
            <Feature
              key={index}
              title={feature['title']}
              text={feature['text']}
              isMobile={isMobile}
            />
          ))}
        </Features>
      ) : (
        <Image src={'./team-plan.png'} alt="" />
      )}
    </Wrapper>
  );
};
