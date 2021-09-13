import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import styled from 'styled-components';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { PlanData } from '@homeproved/shared/data-access';
import { IconButton, Icons } from '@homeproved/shared/ui';
import {
  AllFeaturesLink,
  tableCellBase,
  tableColumnFooterBase,
  tableColumnHeaderBase,
} from '../styling';
import { useTheme } from '@material-ui/core';

type FeaturesColumnProps = {
  plan: PlanData;
  mobile?: boolean;
};

const Wrapper = styled.div`
  flex-grow: 2;
`;

const Header = styled.div`
  ${tableColumnHeaderBase};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.grey['300']};
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  padding: 3rem 2rem;
  border-left: 0;
`;

const FeatureLabel = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  ${tableCellBase};
  position: relative;
  font-size: 1.6rem;
  border-left: 0;
  padding-left: ${({ mobile }) => (mobile ? 0 : '2rem')};
`;

const Footer = styled.div`
  ${tableColumnFooterBase};
  align-items: flex-start;
  padding: 2rem;
  border-left: 0;
`;

const InfoIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

export const FeaturesColumn: FC<FeaturesColumnProps> = ({ plan, mobile = false }) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  const theme = useTheme();

  return (
    <Wrapper>
      {!mobile && <Header>{t('app.pro.pages.landing.pricing.plans')}</Header>}
      <FeatureLabel mobile={mobile}>
        {t('plans.features.premiumProfile.title')}
        <InfoIcon>
          <IconButton
            icon={Icons.INFO}
            size={1.5}
            variant="transparent"
            iconColor={theme.palette.grey['300']}
            tooltip={t(`plans.features.premiumProfile.description`)}
          />
        </InfoIcon>
      </FeatureLabel>
      {Object.keys(plan.features).map((key, index) => (
        <FeatureLabel key={index} mobile={mobile}>
          {t(`plans.features.${key}.title`)}
          <InfoIcon>
            <IconButton
              icon={Icons.INFO}
              size={1.5}
              variant="transparent"
              iconColor={theme.palette.grey['300']}
              tooltip={t(`plans.features.${key}.description`)}
            />
          </InfoIcon>
        </FeatureLabel>
      ))}
      {!mobile && (
        <Footer>
          <Link href={getPath('/')} passHref>
            <AllFeaturesLink>{t('app.pro.pages.landing.pricing.all_features')}</AllFeaturesLink>
          </Link>
        </Footer>
      )}
    </Wrapper>
  );
};
