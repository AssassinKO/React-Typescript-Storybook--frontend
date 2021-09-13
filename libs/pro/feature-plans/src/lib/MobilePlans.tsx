import React, { FC, useMemo, useState } from 'react';
import { Plan, PlanData, usePersistentData } from '@homeproved/shared/data-access';
import styled from 'styled-components';
import { Tabs } from './mobile/Tabs';
import { PlanUid } from './util/helpers';
import { MobilePlan } from './mobile/MobilePlan';
import Link from 'next/link';
import { AllFeaturesLink } from './styling';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { MobilePlanSummary } from './mobile/MobilePlanSummary';
import { Button } from '@homeproved/shared/ui';

type MobilePlanProps = {
  plans: Plan[];
  excludeFree: boolean;
  onSelectPlan: () => void;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 49rem;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

export const MobilePlans: FC<MobilePlanProps> = ({ plans, excludeFree, onSelectPlan }) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const { setSelectedPlan: setPersistedPlan } = usePersistentData();
  const [selectedPlan, setSelectedPlan] = useState(PlanUid.PLUS);
  const selectedPlanData: PlanData | undefined = useMemo(() => {
    const planByUId = plans.find((plan) => plan.data.uid === selectedPlan);
    return planByUId?.data;
  }, [plans, selectedPlan]);

  const handleSelectPlan = () => {
    setPersistedPlan(selectedPlanData);
    onSelectPlan();
  };

  return selectedPlanData == null ? null : (
    <Wrapper>
      <Tabs
        plans={plans}
        excludeFree={excludeFree}
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
      />
      <MobilePlan plan={selectedPlanData} onSelectPlan={handleSelectPlan} />
      <CenterWrapper>
        <Link href={getPath('/')} passHref>
          <AllFeaturesLink>{t('app.pro.pages.landing.pricing.all_features')}</AllFeaturesLink>
        </Link>
      </CenterWrapper>
      <MobilePlanSummary plan={selectedPlanData} />
      <CenterWrapper>
        <Button variant="gradient" onClick={handleSelectPlan}>
          {t('app.pro.pages.landing.pricing.select')}
        </Button>
      </CenterWrapper>
    </Wrapper>
  );
};
