import * as z from 'zod';
import {
  obligatedFieldsCompanyFormSchema,
  optionalFieldsCompanyFormSchema,
} from './CompanyFormSchema';
import { companyUserFormSchema } from './CompanyUserFormSchema';

export const addCompanyFormSchema = optionalFieldsCompanyFormSchema.merge(companyUserFormSchema);
export const addCompanyFormSchemaWithObligatedFields = obligatedFieldsCompanyFormSchema.merge(
  companyUserFormSchema
);

export type AddCompanyFormData = z.infer<typeof addCompanyFormSchema>;
