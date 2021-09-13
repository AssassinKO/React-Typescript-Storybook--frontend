import React, { FC } from 'react';
import {
  AuthorImage,
  Body,
  Date,
  Name,
  ProConWrapper,
  Score,
  Title,
  Top,
  Wrapper,
  ProConTile,
  ProConTileText,
} from './Atoms';
import { ProConPoint } from '@homeproved/shared/data-access';
import moment from 'moment';
import 'moment/locale/nl-be';

export interface ReviewPreviewProps {
  author: string;
  screenName: string;
  score: number;
  title: string;
  date: string;
  body: string;
  proConPoints: ProConPoint[];
}

export const ReviewPreview: FC<ReviewPreviewProps> = ({
  author,
  screenName,
  score,
  title,
  date,
  body,
  proConPoints,
}) => {
  const initials = ((fullName) =>
    fullName
      .map((n, i) => (i === 0 || i === fullName.length - 1) && n[0])
      .filter((n) => n)
      .join(''))(author.split(' '));

  return (
    <Wrapper>
      <Score score={score}>{score}</Score>
      <Top>
        <AuthorImage>{initials}</AuthorImage>
        <div>
          <Name>{screenName}</Name>
          <Date>{moment(date).format('DD/MM/YY')}</Date>
        </div>
      </Top>
      <Title>{title}</Title>
      <Body>{body}</Body>
      {proConPoints.length > 0 && (
        <ProConWrapper>
          {proConPoints.map((item, index) => (
            <ProConTile key={index} con={item.data.type === 'con'}>
              <ProConTileText variant="body1">{item.data.title}</ProConTileText>
            </ProConTile>
          ))}
        </ProConWrapper>
      )}
    </Wrapper>
  );
};
