import React, { FC } from 'react';
import styled from 'styled-components';

export type HomepageContainerProps = {
  children: React.ReactNode;
};

export const HomepageContainer = styled.div`
  width: 118.5rem;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    width: 100%;
    padding: 0 2rem;
  }
`;

export const StyledHomepageContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const HomepageContainerWrapper: FC = ({ children }: HomepageContainerProps) => (
  <StyledHomepageContainerWrapper>
    <HomepageContainer>{children}</HomepageContainer>
  </StyledHomepageContainerWrapper>
);
