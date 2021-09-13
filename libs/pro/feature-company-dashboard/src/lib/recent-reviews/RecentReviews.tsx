import React, { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Button, Icons, ReviewCard, SvgIcon } from '@homeproved/shared/ui';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useRouter } from 'next/router';
import { CompanyData, Review } from '@homeproved/shared/data-access';

type RecentReviewsProps = {
  reviews: Review[];
  company: CompanyData;
  getPath: GetPathFunction;
  isMobile: boolean;
};

const Label = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin: ${({ isMobile }) => (isMobile ? '3rem 0 2rem' : '3rem 0 0')};
  text-transform: uppercase;
  text-align: ${({ isMobile }) => isMobile && 'center'};
`;

const SliderWrapper = styled.div`
  padding: 0 2rem;

  .slick-track {
    display: flex !important;
  }
  .slick-slide {
    padding: 2.5rem 1rem;
    height: inherit !important;
    display: flex;
    & > div {
      flex-grow: 1;
      display: flex;
    }
  }
  .slick-arrow {
    &:before {
      content: none;
    }
    &.slick-disabled {
      svg,
      path {
        fill: #ddd;
      }
      cursor: default;
    }
    &.slick-prev {
      left: -2rem;
    }
    &.slick-next {
      right: -3rem;
    }
  }
`;

const StyledButton = styled(({ isMobile, ...restProps }) => <Button {...restProps} />)`
  display: table;
  margin: ${({ isMobile }) => (isMobile ? '0 auto' : '0 0 0 auto')};
  border-radius: 4rem;
  font-size: 1.1rem;
  padding: 0.8rem 4.3rem 0.8rem 2.5rem;
`;

const MobileReviewCardWrapper = styled.div`
  margin-bottom: 3rem;
`;

const LeftArrow = styled(({ className, style, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    <SvgIcon size={3} color="gradient" icon={Icons.ANGLE_LEFT} />
  </div>
))``;

const RightArrow = styled(({ className, style, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    <SvgIcon size={3} color="gradient" icon={Icons.ANGLE_RIGHT} />
  </div>
))``;

const settings = {
  className: 'center',
  centerMode: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.6,
  slidesToScroll: 1,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  focusOnSelect: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        arrows: true,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2.1,
        arrows: true,
      },
    },
    {
      breakpoint: 730,
      settings: {
        slidesToShow: 1.2,
        arrows: false,
      },
    },
  ],
};

export const RecentReviews: FC<RecentReviewsProps> = ({ reviews, getPath, isMobile, company }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const navigateToReview = (rid: number) => {
    router
      .push(
        getPath('/reviews/:id', {
          id: rid.toString(),
        })
      )
      .then();
  };

  return (
    <>
      <Label isMobile={isMobile}>{t('app.pro.pages.dashboard.recentReviews')}</Label>
      {!isMobile ? (
        <SliderWrapper>
          <Slider {...settings}>
            {reviews.map((review) => (
              <ReviewCard
                key={'review-' + review.data.id}
                review={{
                  id: review.data.id,
                  name: `${review.data.firstName} ${review.data.lastName}`,
                  date: moment(review.data.createdAt).format('l'),
                  rating: review.data.rating,
                  title: review.data.title,
                  companyId: company.id,
                  companySlug: company.slug,
                  screenName: review.data.screenName,
                }}
                isMobile={isMobile}
                navigateToReview={() => navigateToReview(review.data.id)}
                teaser
              />
            ))}
          </Slider>
        </SliderWrapper>
      ) : (
        reviews.slice(0, 3).map((review) => (
          <MobileReviewCardWrapper>
            <ReviewCard
              key={'review-' + review.data.id}
              review={{
                id: review.data.id,
                name: `${review.data.firstName} ${review.data.lastName}`,
                date: moment(review.data.createdAt).format('l'),
                rating: review.data.rating,
                title: review.data.title,
                companyId: company.id,
                companySlug: company.slug,
                screenName: review.data.screenName,
              }}
              isMobile={isMobile}
              navigateToReview={() => navigateToReview(review.data.id)}
              teaser
            />
          </MobileReviewCardWrapper>
        ))
      )}
      <StyledButton size={'small'} href={getPath('/reviews')} isMobile={isMobile}>
        {t('app.pro.pages.dashboard.allReviews')}
      </StyledButton>
    </>
  );
};
