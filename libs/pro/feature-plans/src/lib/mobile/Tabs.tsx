import React, { FC } from 'react';
import styled from 'styled-components';
import { Plan } from '@homeproved/shared/data-access';
import { Tab } from './Tab';
import { PlanUid } from '../util/helpers';

type TabsProps = {
  plans: Plan[];
  excludeFree: boolean;
  selectedPlan: string;
  onSelectPlan: (planUid: PlanUid) => void;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Tabs: FC<TabsProps> = ({ plans, excludeFree, selectedPlan, onSelectPlan }) => {
  return (
    <Wrapper>
      {plans.map((plan, index) => {
        if (plan.data.uid === PlanUid.FREE && excludeFree) return null;
        return (
          <Tab
            key={index}
            plan={plan.data}
            selected={selectedPlan === plan.data.uid}
            onClick={() => onSelectPlan(plan.data.uid as PlanUid)}
          />
        );
      })}
    </Wrapper>
  );
};
