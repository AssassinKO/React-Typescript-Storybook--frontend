import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@homeproved/shared/feature-forms';

const Terms = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

type AcceptGDPRFieldProps = {
  value: boolean;
  onChange: (checked: boolean) => void;
};

export const AcceptGDPRField: FC<AcceptGDPRFieldProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <Terms>
      <Checkbox
        value={value}
        onChange={onChange}
        label={t('app.pro.pages.invitation.gdprAccept')}
        align="flex-start"
        height={2}
      />
    </Terms>
  );
};
