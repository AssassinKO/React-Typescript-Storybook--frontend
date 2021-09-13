import React, { FC } from 'react';
import styled from 'styled-components';
import { CompanyData } from '@homeproved/shared/data-access';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

export interface CertificatesProps {
  data: CompanyData;
  mobile?: boolean;
}

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  margin-top: 3rem;
  ${({ mobile }) => mobile && `justify-content: center;`}
`;

const Certificate = styled(({ type, ...restProps }) => <Typography {...restProps} />)`
  font-weight: 600;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin: 0 1rem;
  text-align: center;

  &:before {
    content: '';
    display: block;
    width: 4.8rem;
    height: 4.8rem;
    margin: 0 auto 1rem;
    border-radius: 50%;
    border: 0.1rem solid ${({ theme }) => theme.palette.grey['500']};
    background-image: ${({ type }) =>
      type === 'iso' ? `url('/iso.png')` : type === 'vca' ? `url('/vca.png')` : `url('/atg.png')`};
    background-position: center;
    background-repeat: no-repeat;
  }
  span {
    display: block;
  }
`;

export const Certificates: FC<CertificatesProps> = ({ data, mobile }) => {
  const { t } = useTranslation();

  return (
    <Wrapper mobile={mobile}>
      {!!data.vca && <Certificate type={'vca'}>VCA</Certificate>}
      {!!data.iso9001 && (
        <Certificate type={'iso'} variant={'body1'}>
          ISO 9001 <span>{t('app.com.pages.company.companyShell.quality')}</span>
        </Certificate>
      )}
      {!!data.iso14001 && (
        <Certificate type={'iso'}>
          ISO 14001 <div>{t('app.com.pages.company.companyShell.environment')}</div>
        </Certificate>
      )}
      {!!data.atg && <Certificate type={'atg'}>ATG</Certificate>}
    </Wrapper>
  );
};
