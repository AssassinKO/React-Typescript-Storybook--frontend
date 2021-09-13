import React from 'react';
import { RegistrationFormData } from '../form-validation';

export const RegistrationFormDataContext = React.createContext<{
  data: RegistrationFormData;
  setData: (value: RegistrationFormData) => void;
}>({
  data: null,
  setData: () => null,
});
