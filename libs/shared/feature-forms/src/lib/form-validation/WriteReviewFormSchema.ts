import * as z from 'zod';
import { isValidEmail } from './helpers';

export const writeReviewFormSchema = z.object({
  description: z.string().nonempty('shared.form.validation.nonEmpty'),
  title: z.string().nonempty('shared.form.validation.nonEmpty'),
  firstName: z.string().nonempty('shared.form.validation.nonEmpty'),
  lastName: z.string().nonempty('shared.form.validation.nonEmpty'),
  screenName: z.string().nonempty('shared.form.validation.nonEmpty'),
  email: z.string().refine(isValidEmail, {
    message: 'shared.form.validation.invalidEmail',
  }),
  acceptPolicy: z.boolean().optional(),
});
export type WriteReviewFormData = z.infer<typeof writeReviewFormSchema>;
