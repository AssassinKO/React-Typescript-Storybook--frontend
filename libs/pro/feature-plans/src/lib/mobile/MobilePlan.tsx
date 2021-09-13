import React, { FC } from 'react';
import { PlanData } from '@homeproved/shared/data-access';
import { FeaturesColumn } from '../desktop/FeaturesColumn';
import styled from 'styled-components';
import { PlanColumn } from '../desktop/PlanColumn';

type MobilePlanProps = {
  plan: PlanData;
  onSelectPlan: () => void;
};

const Wrapper = styled.div`
  display: flex;
  padding: 3rem 0;
  width: 100%;
  max-width: 120rem;
`;

export const MobilePlan: FC<MobilePlanProps> = ({ plan, onSelectPlan }) => {
  return (
    <Wrapper>
      <FeaturesColumn plan={plan} mobile />
      <PlanColumn plan={plan} mobile onSelectPlan={onSelectPlan} />
    </Wrapper>
  );
};
