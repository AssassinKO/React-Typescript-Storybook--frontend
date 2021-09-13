import React, { FC } from 'react';
import { SvgIcon, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';

type ShareableHomeShapeScoreProps = {
  score: string;
  max?: number;
  totalReviews: string;
  year;
};

const Wrapper = styled(({ ...restProps }) => <div {...restProps} />)`
  position: relative;
  width: 18rem;
`;

const HomeShape = styled(SvgIcon)`
  width: 100%;
  height: auto;
`;

const Rating = styled(({ totalReviews, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  top: ${({ totalReviews }) => (totalReviews != null ? '40%' : '55%')};
  left: 50%;
  display: flex;
  color: #fff;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-weight: 700;
  align-items: baseline;
`;

const Score = styled.span`
  font-size: 6.5rem;
`;

const Max = styled.span`
  font-size: 2.6rem;
`;
const Year = styled.span`
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 58%;
  right: 0;
  left: 0;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const TotalReviews = styled.div`
  font-size: 2.5rem;
  text-align: center;
  color: #fff;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const CollectReviews = styled.div`
  position: absolute;
  top: 47%;
  color: #fff;
  transform: translateY(-50%);
  font-weight: 700;
  text-align: center;
  font-size: 2.2rem;
  text-align: center;
  width: 100%;
  padding: 0 2rem;
`;

const ThumbsUpImage = styled.img`
  width: 8rem;
  position: absolute;
  top: -14px;
  right: -50px;
`;

export const ShareableHomeShapeScore: FC<ShareableHomeShapeScoreProps> = ({
  score,
  max = 10,
  year,
  totalReviews,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Wrapper>
      <HomeShape viewBox="0 0 84 74.9">
        <path
          fill={theme.palette.grey['800']}
          d="M81.9 26.2L44.7.9c-1.9-1.3-4.4-1.2-6.3 0L2 26.4c-1.2.8-2 2.2-2 3.7v44.8h84v-45c0-1.5-.8-2.9-2.1-3.7z"
        />
      </HomeShape>
      {score !== '0.0' ? (
        <>
          <Rating totalReviews={totalReviews}>
            <Score>{score}</Score>
            <Max>/ {max}</Max>
          </Rating>
          <Year>{year}</Year>
          <ThumbsUpImage src="/thumbsup.png" alt="" loading="lazy" />
        </>
      ) : (
        <CollectReviews>
          {t('app.com.pages.companySearch.mainSection.collectReviews')}
        </CollectReviews>
      )}
      {!!totalReviews && (
        <TotalReviews>
          {ReactHtmlParser(
            `<strong>${totalReviews}</strong> ${t('app.pro.dashboard.homeprovedScore.reviews')}`
          )}
        </TotalReviews>
      )}
    </Wrapper>
  );
};
