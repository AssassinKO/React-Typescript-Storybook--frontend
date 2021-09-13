import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { PlanUid } from '@homeproved/pro/feature-plans';
import {
  Amount,
  Label,
  LabelCabrito,
  StyledButton,
  StyledButtonWrapper,
  Text,
  Wrapper,
} from './Atoms';

export interface DashboardRealizationsProps {
  amount: number;
  remaining: number;
  getPath: GetPathFunction;
  plan: PlanUid;
  chargebeeUpgrade: () => void;
  isMobile: boolean;
}

export const DashboardRealizations: FC<DashboardRealizationsProps> = ({
  amount,
  remaining,
  getPath,
  plan,
  chargebeeUpgrade,
  isMobile,
}) => {
  const { t } = useTranslation();

  return plan === PlanUid.FREE ? (
    <Wrapper amount={0} isMobile={isMobile}>
      <img
        src="./dashboard-icon-realisations.png"
        alt={t('app.pro.pages.dashboard.totalRealizations')}
      />
      <LabelCabrito isMobile={isMobile}>
        {t('app.pro.pages.dashboard.realizationsLabel')}
      </LabelCabrito>
      <Text>
        {isMobile
          ? t('app.pro.pages.dashboard.realizationsTextMobile')
          : t('app.pro.pages.dashboard.realizationsText')}
      </Text>
      <StyledButtonWrapper>
        <StyledButton
          size={'small'}
          onClick={chargebeeUpgrade}
          data-cb-type="checkout"
          data-cb-item-0="TEAM-ONLINE-EUR-Monthly"
        >
          {t('app.pro.pages.dashboard.upgrade')}
        </StyledButton>
      </StyledButtonWrapper>
    </Wrapper>
  ) : (
    <Wrapper amount={amount} isMobile={isMobile}>
      {amount > 0 && (
        <Label marginBottom isMobile={isMobile}>
          {t('app.pro.pages.dashboard.totalRealizations')}
        </Label>
      )}
      <img
        src="./dashboard-icon-realisations.png"
        alt={t('app.pro.pages.dashboard.totalRealizations')}
      />
      {amount === 0 ? (
        <>
          <LabelCabrito isMobile={isMobile}>
            {t('app.pro.pages.dashboard.realizationsLabel')}
          </LabelCabrito>
          <Text>
            {isMobile
              ? t('app.pro.pages.dashboard.realizationsTextMobile')
              : t('app.pro.pages.dashboard.realizationsText')}
          </Text>
        </>
      ) : (
        <Amount>{amount}</Amount>
      )}
      {!isMobile && (
        <StyledButtonWrapper>
          <StyledButton variant={'light'} size={'small'} href={getPath('/add-realization')}>
            {t('app.pro.pages.dashboard.addRealization')}
          </StyledButton>
        </StyledButtonWrapper>
      )}
    </Wrapper>
  );
};
