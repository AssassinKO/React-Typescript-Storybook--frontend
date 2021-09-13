import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Button,
  Icons,
  SocialsShare,
  ImageGallery,
  SectionTitle,
  CompanyCard,
  LargeTile,
  Breadcrumb,
} from '@homeproved/shared/ui';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { useRealization } from './hooks';
import { useCompany } from '@homeproved/shared/feature-company';
import Link from 'next/link';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Tabs } from '@homeproved/shared/feature-company';
import { Article, Realisation } from '@homeproved/shared/data-access';

type RealizationsDetailPageProps = {
  slug: string;
  rslug: string;
  getPath: GetPathFunction;
};

const TopWrapper = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    display: flex;
    justify-content: space-between;
    margin-top: 8rem;
  }
`;

const Text = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  flex: 0 0 45%;
  text-align: ${({ isTablet }) => isTablet && 'center'};
`;

const Images = styled.div`
  flex: 0 0 50%;
  overflow: hidden;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    margin: 3rem 0;
  }
`;

const Company = styled(Button)`
  margin-bottom: 2rem;
`;

const Title = styled(({ isTablet, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ isTablet }) => (isTablet ? '1.8rem' : '2.5rem')};
`;

const Subtitle = styled(({ isTablet, ...restProps }) => <Typography {...restProps} />)`
  margin-top: 0.5rem;
  font-size: ${({ isTablet }) => (isTablet ? '1.6rem' : '1.8rem')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 400;
`;

const Description = styled.div`
  border-top: 0.1rem solid;
  margin-top: 2rem;
  padding-top: 2rem;
  line-height: 2.4rem;
`;

const StyledSocialsShare = styled(SocialsShare)`
  margin-top: 2rem;
`;

const Realizations = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 1rem -1rem;
  }
`;

const FlexWrapper = styled.div`
  padding: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    flex: 0 0 50%;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    flex: 0 0 25%;
  }
`;

const CompanyWrapper = styled.div`
  margin: 6rem 0 2rem;
`;

const MoreRealizations = styled.div`
  margin-top: 6rem;
`;

const StyledA = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

const BackButton = styled(Button)`
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 2rem;

  &:hover {
    font-weight: 600;
  }
`;

const MoreButton = styled(Button)`
  display: table;
  margin: 2rem auto;
`;

export const RealizationsDetailPage: FC<RealizationsDetailPageProps> = ({
  slug,
  rslug,
  getPath,
}) => {
  const { t } = useTranslation();
  const { realization } = useRealization(rslug);
  const { company } = useCompany(slug);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  return realization && company ? (
    <>
      {!isTablet && (
        <Breadcrumb absolute>
          {`${t('app.com.pages.housingAdvice.bySector.breadCrumbs.inspire')} / `}
          <Link href={getPath('/realizations')} passHref>
            <StyledA href={getPath('/realizations')}>
              {t('app.com.pages.realizations.bySector.breadCrumbs.realizations')}
            </StyledA>
          </Link>
          {' / '}
          <Link
            href={getPath('/company/:slug/reviews', {
              slug: company.slug,
            })}
            passHref
          >
            <StyledA
              href={getPath('/company/:slug/reviews', {
                slug: company.slug,
              })}
            >
              {company.name}
            </StyledA>
          </Link>
          {' / '}
          <strong>{realization.title}</strong>
        </Breadcrumb>
      )}
      {isTablet && (
        <>
          <BackButton
            variant={'text'}
            href={getPath('/company/:slug/realizations', { slug })}
            arrow={'left'}
          >
            {t('app.com.pages.company.back')}
          </BackButton>
          <Tabs
            slug={slug}
            activeTab={'realizations'}
            isMobile={isMobile}
            isTablet={isTablet}
            getPath={getPath}
          />
        </>
      )}
      <TopWrapper>
        <Text isTablet={isTablet}>
          <Company
            icon={Icons.HELMET}
            pill={false}
            arrow="none"
            variant={isTablet ? 'dark' : 'gradient'}
            href={getPath('/company/:slug', { slug })}
          >
            {company.name}
          </Company>
          <Title variant={'h1'} isTablet={isTablet}>
            {realization.title}
          </Title>
          <Subtitle variant={'h2'} isTablet={isTablet}>
            {realization.subtitle}
          </Subtitle>
          <Description>{ReactHtmlParser(realization.body)}</Description>
          <StyledSocialsShare
            media={['facebook', 'twitter', 'linkedin', 'whatsapp', 'email']}
            label={t('shared.social.shareArticle')}
          />
        </Text>
        <Images>
          <ImageGallery
            images={[realization.cover, ...realization.images]}
            company={{
              name: company.name,
              url: getPath('/company/:slug/reviews', {
                slug: company.slug,
              }),
            }}
          />
        </Images>
      </TopWrapper>
      <CompanyWrapper>
        <SectionTitle label={t('app.com.pages.company.realizationBy')} />
        <CompanyCard company={company} companyPath={getPath('/company/:slug', { slug })} />
      </CompanyWrapper>
      {realization.relations.otherPublications.length > 0 && (
        <MoreRealizations>
          <SectionTitle
            label={`${t('app.com.pages.company.moreRealizationsBy')} ${company.name}`}
            textAlign="center"
          />
          <Realizations>
            {realization.relations.otherPublications.map((item: Realisation | Article, index) => {
              const url =
                item.data.type === 'realisation'
                  ? getPath('/company/:slug/realization/:rslug', {
                      slug,
                      rslug: item.data.slug,
                    })
                  : getPath('/housing-advice/articles/:article', {
                      article: item.data.slug,
                    });

              return (
                <FlexWrapper key={index}>
                  <Link href={url} passHref key={index}>
                    <StyledA href={url}>
                      <LargeTile
                        title={company.name}
                        image={item.data.cover.data.conversions['square-m']}
                        description={item.data.title}
                        clickable
                      />
                    </StyledA>
                  </Link>
                </FlexWrapper>
              );
            })}
          </Realizations>
          {isTablet && (
            <MoreButton
              variant={'light'}
              href={getPath('/company/:slug/realizations', { slug })}
              arrow={'right'}
            >
              {t('app.com.pages.company.moreButton')}
            </MoreButton>
          )}
        </MoreRealizations>
      )}
    </>
  ) : null;
};
