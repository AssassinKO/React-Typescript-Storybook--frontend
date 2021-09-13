import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import { Checkbox } from './checkbox';
import { LabelWithLinks } from './LabelWithLinks';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

const Terms = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

type AcceptPolicyFieldProps = {
  control: Control<Record<string, unknown>>;
  comGetPath: GetPathFunction;
};

export const AcceptPolicyField: FC<AcceptPolicyFieldProps> = ({ control, comGetPath }) => {
  const { t } = useTranslation();

  return (
    <Controller
      name="acceptPolicy"
      control={control}
      defaultValue={false}
      render={({ onChange, value }) => (
        <Terms>
          <Checkbox
            value={value}
            onChange={onChange}
            label={
              <LabelWithLinks
                label={t('app.pro.pages.registration.steps.step1.checkboxes.acceptPolicy')}
                linksInLabel={[
                  {
                    label: t(
                      'app.pro.pages.registration.steps.step1.checkboxes.acceptPolicyLinks.terms'
                    ),
                    path: process.env.NEXT_PUBLIC_COM_URL + comGetPath('/terms-of-use'),
                    target: '_blank',
                  },
                  {
                    label: t(
                      'app.pro.pages.registration.steps.step1.checkboxes.acceptPolicyLinks.privacy'
                    ),
                    path: process.env.NEXT_PUBLIC_COM_URL + comGetPath('/privacy'),
                    target: '_blank',
                  },
                ]}
                options={{
                  linkUnderline: 'always',
                  linkWeight: 700,
                }}
              />
            }
          />
        </Terms>
      )}
    />
  );
};
