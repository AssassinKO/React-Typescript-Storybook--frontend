import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SvgIcon, Icons } from '@homeproved/shared/ui';

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: 2rem;
  text-align: center;
  max-width: 30rem;
  position: relative;
  flex: 1;
  margin: 0 1rem;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  margin: 1rem 0;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledIcon = styled.div`
  background: ${({ theme }) => theme.palette.grey['800']};
  border-radius: 50%;
  width: 3.3rem;
  height: 3.3rem;
  margin: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DashboardTrustManager: FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <img src="./trustmanager.png" alt={t('app.pro.pages.dashboard.trustManager')} />
      <Title>{t('app.pro.pages.dashboard.trustManager')}</Title>
      <IconWrapper>
        <StyledIcon>
          <SvgIcon icon={Icons.ENVELOPE_OUTLINE} size={1.6} color={'#fff'} />
        </StyledIcon>
        <StyledIcon>
          <SvgIcon icon={Icons.PHONE} size={1.6} color={'#fff'} />
        </StyledIcon>
      </IconWrapper>
    </Wrapper>
  );
};
