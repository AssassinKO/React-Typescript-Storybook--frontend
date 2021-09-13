import React, { FC, useCallback, useEffect, useState } from 'react';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import {
  getValueByTypeFromGeocode,
  googlePlacesSelectProps,
  selectedAddressHasStreetNumber,
} from './helpers';
import { CompanyData } from '@homeproved/shared/data-access';
import { Icons, SvgIcon, Tooltip } from '@homeproved/shared/ui';
import ReactHtmlParser from 'react-html-parser';
import { ErrorMessage } from '../ErrorMessage';

type GooglePlacesAddressAutoCompleteProps = {
  updateByVatCompleted: boolean;
  companyById?: CompanyData;
  fieldPrefix?: string;
  prefillRegistrationFormCompleted?: boolean;
  variant?: 'small';
};

const GoogleInput = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SelectedAddressWrapper = styled(({ variant, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-wrap: ${({ variant }) => variant === 'small' && 'wrap'};
  justify-content: flex-start;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  margin: 1rem 0 0 ${({ variant }) => (variant === 'small' ? '0' : '1rem')};

  & > b {
    margin-right: 0.5rem;
  }
`;

const SelectedAddressIcon = styled(SvgIcon)`
  margin-right: 1rem;
`;

const NumberMissingError = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin: 0.5rem 0 0 3.6rem;
`;

const InfoIcon = styled.span`
  position: absolute;
  top: 1.2rem;
  left: -2.5rem;
`;

export const GooglePlacesAddressAutoComplete: FC<GooglePlacesAddressAutoCompleteProps> = ({
  updateByVatCompleted,
  companyById,
  fieldPrefix = '',
  prefillRegistrationFormCompleted = false,
  variant,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const hideTooltip = useMediaQuery(theme.breakpoints.down(800));
  const { register, setValue, getValues, errors } = useFormContext();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);

  const prefixFieldName = (fieldName: string): string => {
    return fieldPrefix
      ? `${fieldPrefix}${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
      : fieldName;
  };

  const handleChangeAddress = (value) => {
    setSelectedLabel(value.label);
    if (!value?.value?.place_id) return;
    geocodeByPlaceId(value.value.place_id).then(updateAddressAfterGeocode);
  };

  const updateAddressAfterGeocode = useCallback(
    (value, shouldRevalidate = true) => {
      setSelectedAddress(value[0]);
      const setValueConfig = { shouldValidate: shouldRevalidate, shouldDirty: shouldRevalidate };

      setValue('street', getValueByTypeFromGeocode(value[0], 'route'), setValueConfig);
      setValue('streetNr', getValueByTypeFromGeocode(value[0], 'street_number'), setValueConfig);
      setValue('postalCode', getValueByTypeFromGeocode(value[0], 'postal_code'), setValueConfig);
      setValue('city', getValueByTypeFromGeocode(value[0], 'locality'), setValueConfig);
      setValue(
        'province',
        getValueByTypeFromGeocode(value[0], 'administrative_area_level_2'),
        setValueConfig
      );
      setValue('country', getValueByTypeFromGeocode(value[0], 'country', true), setValueConfig);
      setValue('latitude', value[0].geometry.location.lat(), setValueConfig);
      setValue('longitude', value[0].geometry.location.lng(), setValueConfig);
    },
    [setValue]
  );

  useEffect(() => {
    if (updateByVatCompleted) {
      geocodeByAddress(
        `${getValues().street} ${getValues().streetNr}, ${getValues().postalCode} ${
          getValues().city
        }, ${getValues().province} ${getValues().country}`
      ).then((value) => {
        setSelectedLabel(value[0].formatted_address);
        updateAddressAfterGeocode(value);
      });
    }
  }, [getValues, updateAddressAfterGeocode, updateByVatCompleted]);

  useEffect(() => {
    if (companyById) {
      geocodeByAddress(
        `${companyById.street} ${companyById.streetNr}, ${companyById.postalCode} ${
          companyById.city
        }, ${getValues().province} ${companyById.country}`
      ).then((value) => {
        setSelectedLabel(value[0].formatted_address);
        updateAddressAfterGeocode(value, false);
      });
    }
  }, [companyById, getValues, updateAddressAfterGeocode]);

  useEffect(() => {
    if (prefillRegistrationFormCompleted) {
      geocodeByAddress(
        `${getValues().street} ${getValues().streetNr}, ${getValues().postalCode} ${
          getValues().city
        }, ${getValues().province} ${getValues().country}`
      ).then((value) => {
        setSelectedLabel(value[0].formatted_address);
        updateAddressAfterGeocode(value);
      });
    }
  }, [getValues, prefillRegistrationFormCompleted, updateAddressAfterGeocode]);

  return (
    <>
      <GoogleInput>
        {!hideTooltip && variant !== 'small' && (
          <Tooltip title={ReactHtmlParser(t('shared.form.address.googlePlaces.tooltip'))}>
            <InfoIcon>
              <SvgIcon icon={Icons.INFO} size={1.4} color={theme.palette.primary.main} />
            </InfoIcon>
          </Tooltip>
        )}
        <GooglePlacesAutocomplete
          autocompletionRequest={{
            types: ['address'],
          }}
          selectProps={googlePlacesSelectProps(
            selectedAddress,
            selectedLabel,
            handleChangeAddress,
            t,
            theme
          )}
        />
        {selectedAddress ? (
          <>
            <SelectedAddressWrapper variant={variant}>
              {variant !== 'small' &&
                (selectedAddressHasStreetNumber(selectedAddress) ? (
                  <SelectedAddressIcon
                    icon={Icons.CHECKMARK}
                    color={theme.palette.green.main}
                    size={1.6}
                  />
                ) : (
                  <SelectedAddressIcon
                    icon={Icons.CROSS}
                    color={theme.palette.primary.main}
                    size={1.6}
                  />
                ))}
              <b>{t('shared.form.address.googlePlaces.selectedAddress')}</b>
              <span>{selectedAddress.formatted_address}</span>
            </SelectedAddressWrapper>
            {!selectedAddressHasStreetNumber(selectedAddress) && (
              <NumberMissingError>
                {t('shared.form.address.googlePlaces.numberMissing')}
              </NumberMissingError>
            )}
          </>
        ) : (
          (errors.street || errors.streetNr || errors.postalCode || errors.city) && (
            <ErrorMessage>{t('shared.form.validation.nonEmpty')}</ErrorMessage>
          )
        )}
      </GoogleInput>
      <input type="hidden" readOnly name={prefixFieldName('latitude')} ref={register} />
      <input type="hidden" readOnly name={prefixFieldName('longitude')} ref={register} />
      <input type="hidden" readOnly name={prefixFieldName('country')} ref={register} />
      <input type="hidden" readOnly name={prefixFieldName('street')} ref={register} />
      <input type="hidden" readOnly name={prefixFieldName('streetNr')} ref={register} />
      <input type="hidden" readOnly name={prefixFieldName('postalCode')} ref={register} />
      <input type="hidden" readOnly name={prefixFieldName('province')} ref={register} />
      <input type="hidden" readOnly name={prefixFieldName('city')} ref={register} />
    </>
  );
};
