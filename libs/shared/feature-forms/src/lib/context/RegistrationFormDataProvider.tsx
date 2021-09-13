import React, { FC, useState } from 'react';
import { RegistrationFormData } from '../form-validation';
import { RegistrationFormDataContext } from './RegistrationFormDataContext';

export const RegistrationFormDataProvider: FC = ({ children }) => {
  const [data, setData] = useState<RegistrationFormData>();

  return (
    <RegistrationFormDataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </RegistrationFormDataContext.Provider>
  );
};
