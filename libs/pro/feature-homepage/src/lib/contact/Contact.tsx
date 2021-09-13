import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@homeproved/shared/ui';
import { HomepageContainer } from '../container/Container';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';

const StyledHomepageContact = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.palette.grey['A200']};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaintCloud = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  top: ${({ isTablet }) => (isTablet ? '10vw' : '15rem')};
  right: ${({ isTablet }) => (isTablet ? '5vw' : '10rem')};
  background: url('/paint_cloud.png') no-repeat center;
  width: 12.3rem;
  height: 10.1rem;
`;

const StyledHomepageContactInner = styled(HomepageContainer)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 6rem 3rem;
`;

const StyledHomepageContactTitle = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-weight: ${({ isMobile }) => isMobile && '900'};
  font-size: ${({ isMobile }) => (isMobile ? '1.6rem' : '2.6rem')};
  max-width: 60rem;
  text-align: center;
`;

const StyledHomepageContactSubHeader = styled(({ isMobile, ...restProps }) => (
  <div {...restProps} />
))`
  font-size: ${({ isMobile }) => (isMobile ? '1.6rem' : '2.6rem')};
  font-weight: 900;
  padding-top: ${({ isMobile }) => !isMobile && '1rem'};
`;

const StyledHomepageFormWrapper = styled.div`
  max-width: 66rem;
  width: 100%;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const StyledHomepageContactLabel = styled.div`
  font-weight: bold;
  margin: 3rem 0 1rem 0;
  font-size: 1.6rem;
`;

const StyledHomepageInput = styled.input`
  width: 100%;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  font-size: 1.6rem;
  border: none;
  padding: 1.3rem 2rem;
  &:active,
  &:focus {
    border: none;
    outline: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.17);
  }
`;

const StyledHomepageTextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  font-size: 1.6rem;
  border: none;
  padding: 2rem;
  font-family: inherit;
  &:active,
  &:focus {
    border: none;
    outline: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.17);
  }
`;

const StyledButton = styled(({ isMobile, ...restProps }) => <Button {...restProps} />)`
  display: table;
  margin: ${({ isMobile }) => (isMobile ? '2rem auto 0' : '2rem 0 0 auto')};
`;

export const HomepageContact: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));

  return (
    <StyledHomepageContact>
      <StyledHomepageContactInner>
        {!isMobile && <PaintCloud isTablet={isTablet} />}
        <StyledHomepageContactTitle isMobile={isMobile}>
          {t('app.pro.pages.landing.contact.header')}
        </StyledHomepageContactTitle>
        <StyledHomepageContactSubHeader isMobile={isMobile}>
          {t('app.pro.pages.landing.contact.subheader')}
        </StyledHomepageContactSubHeader>
        <StyledHomepageFormWrapper>
          <StyledHomepageContactLabel>
            {t('app.pro.pages.landing.contact.form.name')}
          </StyledHomepageContactLabel>
          <StyledHomepageInput
            placeholder={t('app.pro.pages.landing.contact.form.name_placeholder')}
          />
          <StyledHomepageContactLabel>
            {t('app.pro.pages.landing.contact.form.email')}
          </StyledHomepageContactLabel>
          <StyledHomepageInput
            placeholder={t('app.pro.pages.landing.contact.form.email_placeholder')}
          />
          <StyledHomepageContactLabel>
            {t('app.pro.pages.landing.contact.form.phone')}
          </StyledHomepageContactLabel>
          <StyledHomepageInput
            placeholder={t('app.pro.pages.landing.contact.form.phone_placeholder')}
          />
          <StyledHomepageContactLabel>
            {t('app.pro.pages.landing.contact.form.company')}
          </StyledHomepageContactLabel>
          <StyledHomepageInput
            placeholder={t('app.pro.pages.landing.contact.form.company_placeholder')}
          />
          <StyledHomepageContactLabel>
            {t('app.pro.pages.landing.contact.form.body')}
          </StyledHomepageContactLabel>
          <StyledHomepageTextArea
            placeholder={t('app.pro.pages.landing.contact.form.body_placeholder')}
            rows={5}
          />
          <StyledButton variant="gradient" isMobile={isMobile}>
            {t('app.pro.pages.landing.contact.send')}
          </StyledButton>
        </StyledHomepageFormWrapper>
      </StyledHomepageContactInner>
    </StyledHomepageContact>
  );
};
