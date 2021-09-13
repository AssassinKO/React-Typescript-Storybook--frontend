import React, { FC } from 'react';
import styled from 'styled-components';
import { HouseWithContent, Icons, SvgIcon, Tag } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { HomepageContainerWrapper } from '../container/Container';
import { TestimonialCarrousel } from './TestimonialCarrousel';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 6rem 0 0 0;
`;

const Statement = styled.div`
  flex: 0 0 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0 10rem 0;
`;

const Inner = styled.div``;

const List = styled.ul`
  padding-left: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  margin: 1rem 0;
  padding: 1rem 0;
  list-style: none;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const ListIcon = styled(SvgIcon)`
  margin-right: 1.5rem;
`;

const ListText = styled.span`
  margin-left: 0.5rem;
`;

const AssessmentPolicy = styled.div`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AssessmentLink = styled.a`
  color: inherit;
  text-transform: uppercase;
  text-decoration: underline;
  font-size: 1.3rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  &:hover,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
`;

export const Testimonials: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { getPath } = useLocalizedRoutes();

  return (
    <HomepageContainerWrapper background={theme.palette.grey['A200']}>
      <Wrapper>
        <HouseWithContent
          width={49}
          roofTopIcon={<SvgIcon icon={Icons.HELMET_SOLID} size={5} color={'gradient'} />}
          roofTopTitle={<Tag size={'large'}>{t('app.com.pages.landing.testimonials.hashtag')}</Tag>}
        >
          <TestimonialCarrousel />
        </HouseWithContent>
        <Statement>
          <Inner>
            <h2>{t('app.com.pages.landing.testimonials.header')}</h2>
            <List>
              {(t('app.com.pages.landing.testimonials.points', {
                returnObjects: true,
                defaultValue: [],
              }) as string[]).map((e, index) => (
                <ListItem key={index}>
                  <ListIcon icon={Icons.STAR_SOLID} size={2} key={index} color={'gradient'} />
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
          </Inner>
        </Statement>
      </Wrapper>
    </HomepageContainerWrapper>
  );
};
