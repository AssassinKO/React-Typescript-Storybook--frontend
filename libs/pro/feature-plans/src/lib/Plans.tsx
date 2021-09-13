import React, { FC } from 'react';
import { usePlans } from './hooks';
import { MobilePlans } from './MobilePlans';
import { DesktopPlans } from './DesktopPlans';

type PlansProps = {
  excludeFree?: boolean;
  onSelectPlan: () => void;
  mobile?: boolean;
};

export const Plans: FC<PlansProps> = ({ excludeFree = false, onSelectPlan, mobile }) => {
  const { plans } = usePlans();
  if (plans == null) return null;

  return mobile ? (
    <MobilePlans excludeFree={excludeFree} plans={plans} onSelectPlan={onSelectPlan} />
  ) : (
    <DesktopPlans excludeFree={excludeFree} plans={plans} onSelectPlan={onSelectPlan} />
  );
};
