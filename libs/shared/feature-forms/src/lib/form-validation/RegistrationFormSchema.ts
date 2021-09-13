import * as z from 'zod';
import { optionalFieldsCompanyFormSchema } from './CompanyFormSchema';
import { companyUserFormSchema } from './CompanyUserFormSchema';
import { companyBillingFormSchema } from './CompanyBillingFormSchema';

export const registrationFormSchema = optionalFieldsCompanyFormSchema.merge(companyUserFormSchema);

export const registrationFormSchemaWithBillingInfo = registrationFormSchema.merge(
  companyBillingFormSchema
);

export type RegistrationFormData = z.infer<typeof registrationFormSchemaWithBillingInfo>;
