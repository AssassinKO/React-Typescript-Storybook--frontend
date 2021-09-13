import React, { FC } from 'react';
import { Header } from '@homeproved/pro/feature-header';
import styled from 'styled-components';
import { Footer } from '@homeproved/pro/feature-footer';

type PageShellProps = {
  padding?: boolean;
  minimalHeader?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 0 2rem;
  width: 100%;
  background: #fff;
`;

const Inner = styled(({ padding, ...restProps }) => <div {...restProps} />)`
  width: 100%;
  max-width: 115.6rem;
  padding-top: ${({ padding }) => padding && '6rem'};
`;

export const PageShell: FC<PageShellProps> = ({
  padding = true,
  minimalHeader = false,
  children,
}) => {
  return (
    <Wrapper>
      <Header minimal={minimalHeader} />
      <ContentWrapper>
        <Inner padding={padding}>{children}</Inner>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
