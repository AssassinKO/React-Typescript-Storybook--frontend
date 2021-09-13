import React, { FC } from 'react';
import styled from 'styled-components';
import { SvgIcon, Icons } from '../..';

export type IconTileProps = {
  icon: Icons;
  label: string;
  className?: string;
};

const Wrapper = styled(({ ...restProps }) => <div {...restProps} />)`
  ${({ theme }) => `
    border: 0.2rem solid ${theme.palette.grey['A200']};
    border-radius: ${theme.config.defaultBorderRadius};
    background: #fff;
    color: ${theme.palette.text.primary};
  `};
  padding: 1rem 0.7rem 0.5rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  cursor: pointer;

  &:hover {
    ${({ theme }) => `
      background: ${theme.config.gradients.rotated};
      color: #fff;
  `};
  }
`;

const IconWrapper = styled.div`
  padding: 1.3rem;
  width: 6.6rem;
  height: 6.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  display: flex;
  justify-content: center;
  align-items: center;

  ${Wrapper}:hover & {
    background-color: transparent;
  }
`;

const Icon = styled(({ ...restProps }) => <SvgIcon {...restProps} />)`
  ${Wrapper}:hover & {
    svg,
    path {
      fill: #fff;
    }
  }
`;

const Label = styled.div`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.4rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const IconTile: FC<IconTileProps> = ({ icon, label, className }) => {
  return (
    <Wrapper className={className}>
      <IconWrapper>
        <Icon icon={icon} size={4} />
      </IconWrapper>
      <Label>
        <span>{label}</span>
      </Label>
    </Wrapper>
  );
};
