import React, { FC } from 'react';
import { PlanData, usePersistentData } from '@homeproved/shared/data-access';
import { Button } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { tableColumnFooterBase } from '../styling';
import { PriceInformation } from '../shared/PriceInformation';

type PlanColumnFooterProps = {
  plan: PlanData;
  popular: boolean;
  onSelectPlan: () => void;
};

const Wrapper = styled.div`
  ${tableColumnFooterBase};
  flex-direction: column;
  align-items: center;
`;

const PriceInfoWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const PlanColumnFooter: FC<PlanColumnFooterProps> = ({ plan, popular, onSelectPlan }) => {
  const { t } = useTranslation();
  const { setSelectedPlan } = usePersistentData();

  const handleSelectPlan = () => {
    setSelectedPlan(plan);
    onSelectPlan();
  };

  return (
    <Wrapper>
      <PriceInfoWrapper>
        <PriceInformation plan={plan} />
      </PriceInfoWrapper>
      <Button variant={popular ? 'gradient' : 'light'} onClick={handleSelectPlan}>
        {t('app.pro.pages.landing.pricing.select')}
      </Button>
    </Wrapper>
  );
};
