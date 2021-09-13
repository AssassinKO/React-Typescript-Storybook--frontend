import { RegistrationFormData } from '@homeproved/shared/feature-forms';
import { UseFormMethods } from 'react-hook-form/dist/types/form';
import { PlanUid } from '@homeproved/pro/feature-plans';

export const prefillForm = (
  registrationData: RegistrationFormData,
  methods: UseFormMethods,
  setSectors: (value: number[]) => void
) => {
  const setValueConfig = { shouldValidate: true, shouldDirty: true };

  // COMPANY
  methods.setValue('planId', PlanUid.FREE, setValueConfig);
  methods.setValue('vat', registrationData.vat, setValueConfig);
  methods.setValue('name', registrationData.name, setValueConfig);
  methods.setValue('street', registrationData.street, setValueConfig);
  methods.setValue('streetNr', registrationData.streetNr, setValueConfig);
  methods.setValue('postalCode', registrationData.postalCode, setValueConfig);
  methods.setValue('city', registrationData.city, setValueConfig);
  methods.setValue('country', registrationData.country, setValueConfig);
  methods.setValue('latitude', registrationData.latitude, setValueConfig);
  methods.setValue('longitude', registrationData.longitude, setValueConfig);
  methods.setValue('email', registrationData.email, setValueConfig);
  methods.setValue('phone', registrationData.phone, setValueConfig);
  methods.setValue('mobile', registrationData.mobile, setValueConfig);
  methods.setValue('url', registrationData.url, setValueConfig);

  // USER
  methods.setValue('userFirstName', registrationData.userFirstName, setValueConfig);
  methods.setValue('userLastName', registrationData.userLastName, setValueConfig);
  methods.setValue('userEmail', registrationData.userEmail, setValueConfig);
  methods.setValue('userPassword', registrationData.userPassword, setValueConfig);
  methods.setValue(
    'userPasswordConfirmation',
    registrationData.userPasswordConfirmation,
    setValueConfig
  );

  // SECTORS
  if (registrationData.sectorIds) setSectors(registrationData.sectorIds);

  // ACCEPT POLICY
  methods.setValue('acceptPolicy', registrationData.acceptPolicy, setValueConfig);
};
