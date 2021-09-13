import React, { FC } from 'react';
import styled from 'styled-components';
import { HomeShapeScore } from './HomeShapeScore';
import Stars from '../stars/Stars';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

type HomeprovedScoreProps = {
  score: number;
  max?: number;
  totalReviews?: string;
  extendedView?: boolean;
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled(({ bigger, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-weight: 700;
  font-size: ${({ bigger }) => (bigger ? '1.8rem' : '1.4rem')};
`;

const Baseline = styled(({ bigger, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
  font-size: ${({ bigger }) => (bigger ? '1.8rem' : '1.6rem')};
`;

const NoScoreText = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  text-align: center;
  max-width: 21rem;
`;

const StyledStars = styled(({ bigger, ...restProps }) => <Stars {...restProps} />)`
  transform: ${({ bigger }) => (bigger ? 'scale(2.3)' : 'scale(2)')};
`;

const TotalReviews = styled(Typography)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  text-align: center;
  margin-top: 1.5rem;
`;

export const HomeprovedScore: FC<HomeprovedScoreProps> = ({
  score,
  max = 10,
  totalReviews,
  extendedView = false,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        <Title bigger={extendedView}>{t('app.pro.dashboard.homeprovedScore.title')}</Title>
        {score === 0 ? (
          <NoScoreText>{t('app.pro.dashboard.homeprovedScore.noScoreText')}</NoScoreText>
        ) : (
          <Baseline bigger={extendedView}>
            {t('app.pro.dashboard.homeprovedScore.baseline')}
          </Baseline>
        )}
      </Section>
      <Section>
        <HomeShapeScore
          score={parseFloat(score.toString()).toFixed(1)}
          max={max}
          totalReviews={totalReviews}
          extendedView={extendedView}
        />
      </Section>
      <Section>
        <StyledStars count={Math.round(score / 2)} bigger={extendedView} />
      </Section>
      {extendedView && (
        <TotalReviews variant="body1">
          {ReactHtmlParser(
            `${t('app.pro.pages.rating.overview.totalReviews')}: <strong>${totalReviews}</strong>`
          )}
        </TotalReviews>
      )}
    </>
  );
};
