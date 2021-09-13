import * as z from 'zod';
import {
  isValidBelgianVatNumber,
  isValidEmail,
  isValidMobilePhoneNumber,
  optionalValidBelgianVatNumber,
  optionalValidEmail,
  optionalValidMobilePhoneNumber,
  optionalValidPhoneNumber,
} from './helpers';

export const optionalFieldsSchema = z.object({
  vat: optionalValidBelgianVatNumber(),
  email: optionalValidEmail(),
  mobile: optionalValidMobilePhoneNumber(),
});

export const obligatedFieldsSchema = z.object({
  vat: z.string().refine(isValidBelgianVatNumber, {
    message: 'shared.form.validation.invalidBelgianVatNumber',
  }),
  email: z.string().refine(isValidEmail, {
    message: 'shared.form.validation.invalidEmail',
  }),
  mobile: z.string().refine(isValidMobilePhoneNumber, {
    message: 'shared.form.validation.invalidMobilePhoneNumber',
  }),
});

export const companyFormSchema = z.object({
  name: z.string().nonempty('shared.form.validation.nonEmpty'),
  street: z.string().nonempty('shared.form.validation.nonEmpty'),
  streetNr: z.string().nonempty('shared.form.validation.nonEmpty'),
  postalCode: z.string().nonempty('shared.form.validation.nonEmpty'),
  city: z.string().nonempty('shared.form.validation.nonEmpty'),
  latitude: z.string().nonempty('shared.form.validation.nonEmpty'),
  longitude: z.string().nonempty('shared.form.validation.nonEmpty'),
  province: z.string().nonempty('shared.form.validation.nonEmpty'),
  country: z.string().nonempty('shared.form.validation.nonEmpty'),
  phone: optionalValidPhoneNumber(),
  url: z.string().optional(),
  sectorIds: z.array(z.number()).optional(),
  acceptPolicy: z.boolean().optional(),
});

export const optionalFieldsCompanyFormSchema = optionalFieldsSchema.merge(companyFormSchema);
export const obligatedFieldsCompanyFormSchema = obligatedFieldsSchema.merge(companyFormSchema);

export type CompanyFormDataWithOptionalVat = z.infer<typeof optionalFieldsCompanyFormSchema>;
export type CompanyFormDataWithObligatedVat = z.infer<typeof obligatedFieldsCompanyFormSchema>;
