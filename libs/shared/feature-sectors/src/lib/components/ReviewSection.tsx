import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Button, SectionTitle } from '@homeproved/shared/ui';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Title } from './Atoms';
import { ReviewCarrousel } from './ReviewCarrousel';

const ReviewSectionWrapper = styled(({ mobile, transparentBG, noTopSpacing, ...restProps }) => (
  <section {...restProps} />
))`
  background-color: ${({ theme, transparentBG, mobile }) =>
    transparentBG && !mobile ? 'transparent' : theme.palette.grey['A200']};
  margin-top: ${({ noTopSpacing }) => (noTopSpacing ? '0' : '2rem')};
  padding-bottom: ${({ mobile }) => (mobile ? '4rem' : '5rem')};
  padding-top: ${({ mobile, noTopSpacing }) => (noTopSpacing ? 0 : mobile ? '2rem' : '3rem')};
  position: relative;
  z-index: 9;
`;

const ButtonWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: ${({ mobile }) => (mobile ? 'center' : 'flex-end')};
`;

export const ContentWrapper = styled(({ mobile, noTopSpacing, innerRef, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  max-width: 115.6rem;
  padding-top: ${({ mobile, noTopSpacing }) => (noTopSpacing ? 0 : mobile ? '2rem' : '4rem')};
  padding-left: 2rem;
  padding-right: 2rem;
  margin: auto;
`;

type ReviewSectionProps = {
  isMobile: boolean;
  sectorName?: string;
  sectorSlug?: string;
  locality?: string;
  location?: { lng: number; lat: number };
  transparentBG?: boolean;
  generalTitle?: boolean;
  bordered?: boolean;
  noTopSpacing?: boolean;
  getPath: GetPathFunction;
};

export const ReviewSection: FC<ReviewSectionProps> = ({
  isMobile,
  sectorName,
  sectorSlug,
  locality,
  location,
  transparentBG,
  generalTitle,
  bordered,
  noTopSpacing,
  getPath,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const title = generalTitle
    ? t('app.com.pages.landing.review.recent')
    : `${t('app.com.pages.sectors.subSector.reviewSection.title')} ${sectorName} ${
        locality ? `in ${locality}` : ''
      }`;

  const navigateToReview = (slug: string, rid: number) => {
    router
      .push(
        getPath('/company/:slug/review/:rid', {
          slug,
          rid: rid.toString(),
        })
      )
      .then();
  };
  return (
    <ReviewSectionWrapper
      transparentBG={transparentBG}
      noTopSpacing={noTopSpacing}
      mobile={isMobile}
    >
      <ContentWrapper mobile={isMobile} noTopSpacing={noTopSpacing}>
        {!isMobile && (
          <SectionTitle
            textAlign={generalTitle ? 'center' : 'left'}
            label={title}
            lineColor="black"
          />
        )}
        {isMobile && !generalTitle && (
          <Title variant="h2" mobile={isMobile}>
            {title}
          </Title>
        )}
        <ReviewCarrousel
          isMobile={isMobile}
          bordered={bordered}
          navigateToReview={navigateToReview}
          sectorSlug={sectorSlug}
          location={location}
        />
        <ButtonWrapper mobile={isMobile}>
          <Button variant="gradient" href={getPath('/write-review')}>
            {t('app.com.pages.sectors.subSector.reviewSection.writeReview')}
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </ReviewSectionWrapper>
  );
};
