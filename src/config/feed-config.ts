import Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { FeedConfig } from 'src/types/feed-config';
import degewoNoWBSFeed from './feeds/dewego.js';
import dwFeed from './feeds/dw.js';
import howogeNoWBSFeed from './feeds/howoge.js';
import vonoviaBerlinFeed from './feeds/vonovia.js';
import gesobauNoWBSFeed from './feeds/gesobau.js';
import sulFeed from './feeds/sul.js';

export interface FeedsConfig {
  feeds: FeedConfig[];
}
export const feedConfig = registerAs('feedConfig', async () => {
  const config = {
    // add new Feeds here
    feeds: [
      degewoNoWBSFeed,
      dwFeed,
      gesobauNoWBSFeed,
      howogeNoWBSFeed,
      vonoviaBerlinFeed,
      sulFeed,
    ],
  };

  const { error } = feedSchema.validate(config);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return config;
});

const requestSchema = Joi.object({
  urls: Joi.array().items(Joi.string().uri().required()).min(1).required(),
  requestType: Joi.string().valid('GET', 'POST').required(),
  payload: Joi.object().optional(),
  headers: Joi.object().optional(),
});

const mappingSchema = Joi.object({
  title: Joi.string().required(),
  uid: Joi.string().required(),
  url: Joi.string().required(),
  imageUrl: Joi.string().optional(),
  rent: Joi.string().required(),
  rooms: Joi.string().required(),
  area: Joi.string().required(),
  address: Joi.string().optional(),
  district: Joi.string().optional(),
  notice: Joi.string().optional(),
});

const mappingOptionsSchema = Joi.object({
  filters: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().required(),
        valueToFilterOut: Joi.string().required(),
      }),
    )
    .optional(),
  resultsContainer: Joi.string().optional(),
  imagePrefixFromJson: Joi.boolean().optional(),
  imagePrefix: Joi.string().optional(),
  imageSuffix: Joi.string().optional(),
  linkPrefixFromJson: Joi.boolean().optional(),
  linkPrefix: Joi.string().optional(),
  linkSuffixFromJson: Joi.boolean().optional(),
  linkSuffix: Joi.string().optional(),
});

const feedSchema = Joi.object({
  feeds: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        feedTitle: Joi.string().required(),
        baseUri: Joi.string().uri().required(),
        request: requestSchema.required(),
        mapping: mappingSchema.required(),
        mappingOptions: mappingOptionsSchema.required(),
      }),
    )
    .min(1)
    .required(),
});
