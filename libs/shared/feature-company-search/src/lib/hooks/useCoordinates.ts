import { useGeolocation } from '@homeproved/shared/util';

const FIVE_HUNDRED_KM = 500000;

type GeoProps = {
  aroundLatLng?: string;
  aroundRadius: number;
  aroundLatLngViaIP?: boolean;
};
type Location = {
  lat: number;
  lng: number;
};

export const useCoordinates = (
  radius = FIVE_HUNDRED_KM,
  location?: Location
): { geoProps: GeoProps } => {
  const coordinates = useGeolocation();
  const geoProps =
    coordinates.latitude & coordinates.longitude || location
      ? {
          aroundLatLng: location
            ? `${location.lat}, ${location.lng}`
            : `${coordinates.latitude}, ${coordinates.longitude}`,
          aroundRadius: radius,
        }
      : {
          aroundLatLngViaIP: true,
          aroundRadius: radius,
        };
  return {
    geoProps,
  };
};
