import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Icons, SectionTitle, Socials, SvgIcon } from '@homeproved/shared/ui';
import ReactHtmlParser from 'react-html-parser';
import { useMediaQuery } from '@material-ui/core';
import GoogleMapsMap from './components/GoogleMapsMap';
import { ActiveCampaignForm } from '@homeproved/shared/feature-active-campaign';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';

const StyledContactPage = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? '0 4rem 6rem' : '0 2rem 6rem')};
  max-width: 115.6rem;
  width: 100%;
  margin: auto;
`;

const Split = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: flex-start;
  padding-top: 2rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: column-reverse;
  }
`;

const BubbleWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: calc(100% + 8rem);
    background: ${({ theme }) => theme.palette.grey['A200']};
    position: relative;
    margin-top: 4rem;
    margin-left: -4rem;
    margin-right: -4rem;
  }
`;

const BubbleWrapperInside = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 100%;
    align-items: center;
  }
`;

const Bubble = styled.div`
  background: ${({ theme }) => theme.palette.grey['A200']};
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-end-end-radius: 0;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 100%;
    height: auto;
    padding: 2rem 0;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: 300px;
    height: 300px;
  }
`;

const BubbleInner = styled.div`
  max-width: 60%;
`;

const BubbleHeader = styled.div`
  font-weight: bolder;
  font-size: 1.8rem;
  padding-bottom: 0.4rem;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    padding-bottom: 2rem;
    text-align: center;
  }
`;

const BubbleLine = styled.div`
  display: flex;
  margin-top: 1rem;
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  span {
    display: block;
    flex: 1;
    margin-left: 2rem;
  }
`;

const BTW = styled.div`
  font-weight: bolder;
  letter-spacing: 0;
`;

const Form = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${({ tablet }) => (tablet ? 'center' : 'flex-end')};
  form {
    width: auto !important;
  }
`;

export const ContactPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const currentLanguage = useCurrentLanguage();

  const getFormId = () => {
    switch (currentLanguage) {
      case 'nl':
        return 1;
      case 'fr':
        return 17;
      case 'en':
        return 15;
      default:
        return 1;
    }
  };

  return (
    <>
      <StyledContactPage mobile={isMobile}>
        <SectionTitle label={t('app.com.pages.contact.title')} morePadding underlineMobile />
        <Split>
          <BubbleWrapper>
            <BubbleWrapperInside>
              <Bubble>
                <BubbleInner>
                  <BubbleHeader>{t('app.com.pages.contact.details')}</BubbleHeader>
                  <BubbleLine>
                    <SvgIcon icon={Icons.PHONE} size={2} />
                    <span>{t('app.com.pages.contact.phone')}</span>
                  </BubbleLine>
                  <BubbleLine>
                    <SvgIcon icon={Icons.EMAIL} size={2} />
                    <span>{t('app.com.pages.contact.email')}</span>
                  </BubbleLine>
                  <BubbleLine>
                    <SvgIcon icon={Icons.LOCATION_OUTLINE} size={2} />
                    <span>{ReactHtmlParser(t('app.com.pages.contact.address'))}</span>
                  </BubbleLine>
                  <BubbleLine>
                    <BTW>BTW</BTW>
                    <span>{t('app.com.pages.contact.btw')}</span>
                  </BubbleLine>
                </BubbleInner>
              </Bubble>
              <Socials />
            </BubbleWrapperInside>
          </BubbleWrapper>
          <Form tablet={isTablet}>
            <ActiveCampaignForm formId={getFormId()} isMobile={isMobile} />
          </Form>
        </Split>
      </StyledContactPage>
      <GoogleMapsMap />
    </>
  );
};
