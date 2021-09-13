import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { Typography } from '@material-ui/core';
import { LabelWithLinks } from '@homeproved/shared/feature-forms';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

type InfoBannerProps = {
  isMobile: boolean;
};

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  position: relative;
  padding: ${({ mobile }) => (mobile ? '5rem 2rem' : '5rem 0')};
  display: flex;
  justify-content: center;
  align-content: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background: ${({ theme }) => theme.config.gradients.default};
    z-index: 0;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 65rem;
`;

const Polaroid = styled.div`
  margin-right: 4rem;
  flex-basis: 35%;

  img {
    display: block;
    width: 100%;
    transform: rotate(-5deg);
  }
`;

const Info = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  flex-basis: 65%;
  color: #fff;

  ${({ isMobile }) =>
    isMobile &&
    `
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

const Title = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: inline-block;
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: 2rem;
  font-weight: 700;
  padding-bottom: 2rem;
  border-bottom: 1px solid #fff;
  margin-bottom: 2rem;
  text-align: ${({ isMobile }) => (isMobile ? 'center' : 'left')};
`;

const Text = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: ${({ mobile }) => (mobile ? '1.8rem' : '1.4rem')};
  font-weight: 300;
`;

export const InfoBanner: FC<InfoBannerProps> = ({ isMobile }) => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();
  return (
    <Wrapper mobile={isMobile}>
      <Inner>
        {!isMobile && (
          <Polaroid>
            <img src="/img_polaroid-paraat.png" alt="" loading="lazy" />
          </Polaroid>
        )}
        <Info isMobile={isMobile}>
          <Title isMobile={isMobile}>
            {ReactHtmlParser(t('app.com.pages.addCompany.infoBanner.title'))}
          </Title>
          <Text variant="body1" mobile={isMobile}>
            <LabelWithLinks
              label={t('app.com.pages.addCompany.infoBanner.text')}
              linksInLabel={[
                {
                  label: t('app.com.pages.addCompany.infoBanner.termsOfUse'),
                  path: getPath('/terms-of-use'),
                },
              ]}
              options={{
                linkUnderline: 'always',
                linkWeight: 400,
              }}
            />
          </Text>
        </Info>
      </Inner>
    </Wrapper>
  );
};
