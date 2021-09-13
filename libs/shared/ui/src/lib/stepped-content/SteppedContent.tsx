import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';

type SteppedContentProps = {
  title: string;
  step: number;
  className?: string;
};

const Wrapper = styled.div`
  max-width: 70rem;
  margin: 0 auto 3rem auto;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 2rem;
`;

const Step = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.4rem;
  width: ${({ isMobile }) => (isMobile ? '5.5rem' : '8rem')};
  height: ${({ isMobile }) => (isMobile ? '5.5rem' : '8rem')};
  margin-right: 2rem;
  margin-left: ${({ isMobile }) => !isMobile && '-10rem'};
  border-radius: 50% 50% 0 50%;
  font-size: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.8rem')};
  font-weight: 700;
  background: ${({ theme }) => theme.palette.grey['A200']};
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
`;

const Content = styled.div`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const SteppedContent: FC<SteppedContentProps> = ({ title, step, className, children }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  return (
    <Wrapper className={className}>
      <Header>
        <Step isMobile={isMobile}>{`${t('shared.step')} ${step}`}</Step>
        <Title>{title}</Title>
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  );
};
