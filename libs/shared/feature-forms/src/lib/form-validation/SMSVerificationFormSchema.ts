import * as z from 'zod';

export const smsVerificationFormSchema = z.object({
  smsCode: z.string().nonempty('shared.form.validation.nonEmpty'),
});
export type SMSVerificationFormData = z.infer<typeof smsVerificationFormSchema>;
