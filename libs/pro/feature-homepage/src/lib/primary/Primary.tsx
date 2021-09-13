import React, { FC } from 'react';
import styled from 'styled-components';
import { Bounce, Icons, Stars, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { HomepageContainerWrapper } from '../container/Container';

const StyledHomepagePrimary = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  flex-direction: column;
  margin-top: ${({ mobile }) => (mobile ? '4rem' : '8rem')};
  width: 100%;
`;

const StyledHomepagePrimaryStars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border-radius: 1rem;
  margin-bottom: 4rem;
  padding: 0.3rem 2rem 0.5rem;
  position: relative;

  &:after {
    content: '';
    border-top: 1rem solid #fff;
    border-right: 1rem solid transparent;
    border-left: 1rem solid transparent;
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -1rem;
  }
`;

const StyledHomepagePrimaryPreCaption = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 1rem;
`;

const StyledHomepagePrimaryCaption = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  text-align: center;
  font-size: ${({ isMobile }) => (isMobile ? '2rem' : '4rem')};
  font-weight: ${({ isMobile }) => (isMobile ? '900' : '500')};
  margin-top: ${({ isMobile }) => isMobile && '2rem'};
  margin-bottom: 2rem;

  div {
    font-weight: 400;
  }
`;

const StyledHomepagePrimaryArrow = styled(() => (
  <SvgIcon icon={Icons.DOUBLE_ANGLE_DOWN} size={3} color={'#fff'} />
))`
  transform: rotate(45deg);
`;

const StyledHomepagePrimaryScrollEncourage = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: -4rem;
  > img {
    max-width: 34rem;
    transform: rotate(-3deg);
    position: relative;
    align-self: flex-start;
  }
`;

const SpeechBubble = styled.div`
  background: ${({ theme }) => theme.palette.grey['A200']};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  width: 20rem;
  height: 20rem;
  border-radius: 50% 50% 10% 50%;
  overflow: hidden;
  word-wrap: break-word;
  text-align: center;
`;

export const HomepagePrimary: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  return (
    <HomepageContainerWrapper>
      <StyledHomepagePrimary mobile={isMobile}>
        <StyledHomepagePrimaryStars>
          <Stars count={4} size={2.4} />
        </StyledHomepagePrimaryStars>
        {!isMobile && (
          <StyledHomepagePrimaryPreCaption>
            {t('app.pro.pages.landing.primary.know')}
          </StyledHomepagePrimaryPreCaption>
        )}
        <StyledHomepagePrimaryCaption isMobile={isMobile}>
          {isMobile
            ? ReactHtmlParser(t('app.pro.pages.landing.primary.tag_line_mobile'))
            : ReactHtmlParser(t('app.pro.pages.landing.primary.tag_line'))}
        </StyledHomepagePrimaryCaption>
        <Bounce translateY={2}>
          <StyledHomepagePrimaryArrow />
        </Bounce>
        {!isMobile && (
          <StyledHomepagePrimaryScrollEncourage>
            <img src="/homeproved-top-rating-green.png" alt="" loading="lazy" />
            <SpeechBubble>
              <SvgIcon icon={Icons.HELMET_SOLID} />
              <b>{t('app.pro.pages.landing.primary.pst')}</b>
              <div>{t('app.pro.pages.landing.primary.pst_msg')}</div>
            </SpeechBubble>
          </StyledHomepagePrimaryScrollEncourage>
        )}
      </StyledHomepagePrimary>
    </HomepageContainerWrapper>
  );
};
