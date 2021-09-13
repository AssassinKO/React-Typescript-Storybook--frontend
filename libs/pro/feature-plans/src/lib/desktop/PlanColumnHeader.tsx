import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PlanData } from '@homeproved/shared/data-access';
import { tableColumnHeaderBase } from '../styling';
import { BasicPlanInformation } from '../shared/BasicPlanInformation';

type PlanColumnHeaderProps = {
  plan: PlanData;
  popular: boolean;
};

const Wrapper = styled.div`
  ${tableColumnHeaderBase};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;
`;

const PopularCorner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 12rem;
  height: 12rem;
  overflow: hidden;
`;

const PopularCornerInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.config.gradients.default};
  transform: translate(50%, -50%) rotate(45deg);
  color: white;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-weight: bolder;
  font-size: 1.4rem;
  padding-bottom: 0.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const PlanColumnHeader: FC<PlanColumnHeaderProps> = ({ plan, popular }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {popular && (
        <PopularCorner>
          <PopularCornerInner>{t('app.pro.pages.landing.pricing.popular')}</PopularCornerInner>
        </PopularCorner>
      )}
      <BasicPlanInformation plan={plan} />
    </Wrapper>
  );
};
