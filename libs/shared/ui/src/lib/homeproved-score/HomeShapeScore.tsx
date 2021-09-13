import React, { FC } from 'react';
import { SvgIcon, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

type HomeShapeScoreProps = {
  score: string;
  max?: number;
  totalReviews?: string;
  className?: string;
  extendedView?: boolean;
  com?: boolean;
};

const Wrapper = styled(({ bigger, ...restProps }) => <div {...restProps} />)`
  position: relative;
  width: ${({ bigger }) => (bigger ? '9.5rem' : '8.5rem')};
`;

const HomeShape = styled(SvgIcon)`
  width: 100%;
  height: auto;
`;

const Rating = styled(({ totalReviews, extendedView, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  top: ${({ totalReviews, extendedView }) =>
    totalReviews != null && !extendedView ? '45%' : '55%'};
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
  font-size: 2.5rem;
`;

const Max = styled.span`
  font-size: 1rem;
`;

const TotalReviews = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.1rem;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 65%;
  right: 0;
  left: 0;
`;

const CollectReviews = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  color: ${({ theme }) => theme.palette.grey['600']};
  transform: translate(-50%, -50%);
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-weight: 700;
  width: 6.5rem;
  text-align: center;
  font-size: 1.2rem;
`;

export const HomeShapeScore: FC<HomeShapeScoreProps> = ({
  score,
  max = 10,
  totalReviews,
  className,
  extendedView = false,
  com = false,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Wrapper className={className} bigger={extendedView}>
      <HomeShape viewBox="0 0 84 74.9">
        <path
          fill={score !== '0.0' ? theme.palette.grey['800'] : theme.palette.grey['200']}
          d="M81.9 26.2L44.7.9c-1.9-1.3-4.4-1.2-6.3 0L2 26.4c-1.2.8-2 2.2-2 3.7v44.8h84v-45c0-1.5-.8-2.9-2.1-3.7z"
        />
      </HomeShape>
      {score !== '0.0' ? (
        <>
          <Rating totalReviews={totalReviews} extendedView={extendedView}>
            <Score>{score}</Score>
            <Max>/ {max}</Max>
          </Rating>
          {!!totalReviews && !extendedView && (
            <TotalReviews>
              {`${totalReviews} ${t('app.pro.dashboard.homeprovedScore.reviews')}`}
            </TotalReviews>
          )}
        </>
      ) : (
        <CollectReviews>
          {com
            ? t('app.com.pages.companySearch.mainSection.collectReviews')
            : t('app.pro.dashboard.homeprovedScore.collectReviews')}
        </CollectReviews>
      )}
    </Wrapper>
  );
};
