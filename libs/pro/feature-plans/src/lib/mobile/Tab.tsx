import React, { FC } from 'react';
import { PlanData } from '@homeproved/shared/data-access';
import styled from 'styled-components';
import { SvgIcon } from '@homeproved/shared/ui';
import { getIconByPlanUid, getIconColorByPlanUid } from '../util/helpers';
import { useTheme } from '@material-ui/core';

type TabProps = {
  plan: PlanData;
  selected: boolean;
  onClick: () => void;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Icon = styled(({ selected, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ selected, theme }) =>
    selected ? 'none' : `solid .1rem ${theme.palette.grey['700']}`};
  padding: 1.5rem;
  border-radius: 50%;
  background: ${({ selected, theme }) => (selected ? theme.config.gradients.default : '#FFF')};
`;

const Name = styled.div`
  font-weight: 700;
  margin-top: 1rem;
`;

export const Tab: FC<TabProps> = ({ plan, selected, onClick }) => {
  const theme = useTheme();

  return (
    <Wrapper onClick={onClick}>
      <Icon selected={selected}>
        <SvgIcon
          icon={getIconByPlanUid(plan.uid)}
          color={selected ? '#FFF' : getIconColorByPlanUid(plan.uid, theme)}
          size={selected ? 3.2 : 3}
        />
      </Icon>
      <Name>{plan.name}</Name>
    </Wrapper>
  );
};
