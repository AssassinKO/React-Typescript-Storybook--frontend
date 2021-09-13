import * as z from 'zod';
import { isValidEmail } from './helpers';

const companyUserFormSchemaShape = {
  userFirstName: z.string().nonempty('shared.form.validation.nonEmpty'),
  userLastName: z.string().nonempty('shared.form.validation.nonEmpty'),
  userEmail: z.string().refine(isValidEmail, {
    message: 'shared.form.validation.invalidEmail',
  }),
  userPassword: z.string().min(8, {
    message: 'shared.form.validation.invalidPassword',
  }),
  userPasswordConfirmation: z.string().min(8, {
    message: 'shared.form.validation.invalidPasswordConfirmation',
  }),
};

export const refineCompanyUserForm = (object) =>
  object.refine((data) => data.userPassword === data.userPasswordConfirmation, {
    message: 'shared.form.validation.invalidPasswordConfirmation',
    path: ['passwordConfirmation'],
  });

export const companyUserFormSchema = z.object(companyUserFormSchemaShape);
export type CompanyUserFormData = z.infer<typeof companyUserFormSchema>;
