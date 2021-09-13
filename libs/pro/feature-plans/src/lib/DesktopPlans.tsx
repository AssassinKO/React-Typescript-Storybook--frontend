import React, { FC } from 'react';
import { Plan } from '@homeproved/shared/data-access';
import styled from 'styled-components';
import { FeaturesColumn } from './desktop/FeaturesColumn';
import { PlanColumn } from './desktop/PlanColumn';
import { PlanUid } from './util/helpers';

type DesktopPlanProps = {
  plans: Plan[];
  excludeFree: boolean;
  onSelectPlan: () => void;
};

const Wrapper = styled.div`
  display: flex;
  padding: 3rem 0;
  width: 100%;
  max-width: 120rem;
`;

export const DesktopPlans: FC<DesktopPlanProps> = ({ plans, excludeFree, onSelectPlan }) => {
  return plans.length === 0 ? null : (
    <Wrapper>
      <FeaturesColumn plan={plans[0].data} />
      {plans.map((plan, index) => {
        if (plan.data.uid === PlanUid.FREE && excludeFree) return null;
        return (
          <PlanColumn
            key={index}
            plan={plan.data}
            popular={plan.data.uid === PlanUid.PLUS}
            onSelectPlan={onSelectPlan}
          />
        );
      })}
    </Wrapper>
  );
};
