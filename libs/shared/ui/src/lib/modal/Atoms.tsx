import styled, { css } from 'styled-components';
import { Modal as MuiModal } from '@material-ui/core';
import React, { ForwardedRef, HTMLProps } from 'react';
import { SvgIcon } from '../svg-icon';

export const Wrapper = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalInner = styled(
  React.forwardRef(
    (
      {
        isMobile,
        maxWidth,
        width,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        background,
        height,
        borderRadiusMobile,
        ...restProps
      }: HTMLProps<HTMLDivElement> & {
        isMobile?: boolean;
        maxWidth?: number;
        width?: string;
        paddingTop: number;
        paddingBottom: number;
        paddingTopMobile: number;
        paddingBottomMobile: number;
        background: string;
        height: string;
        borderRadiusMobile: number;
      },
      ref: ForwardedRef<HTMLDivElement>
    ) => <div {...restProps} ref={ref} />
  )
)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${({ isMobile, paddingTop, paddingBottom, paddingTopMobile, paddingBottomMobile }) =>
    isMobile
      ? `${paddingTopMobile}rem 0 ${paddingBottomMobile}rem 0`
      : `${paddingTop}rem 5rem ${paddingBottom}rem 5rem`};
  min-width: ${({ isMobile, maxWidth }) =>
    isMobile ? 'none' : maxWidth != null ? `${maxWidth}rem` : 'max(50rem, 50vw)'};
  border-radius: ${({ isMobile, borderRadiusMobile }) =>
    isMobile ? (borderRadiusMobile ? `${borderRadiusMobile}rem` : '0') : '1rem'};
  background: ${({ background, theme }) =>
    background === 'gradient' ? theme.config.gradients.rotated : '#fff'};
  max-height: ${({ isMobile }) => (isMobile ? 'none' : '90vh')};
  outline: none;
  width: ${({ isMobile, width }) => (isMobile ? '100vw' : width)};
  height: ${({ isMobile, height }) => (isMobile ? (height ? height : '100vh') : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}rem` : 'none')};
`;

export const Title = styled(
  ({ isMobile, titleSize, textAlign, centerMobile, uppercase, font, ...restProps }) => (
    <div {...restProps} />
  )
)`
  display: flex;
  justify-content: ${({ isMobile, textAlign, centerMobile }) =>
    (isMobile && !centerMobile) || textAlign === 'left'
      ? 'flex-start'
      : textAlign === 'center'
      ? 'center'
      : 'flex-end'};
  align-items: center;
  font-family: ${({ theme, font }) => theme.config.fonts[font]};
  font-size: ${({ titleSize }) => `${titleSize}rem`};
  line-height: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
  padding: ${({ isMobile }) => isMobile && '0 4rem 0 2rem'};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
`;

export const Icon = styled(SvgIcon)`
  margin-right: 1rem;
`;

export const Content = styled(({ isMobile, withTitle, featureModal, ...restProps }) => (
  <div {...restProps} />
))`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: ${({ withTitle }) => !withTitle && '2rem'};
  padding: ${({ isMobile }) => isMobile && '0 2rem'};

  ${({ featureModal }) =>
    featureModal &&
    `
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
  `};
`;

const closeButtonLine = css`
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.6rem;
  height: 0.1rem;
`;

export const CloseButton = styled(({ isMobile, withTitle, background, ...restProps }) => (
  <div {...restProps} />
))`
  position: absolute;
  top: ${({ isMobile, withTitle }) => (isMobile ? '1.5rem' : withTitle ? '3rem' : '2rem')};
  right: ${({ isMobile, withTitle }) => (isMobile ? '1.5rem' : withTitle ? '4rem' : '2rem')};
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${({ background, theme }) => (background === 'gradient' ? 'transparent' : '#fff')};
  transition: background-color 0.25s linear;

  &:hover {
    background-color: ${({ background, theme }) =>
      background === 'gradient' ? theme.palette.grey['800'] : theme.palette.grey['200']};
  }

  &:before {
    ${closeButtonLine};
    background: ${({ background, theme }) =>
      background === 'gradient' ? '#fff' : theme.palette.grey['800']};
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    ${closeButtonLine};
    background: ${({ background, theme }) =>
      background === 'gradient' ? '#fff' : theme.palette.grey['800']};
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
