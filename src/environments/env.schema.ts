import { z } from 'zod';

export const envSchema = z.object({
  production: z.boolean(),
  apiUrl: z.string().url(),
  appName: z.string().min(1),
  appVersion: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
