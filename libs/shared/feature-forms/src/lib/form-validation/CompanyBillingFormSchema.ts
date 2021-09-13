import * as z from 'zod';
import { isValidBelgianVatNumber, isValidEmail, isValidPhoneNumber } from './helpers';

export const companyBillingFormSchema = z.object({
  billingVat: z.string().refine(isValidBelgianVatNumber, {
    message: 'shared.form.validation.invalidBelgianVatNumber',
  }),
  billingName: z.string().nonempty('shared.form.validation.nonEmpty'),
  billingStreet: z.string().nonempty('shared.form.validation.nonEmpty'),
  billingStreetNr: z.string().nonempty('shared.form.validation.nonEmpty'),
  billingPostalCode: z.string().nonempty('shared.form.validation.nonEmpty'),
  billingCity: z.string().nonempty('shared.form.validation.nonEmpty'),
  billingCountry: z.string().nonempty('shared.form.validation.nonEmpty'),
  billingEmail: z.string().refine(isValidEmail, {
    message: 'shared.form.validation.invalidEmail',
  }),
  billingPhone: z.string().refine(isValidPhoneNumber, {
    message: 'shared.form.validation.invalidPhoneNumber',
  }),
});
export type CompanyBillingFormData = z.infer<typeof companyBillingFormSchema>;
