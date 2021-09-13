import React, { FC } from 'react';
import { PlanData } from '@homeproved/shared/data-access';
import styled, { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PlanColumnHeader } from './PlanColumnHeader';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { PlanColumnFooter } from './PlanColumnFooter';
import { tableCellBase } from '../styling';

type PlanColumnProps = {
  plan: PlanData;
  popular?: boolean;
  mobile?: boolean;
  onSelectPlan: () => void;
};

const Wrapper = styled(({ popular = false, ...restProps }) => <div {...restProps} />)`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  box-shadow: ${({ popular }) => (popular ? '0 0 1rem rgba(0, 0, 0, 0.17)' : 'none')};
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
`;

const Entry = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  ${tableCellBase};
  justify-content: center;
  font-size: 1.4rem;
  border-right: ${({ mobile }) => mobile && 'none'};
  min-width: ${({ mobile }) => mobile && '12rem'};
`;

export const PlanColumn: FC<PlanColumnProps> = ({
  plan,
  popular = false,
  mobile = false,
  onSelectPlan,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Wrapper popular={popular}>
      {!mobile && <PlanColumnHeader plan={plan} popular={popular} />}
      <Entry mobile={mobile}>
        <SvgIcon icon={Icons.STAR_SOLID} size={1.5} color={theme.palette['green'].light} />
      </Entry>
      {Object.entries(plan.features).map((entry, index) => {
        const value: number | boolean = entry[1];

        if (
          [
            'featWidgets',
            'featBrandedReview',
            'featSocialShare',
            'featOfflinePromo',
            'featTrustManager',
          ].includes(entry[0])
        ) {
          return (
            <Entry key={index} mobile={mobile}>
              {value === 0 ? (
                <>-</>
              ) : (
                <SvgIcon icon={Icons.STAR_SOLID} size={1.5} color={theme.palette['green'].light} />
              )}
            </Entry>
          );
        }

        if (value === 999999) {
          if (
            ['featRealisationsNr', 'featRealisationsInviteNr', 'featMobileInviteNr'].includes(
              entry[0]
            )
          )
            return (
              <Entry key={index} mobile={mobile}>
                {t('plans.unlimited')}
              </Entry>
            );
          if (entry[0] === 'featReviewRespondNr')
            return (
              <Entry key={index} mobile={mobile}>
                <SvgIcon icon={Icons.STAR_SOLID} size={1.5} color={theme.palette['green'].light} />
              </Entry>
            );
        }

        return (
          <Entry key={index} mobile={mobile}>
            {value}
          </Entry>
        );
      })}
      {!mobile && <PlanColumnFooter plan={plan} popular={popular} onSelectPlan={onSelectPlan} />}
    </Wrapper>
  );
};
