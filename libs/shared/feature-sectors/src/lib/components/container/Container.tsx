import React, { FC } from 'react';
import styled from 'styled-components';

export type LocalityContainerProps = {
  children: React.ReactNode;
  background?: string;
};

const Wrapper = styled(({ background, ...restProps }) => <div {...restProps} />)`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: ${({ background }) => background || 'transparent'};
`;

const Inner = styled.div`
  width: 100%;
  max-width: 122.5rem;
  margin: auto;
  padding: 0 2rem;
`;

const LocalityContainerWrapper: FC<LocalityContainerProps> = ({ background, children }) => (
  <Wrapper background={background}>
    <Inner>{children}</Inner>
  </Wrapper>
);

export default LocalityContainerWrapper;
