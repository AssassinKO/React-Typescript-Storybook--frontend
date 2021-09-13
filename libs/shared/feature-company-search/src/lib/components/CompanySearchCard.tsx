import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { HomeShapeScore, Icons, Stars, SvgIcon } from '@homeproved/shared/ui';
import { CompanyData } from '@homeproved/shared/data-access';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { useTranslation } from 'react-i18next';
import {
  Company,
  FlagValidated,
  LocationTag,
  Logo,
  RatingExtra,
  RatingWrapper,
  Reviews,
  StarsContainer,
  StyledCheckmarkOutlineIcon,
  StyledChip,
  Tags,
  TextButton,
  Title,
  IconOuter,
} from './Atoms';
import { useRouter } from 'next/router';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { ExtraCompanyData } from './CustomHits';

const Rating = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  height: 7.6rem;
  ${({ mobile }) =>
    !mobile &&
    `
    height: auto;
    flex-direction: column;
    align-items: center;
    ${RatingExtra} {
      margin-left: 0;
      justify-content: flex-start;
      ${StarsContainer} {
        order: 2;
      }
      ${Reviews} {
        order: 1;
        text-align: center;
        font-size: 1.2rem;
      }
    }`}
`;

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  position: relative;
  margin: 2rem 0;
  min-height: 16rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    margin: 3rem 0;
  }
  &:nth-of-type(1) {
    margin-top: 1rem;
  }
  padding: 3rem 2rem;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  box-shadow: ${({ theme }) => theme.config.defaultBoxShadow};
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.2);
  }
  ${({ mobile }) =>
    !mobile &&
    `
    padding: 2rem;
    display: flex;
    ${Company} {
      order: 2;
      margin-left: 2rem;
      flex-grow: 1;
      margin-right: 13.4rem;
      ${Title} {
        margin-bottom: 0.7rem;
        text-decoration: underline;
      }
    }
    ${RatingWrapper} {
      order: 1;
      border-bottom: none;
      padding: 0;
      margin: 0;
    }
    ${Logo} {
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 12.4rem;
      height: 12.4rem;
    }
  `}
`;

export type CompanySearchCardProps = {
  company: CompanyData & ExtraCompanyData;
  getPath: GetPathFunction;
  review?: boolean;
};

export const CompanySearchCard: FC<CompanySearchCardProps> = ({ company, getPath, review }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const [showAllTags, setShowAllTags] = useState(false);
  const language = useCurrentLanguage();
  const router = useRouter();
  let tags = [];
  if (company[`${language}.sectors.lvl1`] != null) {
    if (Array.isArray(company[`${language}.sectors.lvl1`])) {
      tags = company[`${language}.sectors.lvl1`].map((unFilteredTag) =>
        unFilteredTag.split('>')[1].replace(/\s/g, '')
      );
    } else {
      tags.push(company[`${language}.sectors.lvl1`].split('>')[1].replace(/\s/g, ''));
    }
  }
  const navigateToCompanyPage = () => {
    router
      .push(
        getPath('/company/:slug/reviews', {
          slug: company.slug,
        })
      )
      .then();
  };

  const navigateToReview = () => {
    router
      .push(
        getPath('/write-review/:slug', {
          slug: company.slug,
        })
      )
      .then();
  };
  const logo = company.media?.find(
    (image) => !!image.data?.['conversions']?.[isMobile ? 'square-xs' : 'square-m']
  )?.data?.['conversions']?.[isMobile ? 'square-xs' : 'square-m'];

  return (
    <Wrapper mobile={isMobile} onClick={review ? navigateToReview : navigateToCompanyPage}>
      <Company>
        <Title>{company.name}</Title>
        {!isMobile && (
          <>
            <Box display="flex">
              <SvgIcon icon={Icons.LOCATION_SOLID} size={2} />
              <LocationTag mobile={isMobile}>{company.city}</LocationTag>
            </Box>
            <Tags>
              {tags.map((tag, index) => (
                <StyledChip key={index} label={tag} size="normal" />
              ))}
            </Tags>
          </>
        )}
      </Company>
      <RatingWrapper display="flex" position="relative">
        <Rating mobile={isMobile}>
          <HomeShapeScore
            score={parseFloat((company?.score?.data?.score ?? 0).toString()).toFixed(1)}
            com={true}
          />
          <RatingExtra>
            <StarsContainer>
              <Stars
                count={company?.score?.data?.score ? Math.round(company.score.data.score / 2) : 0}
                size={1.6}
              />
            </StarsContainer>
            {
              <Reviews>{`${company?.score?.data?.total ?? 0} ${t(
                'app.com.pages.companySearch.mainSection.xReviews'
              )}`}</Reviews>
            }
            {isMobile && (
              <Box display="flex" order={3}>
                <SvgIcon icon={Icons.LOCATION_SOLID} size={2} />
                <LocationTag mobile={isMobile}>{company.city}</LocationTag>
              </Box>
            )}
          </RatingExtra>
        </Rating>
        {isMobile && !!logo && <Logo image={logo} />}
      </RatingWrapper>
      {isMobile && (
        <Tags>
          {tags.map((tag, index) => {
            return (
              (showAllTags || index < 2) && <StyledChip key={index} label={tag} size="normal" />
            );
          })}
          {!showAllTags && tags.length > 2 && (
            <TextButton
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                setShowAllTags(true);
              }}
            >
              {t('app.com.pages.sectors.ctaMore')}
            </TextButton>
          )}
        </Tags>
      )}
      {!isMobile && !!logo && <Logo image={logo} />}
      {!!company.claimed_at && (
        <FlagValidated>
          <IconOuter>
            <StyledCheckmarkOutlineIcon icon={Icons.CHECKMARK_OUTLINE} size={1.1} />
          </IconOuter>
        </FlagValidated>
      )}
    </Wrapper>
  );
};
