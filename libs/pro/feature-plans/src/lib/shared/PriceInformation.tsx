import React, { FC } from 'react';
import styled from 'styled-components';
import { PlanData } from '@homeproved/shared/data-access';
import { useTranslation } from 'react-i18next';

type PriceInformationProps = {
  plan: PlanData;
  perMonthNoticeInline?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: bold;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Currency = styled.div`
  font-size: 1.6rem;
`;

const Amount = styled.div`
  font-size: 4rem;
`;

const PerMonthNotice = styled(({ hidden, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  text-align: center;
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
`;

const InlinePerMonthNotice = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  font-weight: 300;
`;

export const PriceInformation: FC<PriceInformationProps> = ({
  plan,
  perMonthNoticeInline = false,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Price>
        <Currency>&euro;</Currency>
        <Amount>{plan.price / 100}</Amount>
        {perMonthNoticeInline && (
          <InlinePerMonthNotice>{t('plans.perMonthInline')}</InlinePerMonthNotice>
        )}
      </Price>
      <PerMonthNotice hidden={plan.price === 0}>
        {!perMonthNoticeInline && <span>{t('plans.perMonth')}</span>}
        <span>{t('plans.exTav')}</span>
      </PerMonthNotice>
    </Wrapper>
  );
};
