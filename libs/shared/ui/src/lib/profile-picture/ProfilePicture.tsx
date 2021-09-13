import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

export type ProfilePictureProps = {
  picture?: string;
  name: string;
  size?: number;
  fontSize?: number;
};

const StyledProfilePicture = styled(({ size, ...restProps }) => <div {...restProps} />)`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  flex-shrink: 0;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center;
    border-radius: 50%;
  }
`;

const Initials = styled(({ fontSize, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  color: #fff;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 800;
`;

const getInitials = (name: string) => {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  const initials = [...name['matchAll'](rgx)] || [];

  return ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();
};

export const ProfilePicture: FC<ProfilePictureProps> = ({
  picture,
  name,
  size = 4.5,
  fontSize = 1.8,
}) => {
  return (
    <StyledProfilePicture size={size}>
      {picture && <img src={picture} alt={name} loading="lazy" />}
      {!picture && <Initials fontSize={fontSize}>{getInitials(name)}</Initials>}
    </StyledProfilePicture>
  );
};
