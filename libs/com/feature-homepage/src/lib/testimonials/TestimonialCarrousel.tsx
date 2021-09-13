import React, { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { TestimonialSlide } from './TestimonialSlide';

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  .slick-slider {
    padding-bottom: 3rem;
  }
  .slick-dots li {
    button:before {
      content: '';
      border-radius: 50%;
      background-color: ${({ theme, mobile }) => (mobile ? '#fff' : theme.palette.grey['200'])};
      opacity: 1;
      width: 1.3rem;
      height: 1.3rem;
    }
    &.slick-active button:before {
      background: ${({ theme }) => theme.config.gradients.default};
    }
  }
`;

type TestimonialCarrouselProps = {
  isMobile?: boolean;
};

export const TestimonialCarrousel: FC<TestimonialCarrouselProps> = ({ isMobile }) => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    focusOnSelect: true,
    infinite: true,
  };

  return (
    <Wrapper mobile={isMobile}>
      <Slider {...settings}>
        {[1, 1, 1, 1, 1].map((e, index) => (
          <TestimonialSlide
            title={'"Door Homeproved verbouwen wij met een gerust hart."'}
            text={
              'Wij hadden geen ervaring met verbouwen en hebben via Homeproved toch een vakman gevonden aan een goede prijs.'
            }
            author={'Peter'}
            key={index}
          />
        ))}
      </Slider>
    </Wrapper>
  );
};
