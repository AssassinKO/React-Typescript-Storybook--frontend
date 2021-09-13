import * as z from 'zod';
import { isValidEmail, optionalValidPhoneNumber, optionalValidUrl } from './helpers';

export const companyGeneralInfoFormSchema = z.object({
  phone: optionalValidPhoneNumber(),
  email: z.string().refine(isValidEmail, {
    message: 'shared.form.validation.invalidEmail',
  }),
  street: z.string().nonempty('shared.form.validation.nonEmpty'),
  streetNr: z.string().nonempty('shared.form.validation.nonEmpty'),
  postalCode: z.string().nonempty('shared.form.validation.nonEmpty'),
  city: z.string().nonempty('shared.form.validation.nonEmpty'),
  url: optionalValidUrl(),
});
