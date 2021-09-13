import React, { FC } from 'react';
import styled from 'styled-components';
import { Bounce, Icons, SvgIcon, Tag } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';

const Wrapper = styled.div`
  max-width: 100rem;
  margin: auto;
  padding: 0 2rem 6rem;
`;

const StyledHomepagePoints = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 5rem;
`;

const Title = styled.div`
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  margin: 5rem 0;
`;

const StyledHomepagePointsSection = styled.div`
  flex: 0 0 calc(50% - 9rem);
  margin: 3rem 4.5rem;
`;

const StyledHomepagePointsSectionTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  display: table;
`;

const StyledHomepagePointsLine = styled.div`
  background: ${({ theme }) => theme.config.gradients.default};
  height: 0.2rem;
  margin: 1rem 0;
`;

const StyledHomepagePointsSectionText = styled.div`
  padding-bottom: 2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const StyledSvgIcon = styled(SvgIcon)`
  margin: 4rem auto 0;
  text-align: center;
`;

export const HomepagePoints: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Wrapper>
      <Title>{t('app.pro.pages.landing.homepagePoints.title')}</Title>
      <StyledHomepagePoints>
        {[
          {
            title: t('app.pro.pages.landing.homepagePoints.reputation'),
            text: t('app.pro.pages.landing.homepagePoints.reputationText'),
            footer: (
              <Tag size={'large'}>{t('app.pro.pages.landing.homepagePoints.reputationTag')}</Tag>
            ),
          },
          {
            title: t('app.pro.pages.landing.homepagePoints.score'),
            text: t('app.pro.pages.landing.homepagePoints.scoreText'),
            footer: <img src="/img_homeproved_score.png" alt="Homeproved Score" loading="lazy" />,
          },
          {
            title: t('app.pro.pages.landing.homepagePoints.reactOnReview'),
            text: t('app.pro.pages.landing.homepagePoints.reactOnReviewText'),
            footer: (
              <Tag size={'large'}>{t('app.pro.pages.landing.homepagePoints.reactOnReviewTag')}</Tag>
            ),
          },
          {
            title: t('app.pro.pages.landing.homepagePoints.spreadTheWord'),
            text: t('app.pro.pages.landing.homepagePoints.spreadTheWordText'),
            footer: (
              <Tag size={'large'}>{t('app.pro.pages.landing.homepagePoints.spreadTheWordTag')}</Tag>
            ),
          },
        ].map((e, index) => (
          <StyledHomepagePointsSection key={index}>
            <StyledHomepagePointsSectionTitle>
              {e.title}
              <StyledHomepagePointsLine />
            </StyledHomepagePointsSectionTitle>
            <StyledHomepagePointsSectionText>{e.text}</StyledHomepagePointsSectionText>
            {e.footer}
          </StyledHomepagePointsSection>
        ))}
        <Bounce>
          <StyledSvgIcon
            icon={Icons.DOUBLE_ANGLE_DOWN}
            size={3}
            color={theme.palette.grey['800']}
          />
        </Bounce>
      </StyledHomepagePoints>
    </Wrapper>
  );
};
