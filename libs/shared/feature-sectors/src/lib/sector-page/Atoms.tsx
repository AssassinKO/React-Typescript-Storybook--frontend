import styled from 'styled-components';
import { SvgIcon } from '@homeproved/shared/ui';
import React from 'react';
import { Grid } from '@material-ui/core';

export const Intro = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  margin: 4rem 0 2rem 0;
  margin-top: ${({ tablet }) => (tablet ? '2rem' : '4rem')};
`;

export const IntroText = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  width: ${({ tablet }) => (tablet ? '100%' : '50%')};
  border-right: ${({ tablet, theme }) =>
    tablet ? 'none' : `1px solid ${theme.palette.grey[200]}`};

  .header {
    padding-right: ${({ tablet }) => (tablet ? 0 : '2rem')};
    margin-bottom: 0;
    font-weight: bold;
    font-size: 2.4rem;
    text-align: ${({ tablet }) => (tablet ? 'center' : 'left')};
  }

  p {
    padding-right: ${({ tablet }) => (tablet ? 0 : '2rem')};
    font-size: 1.5rem;
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    text-align: ${({ tablet }) => (tablet ? 'center' : 'left')};
  }
`;

export const SelectASector = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  b {
    margin: 1.5rem 0 2rem 0;
    font-size: 2rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    display: none;
  }
`;

export const SectorNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  white-space: nowrap;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    text-align: center;
    align-items: center;
    padding-left: 0;
  }
  b {
    display: block;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const SectorCard = styled(({ mobile, tablet, ...restProps }) => <div {...restProps} />)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.grey['300']};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  background: white;
`;

export const DotsOuter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  cursor: pointer;
  svg {
    transform: scale(1.25) rotate(90deg);
  }

  &:hover svg {
    transform: scale(1.4) rotate(90deg);
  }
`;

export const DotsOuterPlaceholder = styled.div`
  width: 100%;
  height: 1.5rem;
`;

export const ExpandableWrapper = styled.div<{ visible: boolean }>`
  position: absolute;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  max-height: ${({ visible }) => (visible ? '30rem' : '1.5rem')};
  transition: ease 200ms;
  overflow: hidden;
  background: white;
  z-index: 50;
  left: 0;
  right: 0;
  height: fit-content;
  padding-top: 1rem;
  margin: 0 -0.1rem;
  border-style: solid;
  border-width: 0 0.1rem 0.1rem 0.1rem;
  border-bottom-left-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  border-bottom-right-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  border-color: ${({ visible }) => (visible ? 'lightblue' : 'white')};
`;

export const SectorDescendantsWrapper = styled.div`
  max-height: 24rem;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const SectorTitle = styled.div`
  padding-top: 1rem;
  font-size: 1.2rem;
  font-weight: bolder;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
  b {
    margin-left: 1rem;
    font-size: 1.4rem;
    word-wrap: break-word;
    overflow: hidden;
    letter-spacing: 0.05rem;
  }
`;

export const SubSectorEntry = styled.div`
  display: flex;
  width: 100%;
  padding: 1.3rem 0 1.3rem 7.4rem;
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  cursor: pointer;
  span {
    font-weight: normal;
  }
  &:hover {
    background: ${({ theme }) => theme.palette.grey.A200};
    a {
      font-weight: 700;
    }
  }
`;

export const ExpandableClose = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  svg {
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const Icon = styled(({ highlight, icon, ...restProps }) => (
  <div {...restProps}>
    <SvgIcon icon={icon} size={3} />
  </div>
))`
  border-radius: 50%;
  background-color: ${({ highlight, theme }) => (highlight ? '' : theme.palette.grey['A200'])};
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
`;

export const StyledA = styled.a`
  color: inherit;
  text-decoration: none;
`;

export const GridItem = styled(({ mobile, ...restProps }) => <Grid {...restProps} />)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ mobile }) =>
    mobile &&
    `
    max-width: 100%;
    flex-basis: 100%;
  `}
`;
