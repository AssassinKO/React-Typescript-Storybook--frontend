import { useEffect, useState } from 'react';

type Coordinates = {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error?: string | null;
};
// https://github.com/bence-toth/react-hook-geolocation
type Params = {
  watch?: boolean;
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
};
type Callback = (data: Coordinates & { error: string | null; timestamp: number }) => void;
export const useGeolocation = (
  { watch, enableHighAccuracy, maximumAge, timeout }: Params = {},
  callback?: Callback
) => {
  const [coordinates, setCoordinates] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  useEffect(() => {
    let didCancel;
    const updateCoordinates: PositionCallback = ({ coords, timestamp }) => {
      if (didCancel) {
        return;
      }

      const { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed } = coords;

      setCoordinates({
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed,
        timestamp,
        error: null,
      });

      callback?.({
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed,
        timestamp,
        error: null,
      });
    };

    const setError = (error) => {
      if (didCancel) {
        return;
      }

      setCoordinates({
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: null,
        longitude: null,
        speed: null,
        timestamp: null,
        error,
      });
    };

    let watchId;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateCoordinates, setError);
      if (watch) {
        watchId = navigator.geolocation.watchPosition(updateCoordinates, setError, {
          enableHighAccuracy,
          maximumAge,
          timeout,
        });
      }
    }
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      didCancel = true;
    };
  }, [callback, enableHighAccuracy, maximumAge, timeout, watch]);

  return coordinates;
};
