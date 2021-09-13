import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  size?: 'small' | 'large';
  className?: string;
};

const Wrapper = styled(({ size, ...restProps }) => <div {...restProps} />)`
  display: inline-flex;
  padding: ${({ size }) => (size === 'large' ? '1rem 2rem' : '0.5rem 2rem')};
  font-weight: bold;
  font-size: ${({ size }) => (size === 'large' ? '1.3rem' : '1.2rem')};
  ${({ theme }) => `
    font-family: ${theme.config.fonts.Cabrito};
    background: ${theme.palette.grey['800']};
    color: ${theme.palette.primary.contrastText};
    border-radius: ${theme.config.defaultBorderRadius};
  `}
`;

export const Tag: FC<Props> = ({ children, size = 'small', className }) => (
  <Wrapper size={size} className={className}>
    #{children}
  </Wrapper>
);
