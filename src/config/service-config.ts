import Joi from 'joi';
import { registerAs } from '@nestjs/config';

export interface ServiceConfig {
  cacheTTLInMinutes: number;
  cronjobInterval: string;
}
export const serviceConfig = registerAs('serviceConfig', async () => {
  const config = {
    cacheTTLInMinutes: process.env.CACHE_TTL_IN_MINUTES
      ? parseInt(process.env.CACHE_TTL_IN_MINUTES, 10) * 60 * 1000
      : 60 * 60 * 1000,
    cronjobInterval: process.env.CRONJOB_INTERVAL
      ? process.env.CRONJOB_INTERVAL
      : '*/16  * * * *',
  };

  const { error } = configSchema.validate(config);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return config as ServiceConfig;
});

const configSchema = Joi.object({
  cacheTTLInMinutes: Joi.number()
    .min(5 * 60 * 1000)
    .max(3600 * 60 * 1000)
    .required(),
  cronjobInterval: Joi.string().required(),
});
