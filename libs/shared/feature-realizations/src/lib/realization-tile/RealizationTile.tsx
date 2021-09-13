import React, { FC } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { ResponsiveImage } from '@homeproved/shared/ui';
import { Box } from '@material-ui/core';

export interface RealizationTileProps {
  cover?: string;
  title: string;
  type?: string;
  date: string;
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 1rem 1rem 4rem;
  background-color: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['300']};
  flex: 1;
`;

const Type = styled.div`
  position: relative;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  color: ${({ theme }) => theme.palette.primary.main};

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 8.5rem;
    height: 0.2rem;
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Title = styled.div`
  font-weight: 700;
`;

const Date = styled(Moment)`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const RealizationTile: FC<RealizationTileProps> = ({ cover = '', title, type, date }) => {
  return (
    <Wrapper>
      <Box mb={1}>
        <ResponsiveImage
          src={cover !== '' ? cover : 'https://picsum.photos/500/240'}
          alt={title}
          ratio={1}
        />
      </Box>
      {type && <Type>{type}</Type>}
      <Title>{title}</Title>
      <Date format={'DD/MM/YYYY'}>{date}</Date>
    </Wrapper>
  );
};

export default RealizationTile;
