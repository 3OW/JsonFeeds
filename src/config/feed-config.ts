import Joi from 'joi';
import { registerAs } from '@nestjs/config';
import howogeNoWBSFeed from './feeds/howoge.js';

import {
  MappingConfig,
  RequestConfig,
  FeedConfig,
} from 'src/types/feed-config';
import degewoNoWBSFeed from './feeds/dewego.js';

export interface FeedsConfig {
  feeds: FeedConfig[];
}
export const feedConfig = registerAs('feedConfig', async () => {
  const config = {
    feeds: [howogeNoWBSFeed, degewoNoWBSFeed],
  };

  const { error } = feedSchema.validate(config);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return config as FeedsConfig;
});

const requestSchema = Joi.object({
  urls: Joi.array().items(Joi.string().uri().required()).min(1).required(),
  requestType: Joi.string().valid('GET', 'POST').required(),
  payload: Joi.object().optional(),
  headers: Joi.object().optional(),
});

const mappingSchema = Joi.object({
  feedTitle: Joi.string().required(),
  baseUri: Joi.string().uri().required(),
  resultsContainer: Joi.string().optional(),
  title: Joi.string().required(),
  uid: Joi.string().required(),
  url: Joi.string().required(),
  imageUrl: Joi.string().optional(),
  imageHasFullUrl: Joi.boolean().optional(),
  rent: Joi.string().required(),
  rooms: Joi.string().required(),
  area: Joi.string().required(),
  district: Joi.string().optional(),
  notice: Joi.string().optional(),
  filters: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().required(),
        valueToFilterOut: Joi.string().required(),
      }),
    )
    .optional(),
});

const feedSchema = Joi.object({
  feeds: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        request: requestSchema.required(),
        mapping: mappingSchema.required(),
      }),
    )
    .min(1)
    .required(),
});
