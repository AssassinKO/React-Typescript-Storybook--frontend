import * as z from 'zod';
import { isValidEmail } from './helpers';

export const companyContactSchema = z.object({
  description: z.string().nonempty({
    message: 'shared.form.validation.invalidRequired',
  }),
  name: z.string().nonempty({
    message: 'shared.form.validation.invalidRequired',
  }),
  street: z.string().refine((value) => value, {
    message: 'shared.form.validation.invalidRequired',
  }),
  number: z.string().refine((value) => value, {
    message: 'shared.form.validation.invalidRequired',
  }),
  postal: z.string().refine((value) => value, {
    message: 'shared.form.validation.invalidRequired',
  }),
  city: z.string().refine((value) => value, {
    message: 'shared.form.validation.invalidRequired',
  }),
  email: z
    .string()
    .nonempty({
      message: 'shared.form.validation.invalidRequired',
    })
    .refine(isValidEmail, {
      message: 'shared.form.validation.invalidEmail',
    }),
  phone: z.string().refine((value) => value, {
    message: 'shared.form.validation.invalidRequired',
  }),
});

export type CompanyContactFormData = z.infer<typeof companyContactSchema>;
