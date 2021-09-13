import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import ReactHtmlParser from 'react-html-parser';
import { Icons, SvgIcon } from '../svg-icon';
import { MediaResponse } from '@homeproved/shared/data-access';
import { Box } from '@material-ui/core';
import { Button } from '../buttons';

export type ImageGalleryProps = {
  images: MediaResponse[];
  copyright?: string;
  bigger?: boolean;
  isMobile?: boolean;
  company?: { name: string; url: string };
};

const SliderWrapper = styled.div`
  padding: 3rem;
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;

const SliderContent = styled.div`
  background: #fff;
  padding: 2rem;
  margin: auto;
  max-width: 115.5rem;
  position: relative;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    padding: 6rem;
  }
`;

const SliderTop = styled(Slider)`
  max-height: 50vh;

  .slick-slider {
    position: static;
  }
  .slick-slide {
    padding: 2rem;
    max-height: 50vh;

    img {
      margin: auto;
      box-shadow: 0 0 2rem 0 rgb(0 0 0 / 25%);
      border: 1rem solid #fff;
      max-width: 100%;
      max-height: 45vh;
    }
  }
  .slick-arrow {
    width: auto;
    height: auto;
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
      left: 0;
      transform: translate(0, -50%);
    }
    &.slick-next {
      right: 0;
      transform: translate(3.9rem, -50%);
    }
  }
`;

const SelectableImage = styled.div``;

const SliderBottom = styled(Slider)`
  .slick-slide {
    padding: 1rem;
    position: relative;
    cursor: pointer;
    > div {
      position: relative;

      &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
      > div {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: transform 0.3s ease;
    }
    &:hover {
      img {
        transform: scale(1.02);
      }
    }
    &.slick-current {
      ${SelectableImage} {
        &:before {
          content: '';
          display: block;
          position: absolute;
          left: -0.8rem;
          top: -0.8rem;
          right: -0.8rem;
          bottom: -0.8rem;
          border: ${({ theme }) => `0.2rem solid ${theme.palette.primary.main}`};
          border-radius: 0.5rem;
        }
      }
    }
  }
`;

const SliderClose = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    right: 3rem;
    top: 3rem;
  }
`;

const Images = styled(({ bigger, mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: ${({ bigger, mobile }) =>
      bigger
        ? mobile
          ? '0 0 calc(50% - 1rem)'
          : '0 0 calc(25% - 1rem)'
        : '0 0 calc(33.33% - 1rem)'};
    position: relative;
    margin: 0.5rem;

    &:first-child {
      flex: 0 0 calc(100% - 1rem);
    }
  }
  img {
    width: 100%;
    vertical-align: bottom;
    cursor: pointer;
  }
`;

const MoreCount = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.75);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  font-size: 5rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Copyright = styled.div`
  margin-top: -2rem;
  padding: 2rem 0.5rem 0.5rem;
  font-size: 1.2rem;
  font-style: italic;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  background: linear-gradient(0deg, rgba(247, 247, 247, 1) 0%, rgba(255, 255, 255, 1) 100%);
`;

const LeftArrow = styled(({ className, style, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    <SvgIcon size={6} color="gradient" icon={Icons.ANGLE_LEFT} />
  </div>
))`
  z-index: 9;
`;

const RightArrow = styled(({ className, style, onClick }) => (
  <div className={className} style={style} onClick={onClick}>
    <SvgIcon size={6} color="gradient" icon={Icons.ANGLE_RIGHT} />
  </div>
))`
  z-index: 9;
`;

export const ImageGallery: FC<ImageGalleryProps> = ({
  images,
  copyright,
  bigger,
  isMobile,
  company,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [imageCount, setImageCount] = useState<number>(0);
  const [initialSlide, setInitialSlide] = useState<number>(2);
  const [sliderOne, setSliderOne] = useState(null);
  const [sliderTwo, setSliderTwo] = useState(null);

  useEffect(() => {
    setImageCount(images.length);
  }, [images, setImageCount]);

  const sliderTopSettings = {
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlide,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const sliderBottomSettings = {
    infinite: imageCount > 6,
    speed: 500,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    initialSlide: initialSlide,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          infinite: imageCount > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: imageCount > 3,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleClick = (index = initialSlide) => {
    setInitialSlide(index);
    setOpen(!open);
  };
  return (
    <>
      <Images bigger={bigger} mobile={isMobile}>
        {images.slice(0, bigger ? (isMobile ? 3 : 5) : 4).map((image, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                handleClick(
                  index !== (bigger ? (isMobile ? 2 : 4) : 3)
                    ? index
                    : imageCount <= (bigger ? (isMobile ? 2 : 5) : 4)
                    ? index
                    : 0
                )
              }
            >
              <img
                src={
                  index === 0
                    ? image.data.conversions?.['landscape-l'] ||
                      image.data.conversions?.['landcape-l'] //can be removed. This is just for the current already-uploaded realisations
                    : image.data.conversions?.['square-l']
                }
                alt=""
                loading="lazy"
              />
              {index === (bigger ? (isMobile ? 2 : 4) : 3) &&
                imageCount > (bigger ? (isMobile ? 3 : 5) : 4) && (
                  <MoreCount>{`+${imageCount - (bigger ? (isMobile ? 3 : 5) : 4)}`}</MoreCount>
                )}
            </div>
          );
        })}
      </Images>
      {!!copyright && <Copyright>{ReactHtmlParser(copyright)}</Copyright>}
      {open && (
        <SliderWrapper>
          <SliderContent>
            {company && company?.name && company?.url && (
              <Box>
                <Button
                  variant="gradient"
                  icon={Icons.HELMET}
                  href={company.url}
                  pill={false}
                  arrow="none"
                >
                  {company.name}
                </Button>
              </Box>
            )}
            <SliderClose onClick={() => handleClick(0)}>
              <SvgIcon icon={Icons.CROSS} size={1.5} />
            </SliderClose>
            <SliderTop
              asNavFor={sliderOne}
              ref={(slider) => setSliderTwo(slider)}
              {...sliderTopSettings}
            >
              {images.map((image, index) => {
                return (
                  <div key={index}>
                    <img
                      src={
                        image.data.conversions?.['landscape-l'] ||
                        image.data.conversions?.['landcape-l'] //can be removed. This is just for the current already-uploaded realisations
                      }
                      alt=""
                    />
                  </div>
                );
              })}
            </SliderTop>
            <SliderBottom
              asNavFor={sliderTwo}
              ref={(slider) => setSliderOne(slider)}
              {...sliderBottomSettings}
            >
              {images.map((image, index) => {
                return (
                  <SelectableImage key={index}>
                    <img src={image.data.conversions['square-l']} alt="" loading="lazy" />
                  </SelectableImage>
                );
              })}
            </SliderBottom>
          </SliderContent>
        </SliderWrapper>
      )}
    </>
  );
};
