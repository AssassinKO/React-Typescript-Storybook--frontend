import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { HomepageContainerWrapper } from '../container/Container';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

type CallToActionProps = {
  getPath: GetPathFunction;
};

export const Wrapper = styled.div`
  display: flex;
`;

const Images = styled.div`
  flex: 0 0 60%;
  position: relative;
  padding-top: 20rem;
`;

const ImageOne = styled.img`
  transform: rotate(10deg);
  position: absolute;
  top: 0;
  right: 5rem;
  z-index: 2;
  max-width: 37rem;
`;

const ImageTwo = styled.img`
  transform: rotate(-10deg);
  max-width: 35rem;
`;

const Text = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  padding: ${({ isTablet }) => (isTablet ? '6rem 2rem 2rem' : '10rem 2rem 2rem')};
  text-align: ${({ isTablet }) => (isTablet ? 'center' : 'left')};
  max-width: 50rem;
  margin: 0 auto;
  h3 {
    margin-top: 0;
  }
`;

export const CallToAction: FC<CallToActionProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(1185));

  return (
    <HomepageContainerWrapper>
      <Wrapper>
        {!isTablet && (
          <Images>
            <ImageOne src="/img_polaroid-ingoedebanen.png" alt="" />
            <ImageTwo src="/img_polaroid-sterkwerk.png" alt="" />
          </Images>
        )}
        <Text isTablet={isTablet}>
          <h3>{t('app.com.pages.landing.cta.header')}</h3>
          <p>{t('app.com.pages.landing.cta.body')}</p>
          <Button size="large" href={getPath('/write-review')}>
            {t('app.com.pages.landing.cta.button')}
          </Button>
        </Text>
      </Wrapper>
    </HomepageContainerWrapper>
  );
};
