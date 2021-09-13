import React, { FC } from 'react';
import { DancingScriptQuote, LogoPro, Tag } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type AuthPageWrapperProps = {
  isTablet?: boolean;
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`;

const Visual = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100vw - 50rem);
  background-image: url('/pro-login-visual.jpg');
  background-size: cover;
  background-position: center;
  padding: 2rem;
  image-rendering: -webkit-optimize-contrast;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    display: none;
  }
`;

const FormWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  width: 100%;
  max-width: 50rem;
  background: ${({ isMobile, theme }) =>
    isMobile ? theme.config.gradients.vertical : theme.config.gradients.default};
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 0 8rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    flex-direction: column;
    max-width: none;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    padding: 0 2rem;
  }
`;

const FormInnerWrapper = styled.div`
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 3rem 0 6rem 0;
  }
`;

const Quote = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  ${({ isMobile }) =>
    isMobile
      ? `
    margin: 0;
    display: flex;
    justify-content: center;
  `
      : `
    margin: 4rem 0 0 8rem;
  `};
`;

const Tags = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  flex-wrap: wrap;
  overflow: hidden;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    margin-bottom: 2rem;
  }
`;

const StyledTag = styled(Tag)`
  margin: 0 2rem 2rem 0;
`;

export const AuthPageWrapper: FC<AuthPageWrapperProps> = ({ children, isTablet }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const tags = t('app.pro.pages.auth.tags', { returnObjects: true }) as string[];

  return (
    <Wrapper>
      <Visual>
        {!isMobile && (
          <>
            <Quote>
              <DancingScriptQuote quote={t('app.pro.pages.auth.quote')} />
            </Quote>
            <Tags>
              {tags.map((tag: string, index: number) => (
                <StyledTag key={index} size="large">
                  {tag}
                </StyledTag>
              ))}
            </Tags>
          </>
        )}
      </Visual>
      <FormWrapper isMobile={isMobile}>
        <FormInnerWrapper>
          <div>
            {!isTablet && <LogoPro width="22.5rem" />}
            {children}
          </div>
        </FormInnerWrapper>
      </FormWrapper>
    </Wrapper>
  );
};
