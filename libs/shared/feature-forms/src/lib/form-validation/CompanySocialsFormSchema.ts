import * as z from 'zod';
import { optionalValidUrl } from './helpers';

export const companySocialsFormSchema = z.object({
  facebook: optionalValidUrl(),
  twitter: optionalValidUrl(),
  linkedin: optionalValidUrl(),
  instagram: optionalValidUrl(),
  whatsapp: optionalValidUrl(),
});
