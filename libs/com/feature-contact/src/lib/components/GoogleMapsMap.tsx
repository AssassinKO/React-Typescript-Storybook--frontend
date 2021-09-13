import React from 'react';
import { GoogleMap, InfoBox, Marker } from '@react-google-maps/api';
import { Box, useMediaQuery } from '@material-ui/core';
import { theme } from '@homeproved/shared/ui';
import styled from 'styled-components';

const location = {
  lat: 51.23450771207928,
  lng: 4.688989342562528,
};

const StyledInfoBoxInner = styled(Box)`
  position: absolute;
  top: -4.2rem;
  left: 1.8rem;
`;

const infoBoxOptions = { closeBoxURL: '', enableEventPropagation: true };

const StyledInfoBox = styled(InfoBox)`
  left: -2px !important;
`;
const Styling = styled.div`
  .infoBox {
    overflow: visible !important;
  }
`;

const Label = styled.div<{ color?: string; size?: string }>`
  font-size: ${({ size }) => (size === 'small' ? '1rem' : '1.4rem')};
  font-weight: 700;
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  color: ${({ color, theme }) => (color ? theme.palette[color].main : '#000')};
`;
function GoogleMapsMap() {
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const containerStyle = {
    width: '100%',
    height: '300px',
    margin: isMobile ? '-6rem 0' : '8rem 0 -6rem',
  };

  return (
    <Styling>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
          streetViewControl: false,
          panControl: false,
          rotateControl: false,
          scaleControl: false,
        }}
      >
        <Marker position={location} />
        <StyledInfoBox options={infoBoxOptions} position={location}>
          <StyledInfoBoxInner>
            <Label>Homeproved</Label>
            <Label color="primary" size="small">
              Langestraat 207
            </Label>
          </StyledInfoBoxInner>
        </StyledInfoBox>
      </GoogleMap>
    </Styling>
  );
}

export default React.memo(GoogleMapsMap);
