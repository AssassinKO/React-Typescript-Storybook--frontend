import React, { FC } from 'react';
import styled from 'styled-components';
import { BackgroundGraphics, DancingScriptQuote, ReviewCloud } from '@homeproved/shared/ui';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type ReviewShellProps = {
  currentStep: number;
};

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.grey['A200']};
  padding: 0 2rem;
  flex-direction: column;
  align-items: center;
`;

const Content = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  position: relative;
  margin: ${({ mobile }) => `${mobile ? '3rem' : '12rem'} auto 2rem auto`};
  width: 100%;
  max-width: 65rem;
  z-index: 1;
`;

const Quote = styled(DancingScriptQuote)`
  margin-bottom: 3rem;
  white-space: nowrap;
`;

export const ReviewShell: FC<ReviewShellProps> = ({ currentStep, children }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));

  return (
    <Wrapper>
      <BackgroundGraphics>
        <ReviewCloud src="/review_cloud.png" alt="" loading="lazy" top="20rem" left="15%" />
        <ReviewCloud src="/review_cloud.png" alt="" loading="lazy" top="60rem" left="85%" />
      </BackgroundGraphics>
      <Content mobile={isMobile}>{children}</Content>
      <Quote quote={t('reviews.write.quote')} size={2.6} />
    </Wrapper>
  );
};
