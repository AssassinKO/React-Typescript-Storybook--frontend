import React from 'react';
import styled from 'styled-components';
import { Button, SvgIcon } from '@homeproved/shared/ui';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Sidebar = styled(({ isDesktop, ...restProps }) => <div {...restProps} />)`
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  flex: ${({ isDesktop }) => (isDesktop ? '0 0 100%' : '0 0 27rem')};
  padding: 2rem;
  align-self: flex-start;
`;

export const Content = styled(({ isDesktop, ...restProps }) => <div {...restProps} />)`
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  margin: ${({ isDesktop }) => (isDesktop ? '2rem 0 0' : '0 0 0 2rem')};
  padding: 2rem;
  flex: 1 0;
`;

export const Title = styled.div`
  font-weight: 900;
  font-size: 1.6rem;
  text-align: center;
  margin: 0.4rem 0 3.4rem;
`;

export const Label = styled.div`
  font-weight: 900;
  font-size: 1.4rem;
`;

export const StyledButton = styled(Button)`
  display: table;
  border-radius: 3rem;
  font-size: 1.2rem;
  margin: 2rem auto 0;
`;

export const Select = styled.select`
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['A200']};
  height: 4rem;
  width: 100%;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  padding: 0.5rem 1rem 0.5rem 2.5rem;
`;

export const SelectWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

export const StarIcon = styled(SvgIcon)`
  position: absolute;
  top: 50%;
  transform: translate(0.8rem, -50%);
`;

export const ReviewSelect = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
  ${({ isMobile }) =>
    isMobile &&
    `
    margin-top: 2rem;
    text-align: right;
  `};
`;

export const ReviewHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const SelectDesign = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const DesignOption = styled(({ selected, ...restProps }) => <div {...restProps} />)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin: 0 1rem;
  background: ${({ theme, selected }) =>
    selected ? theme.config.gradients.rotated : theme.palette.grey['A200']};
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  color: ${({ selected }) => selected && '#fff'};
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  display: table;
  margin: auto;
`;

export const ReviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 1rem;

  > div {
    flex: 0 0 calc(50% - 4rem);
    margin: 2rem;
  }
`;

export const Text = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;
