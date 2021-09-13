import * as z from 'zod';
import { isValidEmail } from './helpers';

export const AddClientsFormSchema = z.object({
  name: z.string().nonempty('shared.form.validation.nonEmpty'),
  email: z.string().refine(isValidEmail, {
    message: 'shared.form.validation.invalidEmail',
  }),
});
export type AddClientsFormData = z.infer<typeof AddClientsFormSchema>;
