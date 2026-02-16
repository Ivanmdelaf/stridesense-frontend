import { envSchema, Env } from './env.schema';

export const environment: Env = envSchema.parse({
  production: true,
  apiUrl: 'https://api.stridesense.com',
  appName: 'StrideSense',
  appVersion: '1.0.0',
});
