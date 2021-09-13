import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

export type ProConChipProps = {
  pro: boolean;
  text: string;
  mobile: boolean;
  size?: 'small' | 'medium';
};

const StyledProConChip = styled(({ pro, mobile, ...restProps }) => <div {...restProps} />)`
  border: 2px solid
    ${({ pro, theme }) => (pro ? theme.palette.green.light : theme.palette.primary.main)};
  height: ${({ size }) => (size === 'small' ? '3.4rem' : '3.6rem')};
  border-radius: ${({ size }) => (size === 'small' ? '1.7rem' : '1.8rem')};
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${({ mobile, size }) =>
    mobile || size === 'small' ? '0 0.3rem 0.8rem' : '0 0.5rem 1rem'};
`;

export const Text = styled(({ size, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ size }) => (size === 'small' ? '1.1rem' : '1.2rem')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const ProConChip: FC<ProConChipProps> = ({ pro, text, mobile, size }) => {
  return (
    <StyledProConChip pro={pro} mobile={mobile} size={size}>
      <Text variant="body1" size={size}>
        {text}
      </Text>
    </StyledProConChip>
  );
};
