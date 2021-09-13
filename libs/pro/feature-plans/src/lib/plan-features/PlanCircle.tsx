import React, { FC } from 'react';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { Circle, Homeproved, Price, Small, Team } from './Atoms';
import { PlanUid } from '../util/helpers';
import { PlanData } from '@homeproved/shared/data-access';

type PlanFeaturesProps = {
  plan: PlanUid;
  teamPlan: PlanData;
  modal?: boolean;
  isMobile?: boolean;
  screenTwo?: boolean;
};

export const PlanCircle: FC<PlanFeaturesProps> = ({
  plan,
  teamPlan,
  modal = false,
  isMobile = false,
  screenTwo = false,
}) => {
  const { t } = useTranslation();

  return (
    <Circle isMobile={isMobile} screenTwo={modal ? false : screenTwo}>
      <SvgIcon icon={Icons.HELMET_SOLID} color={'#fff'} size={4.5} />
      <Homeproved>{'Homeproved'}</Homeproved>
      <Team>{'TEAM'}</Team>
      <Price>
        {`€${teamPlan.price / 100}`}
        <Small>{t('app.pro.pages.upgradeModal.perMonth')}</Small>
      </Price>
      <Small>{t('app.pro.pages.upgradeModal.exVat')}</Small>
    </Circle>
  );
};
