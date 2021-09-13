import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 3rem;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  h3 {
    margin: 1rem 1rem 0.5rem 0;
  }
`;

export const Intro = styled.p`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  margin: 0.5rem 0;
`;

export const Selection = styled.div`
  display: inline-flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const TileWrapper = styled(({ custom, selected, type, readOnly, ...restProps }) => (
  <span {...restProps} />
))`
  position: relative;
  display: flex;
  align-items: center;
  cursor: ${({ readOnly }) => (readOnly ? 'default' : 'pointer')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  border-radius: 4rem;
  margin: 0.3rem 1rem 0.3rem 0;
  padding: ${({ custom }) => (custom ? '1rem 2rem 1rem 1.4rem' : '1rem 1.4rem')};
  background: ${({ theme, selected, type }) =>
    selected
      ? type === 'sector'
        ? theme.palette.grey['A200']
        : type === 'pro'
        ? theme.config.ratings.lightGreen
        : theme.config.ratings.lightRed
      : theme.palette.common.white};
  border: 0.2rem solid
    ${({ theme, custom, selected, type }) =>
      selected
        ? type === 'sector'
          ? theme.palette.grey['A200']
          : type === 'pro'
          ? custom
            ? theme.config.ratings.green
            : theme.config.ratings.lightGreen
          : custom
          ? theme.config.ratings.red
          : theme.config.ratings.lightRed
        : theme.palette.grey['200']};
  white-space: nowrap;
  height: 4rem;

  input {
    padding: 0;
    outline: none;
    background: transparent;
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    margin-right: ${({ selected }) => (selected ? '.5rem' : 0)};
  }

  span {
    margin-right: ${({ selected }) => (selected ? '.5rem' : 0)};
  }
`;

export const CustomProConIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
`;

export const LoadMoreLink = styled.span`
  margin-top: 0.5rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  text-decoration: underline;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.main};

  &:hover {
    color: ${({ theme }) => theme.palette.grey['800']};
  }
`;

export const ActivityPickerWrapper = styled(({ hasRenderedSectors, ...restProps }) => (
  <div {...restProps} />
))`
  margin-top: ${({ hasRenderedSectors }) => (hasRenderedSectors ? '1rem' : 0)};
`;
