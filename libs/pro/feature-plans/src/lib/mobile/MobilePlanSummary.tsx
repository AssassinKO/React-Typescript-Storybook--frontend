import React, { FC } from 'react';
import { PlanData } from '@homeproved/shared/data-access';
import styled from 'styled-components';
import { PriceInformation } from '../shared/PriceInformation';
import { BasicPlanInformation } from '../shared/BasicPlanInformation';

type MobilePlanSummaryProps = {
  plan: PlanData;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border: 1px solid ${({ theme }) => theme.palette.grey['300']};
  border-radius: 0.5rem;
`;

const UnderlineWrapper = styled.div`
  padding-bottom: 1rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey['A200']};
  width: 10rem;
`;

export const MobilePlanSummary: FC<MobilePlanSummaryProps> = ({ plan }) => {
  return (
    <Wrapper>
      <UnderlineWrapper>
        <BasicPlanInformation plan={plan} />
      </UnderlineWrapper>
      <PriceInformation plan={plan} perMonthNoticeInline />
    </Wrapper>
  );
};
