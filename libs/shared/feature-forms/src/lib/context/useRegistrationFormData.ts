import { useContext } from 'react';
import { RegistrationFormDataContext } from './RegistrationFormDataContext';

export const useRegistrationFormData = () => useContext(RegistrationFormDataContext);
