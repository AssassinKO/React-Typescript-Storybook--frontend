import React, { FC, useState } from 'react';
import { theme } from '../theme/index';
import styled from 'styled-components';
import { ResponsiveImage } from '../responsive-image/ResponsiveImage';
import { Icons, SvgIcon } from '../svg-icon';

export interface LargeTileProps {
  title: string;
  image: string;
  description: string;
  className?: string;
  smallDarkBorder?: boolean;
  clickable?: boolean;
  isFavorite?: boolean;
  removeHeight?: boolean;
}

const LargeTileInternal = styled(({ smallDarkBorder, hovering, removeHeight, ...restProps }) => (
  <div {...restProps} />
))`
  overflow: hidden;
  border: ${({ theme, smallDarkBorder }) =>
    smallDarkBorder
      ? `0.1rem solid ${theme.palette.grey['A400']}`
      : `0.2rem solid ${theme.palette.grey['A200']}`};
  border-radius: ${theme.config.defaultBorderRadius};
  padding: 1.5rem;
  background: #fff;
  transition: box-shadow 0.3s ease;
  box-shadow: ${({ hovering }) => (hovering ? '0 0 1rem 0 rgb(0 0 0 / 10%)' : 'none')};
  cursor: ${({ hovering }) => (hovering ? 'pointer' : 'default')};
  height: ${({ removeHeight }) => !removeHeight && '100%'};
  position: relative;
`;

const Title = styled.div`
  padding-top: 1rem;
  font-size: 1.4rem;
  font-weight: 900;
  text-transform: uppercase;
  font-family: ${theme.config.fonts.PTSans};
`;

const Line = styled.div`
  width: 6.5rem;
  height: 0.3rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  background: ${theme.config.gradients.default};
`;

const Description = styled.div`
  color: #000;
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ResponsiveImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-top-right-radius: 0.4rem;
`;

const FavoriteTriangle = styled.div`
  position: absolute;
  right: -0.1rem;
  top: -0.1rem;
  width: 7rem;
  height: 7rem;
  background: ${({ theme }) => theme.config.gradients.vertical};
  background-color: #003bde;
  clip-path: polygon(100% 0, 100% 100%, 0 0%);
`;
const StyledIcon = styled(SvgIcon)`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export const LargeTile: FC<LargeTileProps> = ({
  title,
  image,
  description,
  className,
  smallDarkBorder = false,
  clickable = false,
  isFavorite,
  removeHeight = false,
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <LargeTileInternal
      className={className}
      smallDarkBorder={smallDarkBorder}
      hovering={hovering}
      onMouseEnter={() => (clickable ? setHovering(true) : null)}
      onMouseLeave={() => (clickable ? setHovering(false) : null)}
      removeHeight={removeHeight}
    >
      <ResponsiveImageContainer>
        <ResponsiveImage
          src={image}
          ratio={1}
          alt={title}
          borderRadius={0.5}
          scaleOnHover={hovering}
        />
        {isFavorite && (
          <FavoriteTriangle>
            <StyledIcon icon={Icons.HEART_SOLID} color="#fff" size={2.5} />
          </FavoriteTriangle>
        )}
      </ResponsiveImageContainer>
      <Title>{title}</Title>
      <Line />
      <Description>{description}</Description>
    </LargeTileInternal>
  );
};
