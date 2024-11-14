// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import Geolocation, {
    type GeolocationError,
} from '@react-native-community/geolocation';
import axios from 'axios';

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
});

export const getLatLong = () => {
    return new Promise<
    | { latitude: number; longitude: number; error?: null }
    | { error: GeolocationError; latitude?: null; longitude?: null }
  >((resolve) => {
      Geolocation.getCurrentPosition(
          (position) => {
              resolve({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
              });
          },
          (error) => {
              resolve({error});
          },
          {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
          },
      );
  });
};

export const getCityFromLatLong = async (lat: number, long: number): Promise<string | null> => {
    const {data} = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,
    );

    return data.city || null;
};
