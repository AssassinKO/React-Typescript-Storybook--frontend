import React, { FC } from 'react';
import styled from 'styled-components';
import { SvgIcon, Icons } from '../svg-icon';

export type LocationTagProps = {
  location: string;
  align?: 'left' | 'center' | 'right';
};

const StyledLocationTag = styled(({ align, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: ${({ align }) =>
    align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'};
  align-items: center;
`;

const StyledLocationTagLabel = styled.div`
  font-size: 1.4rem;
  padding-left: 0.2rem;
  font-family: ${(props) => props.theme.config.fonts.PTSans};
  text-transform: uppercase;
  font-weight: bolder;
`;

export const LocationTag: FC<LocationTagProps> = ({ location, align = 'left' }) => {
  return (
    <StyledLocationTag align={align}>
      <SvgIcon icon={Icons.LOCATION_SOLID} size={1.8} />
      <StyledLocationTagLabel>{location}</StyledLocationTagLabel>
    </StyledLocationTag>
  );
};

export default LocationTag;
