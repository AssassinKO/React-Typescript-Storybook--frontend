import React, { FC } from 'react';
import styled from 'styled-components';
import { Icons, SvgIcon } from '../svg-icon';
import Slider from 'react-slick';
import { MediaResponse } from '@homeproved/shared/data-access';

const StyledImageCarrousel = styled(({ mobile, dotsAreShowing, ...restProps }) => (
  <div {...restProps} />
))`
  margin-bottom: ${({ dotsAreShowing }) => (dotsAreShowing ? '5rem' : '1rem')};
  .slick-slider {
    .slick-list {
      margin: 0 -1rem;
    }
    .slick-slide {
      padding: 0 1rem;
    }
  }
  .slick-arrow {
    &:before {
      content: none;
    }
    &.slick-disabled {
      svg,
      path {
        fill: ${({ theme }) => theme.palette.grey[500]};
      }
      cursor: default;
    }
    &.slick-prev {
      left: -2.4rem;
    }
    &.slick-next {
      right: -3.4rem;
    }
  }
  .slick-dots {
    bottom: -3rem;
    li {
      button {
        width: 1.2rem;
        height: 1.2rem;
        background-color: ${({ theme }) => theme.palette.grey[200]};
        border-radius: 50%;
        &:before {
          display: none;
        }
      }
      &.slick-active {
        button {
          background-color: ${({ theme }) => theme.palette.primary.main};
        }
      }
    }
  }
`;

const LeftArrow = styled(({ className, style, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    <SvgIcon size={3.5} color="gradient" icon={Icons.ANGLE_LEFT} />
  </div>
))``;

const RightArrow = styled(({ className, style, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    <SvgIcon size={3.5} color="gradient" icon={Icons.ANGLE_RIGHT} />
  </div>
))``;

const Slide = styled.div`
  img {
    width: 100%;
  }
`;

type ImageCarrouselProps = {
  isMobile: boolean;
  images: MediaResponse[];
};

export const ImageCarrousel: FC<ImageCarrouselProps> = ({ isMobile, images }) => {
  const settings = {
    centerMode: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    focusOnSelect: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1039,
        settings: {
          arrows: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <StyledImageCarrousel mobile={isMobile} dotsAreShowing={images.length > 1}>
      <Slider {...settings}>
        {images.map((image) => (
          <Slide key={image.data.id}>
            <img
              src={image.data.conversions?.['square-s'] || image.data.conversions?.['square-l']}
              alt={image.data.fileName}
            />
          </Slide>
        ))}
      </Slider>
    </StyledImageCarrousel>
  );
};
