import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Icons, SvgIcon } from '../svg-icon';

type Props = {
  size?: 'small' | 'large';
  className?: string;
  icon?: Icons;
  text: string;
};

const Text = styled(({ size, ...restProps }) => <Typography {...restProps} />)`
  font-weight: bold;
  font-size: ${({ size }) => (size === 'large' ? '1.3rem' : '1.2rem')};
  ${({ theme }) => `
    font-family: ${theme.config.fonts.PTSans};
    color: ${theme.palette.primary.contrastText};
  `}
  text-transform: uppercase;
`;

const Wrapper = styled(({ size, ...restProps }) => <div {...restProps} />)`
  display: inline-flex;
  padding: ${({ size }) => (size === 'large' ? '1.5rem' : '0.7rem 1rem')};
  ${({ theme }) => `
    background: ${theme.palette.grey['800']};
    border-radius: ${theme.config.defaultBorderRadius};
  `}
`;

export const CompanyTag: FC<Props> = ({ size = 'small', className, text, icon }) => (
  <Wrapper size={size} className={className}>
    {icon && (
      <>
        <Box display="inline-flex" mr={1}>
          <SvgIcon icon={icon} size={1.5} color="white" />
        </Box>
        <Text variant="body1">{text}</Text>
      </>
    )}
  </Wrapper>
);
