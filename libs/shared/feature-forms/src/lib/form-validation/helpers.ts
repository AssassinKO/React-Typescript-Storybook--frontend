import * as z from 'zod';
import { checkVAT, belgium } from 'jsvat';
import PhoneNumber from 'awesome-phonenumber';

export const isValidBelgianVatNumber = (input: string) => checkVAT(input, [belgium]).isValid;
export const optionalValidBelgianVatNumber = () =>
  z.union([z.string(), z.undefined()]).refine((val) => !val || isValidBelgianVatNumber(val), {
    message: 'shared.form.validation.invalidBelgianVatNumber',
  });

export const isValidEmail = (input: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(input.toLowerCase());
};
export const optionalValidEmail = () =>
  z.union([z.string(), z.undefined()]).refine((val) => !val || isValidEmail(val), {
    message: 'shared.form.validation.invalidEmail',
  });

export const isValidPhoneNumber = (input: string) => {
  // if input starts with 00 (eg 0032...) then replace 00 with +
  const replacedCountryCode =
    input.substr(0, 2) === '00' ? `+${input.substr(2, input.length - 1)}` : input;
  const phone = new PhoneNumber(replacedCountryCode);
  if (phone.getCountryCode() !== 0) {
    return phone.isValid();
  } else {
    // if no countryCode is found, check if valid BE mobile phone number
    const forcedBePhone = new PhoneNumber(replacedCountryCode, 'BE');
    return forcedBePhone.isValid();
  }
};
export const optionalValidPhoneNumber = () =>
  z.union([z.string(), z.undefined()]).refine((val) => !val || isValidPhoneNumber(val), {
    message: 'shared.form.validation.invalidPhoneNumber',
  });

export const formatCountryCode = (input: string): string =>
  // if input starts with 00 (eg 0032...) then replace 00 with +
  input.substr(0, 2) === '00' ? `+${input.substr(2, input.length - 1)}` : input;

export const formatMobileNumber = (input: string): string => {
  if (input == null) return '';
  if (input.substr(0, 2) === '00') return formatCountryCode(input);
  // Belgian mobile numbers start with 04, we'll add the Belgian country code in this case
  if (input.substr(0, 2) === '04') return `+32${input.substr(1, input.length - 1)}`;
  return input;
};

export const isValidMobilePhoneNumber = (input: string) => {
  const replacedCountryCode = formatCountryCode(input);

  const phone = new PhoneNumber(replacedCountryCode);
  if (phone.getCountryCode() !== 0) {
    return phone.isMobile();
  } else {
    // if no countryCode is found, check if valid BE mobile phone number
    const forcedBePhone = new PhoneNumber(replacedCountryCode, 'BE');
    return forcedBePhone.isMobile();
  }
};
export const optionalValidMobilePhoneNumber = () =>
  z.union([z.string(), z.undefined()]).refine((val) => !val || isValidMobilePhoneNumber(val), {
    message: 'shared.form.validation.invalidMobilePhoneNumber',
  });

export const processVatInput = (input: string): string => {
  const result = [];
  input.split('').forEach((char) => {
    if (['B', 'E', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
      result.push(char);
    }
  });
  return result.join('');
};

export const isValidUrl = (input: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(input);
};
export const optionalValidUrl = () =>
  z.union([z.string(), z.undefined()]).refine((val) => !val || isValidUrl(val), {
    message: 'shared.form.validation.invalidUrl',
  });
