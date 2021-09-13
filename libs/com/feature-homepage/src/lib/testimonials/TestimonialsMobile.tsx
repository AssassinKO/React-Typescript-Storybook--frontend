import React, { FC } from 'react';
import styled from 'styled-components';
import { Icons, SvgIcon, Tag } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { HomepageContainerWrapper } from '../container/Container';
import { TestimonialCarrousel } from './TestimonialCarrousel';

const Top = styled.div`
  margin: -2rem -2rem 0;
  padding: 2rem 2rem 6rem;
  background-color: #fff;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  max-width: 25rem;
  margin: 1rem auto 12rem;
  font-size: 2rem;

  &:after {
    content: '';
    background: ${({ theme }) => theme.palette.grey['A200']};
    position: absolute;
    width: 34rem;
    height: 34rem;
    top: -18rem;
    right: 0;
    left: 0;
    margin: auto;
    transform: rotate(45deg);
    border-radius: 2rem;
    z-index: 0;
  }
  span {
    position: relative;
    z-index: 1;
  }
`;

const Bottom = styled.div`
  text-align: center;
  padding: 3rem 3rem 5rem;
  margin: 0 -2rem;
  background-color: ${({ theme }) => theme.palette.grey['A200']};
`;

const StyledTag = styled(Tag)`
  margin-bottom: 3rem;
`;

const List = styled.ul`
  list-style: none;
  counter-reset: test;
  position: relative;
  z-index: 1;
  max-width: 70rem;
  margin: 0 auto 2rem;
`;

const ListItem = styled.li`
  counter-increment: test;
  display: flex;
  align-items: center;

  &:before {
    content: counter(test);
    color: ${({ theme }) => theme.palette.grey['A200']};
    font-size: 8rem;
    font-weight: 900;
    margin-right: 2rem;
    width: 5rem;
    text-align: center;
  }
`;

const ListIcon = styled(SvgIcon)`
  margin-right: 1.5rem;
`;

const ListText = styled.span`
  margin-left: 0.5rem;
  font-size: 1.7rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const AssessmentPolicy = styled.div`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AssessmentLink = styled.a`
  color: inherit;
  text-transform: uppercase;
  text-decoration: underline;
  font-size: 1.4rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  &:hover,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
`;

export const TestimonialsMobile: FC = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();

  return (
    <HomepageContainerWrapper>
      <Top>
        <Title>
          <span>{t('app.com.pages.landing.testimonials.header')}</span>
        </Title>
        <List>
          {(t('app.com.pages.landing.testimonials.points', {
            returnObjects: true,
            defaultValue: [],
          }) as string[]).map((e, index) => (
            <ListItem key={index}>
              <ListText>{ReactHtmlParser(e)}</ListText>
            </ListItem>
          ))}
        </List>
        <AssessmentPolicy>
          <ListIcon icon={Icons.SCROLL} size={2.5} />
          <Link href={getPath('/assessment-policy')} passHref>
            <AssessmentLink href={getPath('/assessment-policy')}>
              {t('app.com.pages.landing.testimonials.assessmentPolicy')}
            </AssessmentLink>
          </Link>
        </AssessmentPolicy>
      </Top>
      <Bottom>
        <StyledTag size={'large'}>{t('app.com.pages.landing.testimonials.hashtag')}</StyledTag>
        <TestimonialCarrousel isMobile />
      </Bottom>
    </HomepageContainerWrapper>
  );
};
