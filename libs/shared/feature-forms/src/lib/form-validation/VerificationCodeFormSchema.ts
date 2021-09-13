import * as z from 'zod';

export const verificationCodeFormSchema = z.object({
  code_1: z
    .string()
    .max(1)
    .min(1)
    .refine((value) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value))),
  code_2: z
    .string()
    .max(1)
    .min(1)
    .refine((value) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value))),
  code_3: z
    .string()
    .max(1)
    .min(1)
    .refine((value) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value))),
  code_4: z
    .string()
    .max(1)
    .min(1)
    .refine((value) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value))),
});
export type VerificationCodeFormData = z.infer<typeof verificationCodeFormSchema>;
