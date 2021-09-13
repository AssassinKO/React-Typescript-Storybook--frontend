import React, { FC } from 'react';
import styled from 'styled-components';

type ResponsiveImageProps = {
  src: string;
  alt: string;
  ratio: number;
  borderRadius?: number;
  scaleOnHover?: boolean;
};

const ImageContainer = styled(({ ratio, borderRadius, scaleOnHover, ...restProps }) => (
  <div {...restProps} />
))`
  width: 100%;
  height: 0;
  padding-bottom: ${({ ratio }) => ratio * 100}%;
  position: relative;
  overflow: hidden;
  border-radius: ${({ borderRadius }) => borderRadius}rem;
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: transform 0.3s ease;
    transform: ${({ scaleOnHover }) => (scaleOnHover ? 'scale(1.05)' : 'scale(1)')};
  }
`;

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  src,
  alt,
  ratio,
  borderRadius = 0,
  scaleOnHover = false,
}) => {
  return (
    <ImageContainer ratio={ratio} borderRadius={borderRadius} scaleOnHover={scaleOnHover}>
      <img src={src} alt={alt} title={alt} loading="lazy" />
    </ImageContainer>
  );
};
