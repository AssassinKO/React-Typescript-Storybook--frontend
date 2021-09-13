import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PlanUid } from '@homeproved/pro/feature-plans';
import {
  Amount,
  Label,
  StyledButton,
  StyledButtonWrapper,
  Total,
  Wrapper,
  LabelCabrito,
  Text,
} from './Atoms';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

export interface DashboardInvitationsProps {
  amount: number;
  remaining: number;
  plan: PlanUid;
  chargebeeUpgrade: () => void;
  getPath: GetPathFunction;
  isMobile: boolean;
}

export const DashboardInvitations: FC<DashboardInvitationsProps> = ({
  amount,
  remaining,
  plan,
  chargebeeUpgrade,
  getPath,
  isMobile,
}) => {
  const { t } = useTranslation();

  return plan === PlanUid.FREE ? (
    <Wrapper amount={0} isMobile={isMobile}>
      <img src="./dashboard-icon-invites.png" alt={t('app.pro.pages.dashboard.sentInvitations')} />
      <LabelCabrito isMobile={isMobile}>{t('app.pro.pages.dashboard.emailLabel')}</LabelCabrito>
      <Text>
        {isMobile
          ? t('app.pro.pages.dashboard.emailTextMobile')
          : t('app.pro.pages.dashboard.emailText')}
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
          {t('app.pro.pages.dashboard.sentInvitations')}
        </Label>
      )}
      <img src="./dashboard-icon-invites.png" alt={t('app.pro.pages.dashboard.sentInvitations')} />
      {amount === 0 && (
        <>
          <LabelCabrito isMobile={isMobile}>{t('app.pro.pages.dashboard.emailLabel')}</LabelCabrito>
          <Text>
            {isMobile
              ? t('app.pro.pages.dashboard.emailTextMobile')
              : t('app.pro.pages.dashboard.emailText')}
          </Text>
        </>
      )}
      {amount > 0 && (
        <>
          <Amount>{amount}</Amount>
          {!isMobile && <Total>{`${t('app.pro.pages.dashboard.remaining')}: ${remaining}`}</Total>}
        </>
      )}
      {!isMobile && (
        <StyledButtonWrapper>
          <StyledButton variant={'light'} size={'small'} href={getPath('/invitation')}>
            {t('app.pro.pages.dashboard.inviteClients')}
          </StyledButton>
        </StyledButtonWrapper>
      )}
    </Wrapper>
  );
};
