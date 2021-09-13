import * as z from 'zod';

export const RequestCategoryFormSchema = z.object({
  message: z.string().nonempty({
    message: 'shared.form.validation.invalidRequired',
  }),
});

export type RequestCategoryFormData = z.infer<typeof RequestCategoryFormSchema>;
