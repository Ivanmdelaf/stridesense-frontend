import { envSchema, Env } from './env.schema';

export const environment: Env = envSchema.parse({
  production: false,
  apiUrl: 'http://localhost:3000',
  appName: 'StrideSense (Dev)',
  appVersion: '1.0.0-dev',
});
