import { useCallback, useEffect, useState } from 'react';
import { PlanUid, usePlans } from '@homeproved/pro/feature-plans';
import { PlanData, usePersistentData } from '@homeproved/shared/data-access';

export const useRegistrationPlan = () => {
  const [noFreePlanFound, setNoFreePlanFound] = useState(false);
  const [registrationPlan, setRegistrationPlan] = useState<PlanData>();
  const { selectedPlan, setSelectedPlan } = usePersistentData();
  const { plans } = usePlans();

  useEffect(() => {
    if (plans == null) return;
    if (selectedPlan == null) {
      const freePlan = plans.find((plan) => plan.data.uid === PlanUid.FREE);
      if (freePlan == null) setNoFreePlanFound(true);
      setRegistrationPlan(freePlan?.data);
    } else {
      setRegistrationPlan(selectedPlan);
    }
  }, [plans, selectedPlan]);

  const clear = useCallback(() => setSelectedPlan(undefined), [setSelectedPlan]);

  return { registrationPlan, noFreePlanFound, clear };
};
