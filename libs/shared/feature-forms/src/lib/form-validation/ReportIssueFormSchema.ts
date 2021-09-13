import * as z from 'zod';
import { isValidEmail } from './helpers';

export const reportIssueFormSchema = z.object({
  first: z.string().nonempty({
    message: 'shared.form.validation.invalidRequired',
  }),
  last: z.string().nonempty({
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
  description: z.string().nonempty({
    message: 'shared.form.validation.invalidRequired',
  }),
  acceptPolicy: z.boolean().refine((value) => value, {
    message: 'shared.form.validation.invalidTerms',
  }),
});

export type ReportIssueFormData = z.infer<typeof reportIssueFormSchema>;
