import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { SvgIcon, Icons } from '../svg-icon';

export type TextAlign = 'left' | 'center' | 'right';
export type FontFamily = 'Cabrito' | 'PTSans';

export type SectionTitleProps = {
  label: string | ReactElement[];
  textAlign?: TextAlign;
  icon?: Icons;
  className?: string;
  uppercase?: boolean;
  font?: FontFamily;
  ignoreMobile?: boolean;
  lineColor?: string;
  morePadding?: boolean;
  underlineMobile?: boolean;
  iconSize?: number;
};

const Wrapper = styled(({ textAlign, isMobile, ignoreMobile, underlineMobile, ...restProps }) => (
  <div {...restProps} />
))`
  margin-bottom: ${({ isMobile, ignoreMobile }) => (isMobile && !ignoreMobile ? '1rem' : '2rem')};
  overflow: ${({ isMobile, underlineMobile }) =>
    isMobile && underlineMobile ? 'visible' : 'hidden'};
  display: flex;
  justify-content: ${({ textAlign }) =>
    textAlign === 'center' ? 'center' : textAlign === 'left' ? 'flex-start' : 'flex-end'};
`;

const Group = styled(
  ({ textAlign, isMobile, ignoreMobile, lineColor, morePadding, ...restProps }) => (
    <div {...restProps} />
  )
)`
  display: inline-flex;
  align-items: center;
  position: relative;
  padding-right: ${({ textAlign, isMobile, ignoreMobile, morePadding }) =>
    isMobile
      ? ignoreMobile
        ? '2.5rem'
        : '0'
      : textAlign === 'center'
      ? morePadding
        ? '15rem'
        : '7.5rem'
      : textAlign === 'left'
      ? '2.5rem'
      : '0'};
  padding-left: ${({ textAlign, isMobile, ignoreMobile, morePadding }) =>
    isMobile
      ? ignoreMobile
        ? '2.5rem'
        : '0'
      : textAlign === 'center'
      ? morePadding
        ? '15rem'
        : '7.5rem'
      : textAlign === 'left'
      ? '0'
      : '7.5rem'};

  &:before,
  &:after {
    ${({ isMobile, ignoreMobile }) =>
      isMobile && !ignoreMobile ? `content: none;` : `content: '';`};
    position: absolute;
    height: 0.1rem;
    background-color: ${({ theme, lineColor }) =>
      lineColor === 'black' ? theme.palette.grey[800] : theme.palette.grey[300]};
    top: 50%;
    width: 100vw;
  }
  &:before {
    left: 100%;
  }
  &:after {
    right: 100%;
  }
`;

const Title = styled(
  ({ uppercase, font, isMobile, ignoreMobile, underlineMobile, textAlign, ...restProps }) => (
    <Typography {...restProps} />
  )
)`
  position: relative;
  font-size: 2rem;
  font-family: ${({ theme, font }) =>
    font === 'PTSans' ? theme.config.fonts.PTSans : theme.config.fonts.Cabrito};
  font-weight: ${({ font }) => (font === 'PTSans' ? '400' : '700')};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  ${({ underlineMobile, isMobile, theme }) =>
    underlineMobile &&
    isMobile &&
    `
    margin-bottom: 2rem;
    &:after{
      content: '';
      display: block;
      width: 12rem;
      height: 2px;
      background-color: ${theme.palette.grey[800]};
      position: absolute;
      bottom: -1.5rem;
      left: 50%;
      transform: translateX(-50%);
    }
  `}
  text-align: ${({ textAlign }) => textAlign};
`;

const Icon = styled(SvgIcon)`
  margin-right: 2rem;
`;

export const SectionTitle: FC<SectionTitleProps> = ({
  label,
  textAlign = 'center',
  icon,
  iconSize = 2,
  className,
  uppercase = false,
  font = 'Cabrito',
  ignoreMobile = false,
  lineColor,
  morePadding = false,
  underlineMobile = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));

  return (
    <Wrapper
      textAlign={textAlign}
      className={className}
      isMobile={isMobile}
      ignoreMobile={ignoreMobile}
      underlineMobile={underlineMobile}
    >
      <Group
        textAlign={textAlign}
        isMobile={isMobile}
        ignoreMobile={ignoreMobile}
        lineColor={lineColor}
        morePadding={morePadding}
      >
        {!!icon && <Icon icon={icon} color="gradient" size={iconSize} />}
        <Title
          variant={'h2'}
          uppercase={uppercase}
          font={font}
          isMobile={isMobile}
          ignoreMobile={ignoreMobile}
          underlineMobile={underlineMobile}
          textAlign={textAlign}
        >
          {label}
        </Title>
      </Group>
    </Wrapper>
  );
};
