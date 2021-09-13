import { CSSObject } from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const baseStyle = (theme): CSSObject => ({
  fontFamily: theme.config.fonts.PTSans,
  fontSize: '1.3rem',
});

export const googlePlacesSelectProps = (selectedAddress, selectedLabel, onChange, t, theme) => ({
  value: selectedAddress
    ? {
        label: selectedLabel,
        value: selectedAddress,
      }
    : undefined,
  onChange,
  isSearchable: true,
  placeholder: ReactHtmlParser(`${t('shared.form.address.googlePlaces.placeholder')} *`),
  noOptionsMessage: () => t('shared.form.address.googlePlaces.noOptions'),
  loadingMessage: () => t('shared.form.address.googlePlaces.loading'),
  styles: {
    placeholder: (base) => ({
      ...base,
      ...baseStyle(theme),
      color: '#777',
    }),
    input: (base) => ({
      ...base,
      ...baseStyle,
      color: theme.palette.grey['800'],
    }),
    control: (base) => ({
      ...base,
      ...baseStyle(theme),
      border: `.1rem solid ${theme.palette.grey['500']}`,
      height: '4rem',
      color: theme.palette.grey['800'],
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      ...baseStyle(theme),
      padding: '.5rem 1.5rem',
      backgroundColor: isSelected
        ? theme.palette.secondary.main
        : isFocused
        ? theme.palette.grey['A200']
        : null,
    }),
    noOptionsMessage: (base) => ({
      ...base,
      ...baseStyle(theme),
      color: '#777',
    }),
    loadingMessage: (base) => ({
      ...base,
      ...baseStyle(theme),
      color: '#777',
    }),
  },
});

export const getValueByTypeFromGeocode = (
  geocode: google.maps.GeocoderResult,
  type: string,
  short = false
): string => {
  let result = '';

  for (let i = 0; i < geocode.address_components.length; i++) {
    if (geocode.address_components[i].types.includes(type)) {
      result = short
        ? geocode.address_components[i].short_name
        : geocode.address_components[i].long_name;
      break;
    }
  }

  return result;
};

export const selectedAddressHasStreetNumber = (
  selectedAddress: google.maps.GeocoderResult
): boolean => {
  let result = false;
  for (let i = 0; i < selectedAddress.address_components.length; i++) {
    if (selectedAddress.address_components[i].types.includes('street_number')) {
      result = true;
      break;
    }
  }
  return result;
};
