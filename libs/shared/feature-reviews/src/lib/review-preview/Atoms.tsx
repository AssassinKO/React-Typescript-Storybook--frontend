import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.config.defaultBoxShadow};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: 1.5rem;
  max-width: 32rem;
  width: 100%;
  position: relative;
`;

export const Score = styled(({ score, ...restProps }) => <div {...restProps} />)`
  color: #ffffff;
  font-weight: 900;
  font-size: 2.6rem;
  background-color: ${({ score, theme }) =>
    score < 5
      ? theme.config.ratings.red
      : score >= 7
      ? theme.config.ratings.green
      : theme.config.ratings.orange};
  border-radius: 50% 50% 50% 0;
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
`;

export const Top = styled.div`
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey['A400']};
  display: flex;
  padding-right: 4rem;
  padding-bottom: 1.5rem;
  align-items: center;
`;

export const AuthorImage = styled.div`
  border-radius: 50%;
  width: 4.6rem;
  height: 4.6rem;
  color: #fff;
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 600;
  font-size: 2rem;
  flex-shrink: 0;
`;

export const Name = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Date = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
`;

export const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
  line-height: 1.75;
  margin: 1.5rem 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Body = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.1rem;
  line-height: 1.75;
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export const ProConWrapper = styled.div`
  margin: 1rem -0.3rem 0;
  max-height: 7rem;
  overflow: hidden;
`;

export const ProConTile = styled(({ con, ...restProps }) => <div {...restProps} />)`
  border-radius: 4rem;
  margin: 0.3rem;
  padding: 0.5rem 1rem;
  border: 0.2rem solid
    ${({ theme, con }) => (con ? theme.config.ratings.red : theme.config.ratings.green)};
  display: inline-block;
`;
export const ProConTileText = styled(Typography)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
