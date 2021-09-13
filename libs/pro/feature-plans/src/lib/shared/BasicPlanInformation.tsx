import React, { FC } from 'react';
import { SvgIcon } from '@homeproved/shared/ui';
import { getIconByPlanUid, getIconColorByPlanUid } from '../util/helpers';
import styled, { useTheme } from 'styled-components';
import { PlanData } from '@homeproved/shared/data-access';
import { useTranslation } from 'react-i18next';

type BasicPlanInformationProps = {
  plan: PlanData;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NamePrefix = styled.div`
  font-size: 1.8rem;
  padding-top: 1.5rem;
`;

const Name = styled.div`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 700;
`;

export const BasicPlanInformation: FC<BasicPlanInformationProps> = ({ plan }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Wrapper>
      <SvgIcon
        icon={getIconByPlanUid(plan.uid)}
        size={4}
        color={getIconColorByPlanUid(plan.uid, theme)}
      />
      <NamePrefix>{t('plans.namePrefix')}</NamePrefix>
      <Name>{plan.name.toUpperCase()}</Name>
    </Wrapper>
  );
};
