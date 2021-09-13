import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Icons, SvgIcon, ReviewCard } from '@homeproved/shared/ui';
import Slider from 'react-slick';
import { useReviewsLatestGet } from '../api/useReviews';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const StyledReviewCarrousel = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding-bottom: 4rem;
  padding-top: 0.5rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  @media screen and (min-width: 730px) {
    overflow: visible;
    padding-left: 5rem;
    padding-right: 5rem;
  }
  @media screen and (min-width: 1250px) {
    padding-left: 0;
    padding-right: 0;
  }
  .slick-slider {
    margin: ${({ mobile }) => (mobile ? '0 -1.5rem' : '0 -2rem')};
    .slick-track {
      display: flex !important;
    }
    .slick-list {
      padding-top: 2.5rem;
    }
    .slick-slide {
      padding: ${({ mobile }) => (mobile ? '0 1.5rem 0.3rem' : '0 2rem 0.3rem')};
      height: inherit !important;
      display: flex;
      & > div {
        flex-grow: 1;
        display: flex;
      }
    }
  }
  .slick-slide.slick-current {
    border: none;
  }
  .slick-arrow {
    &:before {
      content: none;
    }
    &.slick-disabled {
      svg,
      path {
        fill: #fff;
      }
      cursor: default;
    }
    &.slick-prev {
      left: -3.5rem;
    }
    &.slick-next {
      right: -3.5rem;
    }
  }
`;

const LeftArrow = styled(({ className, style, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    <SvgIcon size={5} color="gradient" icon={Icons.ANGLE_LEFT} />
  </div>
))``;

const RightArrow = styled(({ className, style, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    <SvgIcon size={5} color="gradient" icon={Icons.ANGLE_RIGHT} />
  </div>
))``;

type ReviewCarrouselProps = {
  isMobile: boolean;
  bordered: boolean;
  navigateToReview?: (slug: string, rid: number) => void;
  sectorSlug?: string;
  location?: { lng: number; lat: number };
};

const settings = {
  className: 'center',
  centerMode: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.2,
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
        slidesToShow: 2.3,
        arrows: true,
      },
    },
    {
      breakpoint: 730,
      settings: {
        slidesToShow: 1.4,
        arrows: false,
      },
    },
  ],
};

export const ReviewCarrousel: FC<ReviewCarrouselProps> = ({
  isMobile,
  bordered,
  navigateToReview,
  sectorSlug,
  location,
}) => {
  const { data, isSuccess } = useReviewsLatestGet(sectorSlug, location);
  const { t } = useTranslation();
  const [dragging, setDragging] = useState(false);
  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  if (!isSuccess) return <>{t('app.com.pages.landing.review.loading')}</>;

  if (data?.data?.length === 0) return null;

  return (
    <StyledReviewCarrousel mobile={isMobile}>
      <Slider {...settings} beforeChange={handleBeforeChange} afterChange={handleAfterChange}>
        {data.data.map((review) => (
          <ReviewCard
            key={'review-' + review.data.id}
            review={{
              id: review.data.id,
              picture: null,
              name: `${review.data.firstName} ${review.data.lastName}`,
              business: review.data.relations.company.data.name,
              date: moment(review.data.createdAt).format('l'),
              rating: review.data.rating,
              text: review.data.description,
              title: review.data.title,
              companyId: review.data.relations.company.data.id,
              companySlug: review.data.relations.company.data.slug,
              screenName: review.data.screenName,
            }}
            isMobile={isMobile}
            bordered={bordered}
            teaser
            showQuoteSign
            navigateToReview={navigateToReview}
            dragging={dragging}
          />
        ))}
      </Slider>
    </StyledReviewCarrousel>
  );
};
