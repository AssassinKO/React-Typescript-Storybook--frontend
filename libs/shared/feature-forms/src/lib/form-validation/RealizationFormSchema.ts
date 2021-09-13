import * as z from 'zod';

export const RealizationFormSchema = z.object({
  description: z
    .string()
    .nonempty('shared.form.validation.nonEmpty')
    .max(600, 'shared.form.validation.max600'),
  title: z
    .string()
    .nonempty('shared.form.validation.nonEmpty')
    .max(70, 'shared.form.validation.max70'),
  subtitle: z.string().max(70, 'shared.form.validation.max70'),
  isSectorSelected: z.boolean().refine((value) => value, {
    message: 'shared.form.validation.minimumSelectedSectors',
  }),
  isCoverPhotoAdded: z.boolean().refine((value) => value, {
    message: 'shared.form.validation.minimumCoverPhoto',
  }),
});
export type RealizationFormData = z.infer<typeof RealizationFormSchema>;
