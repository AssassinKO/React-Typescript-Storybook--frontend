import React, { FC } from 'react';
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@material-ui/core';

type TitleWithImageProps = {
  title?: string;
  image?: string;
};

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const TitleWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ mobile }) => (mobile ? 'block' : 'flex')};
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;

  &:before,
  &:after {
    content: '';
    display: ${({ mobile }) => (mobile ? 'none' : 'block')};
    background: ${({ theme }) => theme.palette.grey['300']};
    height: 0.1rem;
    flex-grow: 1;
  }
`;

const Title = styled(({ mobile, ...restProps }) => <h3 {...restProps} />)`
  font-size: 1.6rem;
  margin: ${({ mobile }) => (mobile ? 0 : '0 4rem')};
`;

const Image = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  margin-top: ${({ mobile }) => (mobile ? '2rem' : '4rem')};
  img {
    display: block;
  }
`;

export const TitleWithImage: FC<TitleWithImageProps> = ({ title, image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));

  return (
    <Wrapper>
      {title && (
        <TitleWrapper mobile={isMobile}>
          <Title mobile={isMobile}>{title}</Title>
        </TitleWrapper>
      )}
      {image && (
        <Image mobile={isMobile}>
          <img src={image} alt="" />
        </Image>
      )}
    </Wrapper>
  );
};
