/* ### SUL Config ### */

import {
  FeedConfig,
  MappingConfig,
  MappingOptions,
  RequestConfig,
} from 'src/types/feed-config';

const request: RequestConfig = {
  urls: ['https://d2396ha8oiavw0.cloudfront.net/sul-main/immoSearch'],
  requestType: 'POST',
  payload: { offset: 0, cat: 'wohnung' },
};

const mapping: MappingConfig = {
  title: '$.headline',
  uid: '$.details.immoNumber',
  url: '$.details.immoNumber',
  imageUrl: '$.image.filename',
  rent: '$.costs.totalRent',
  rooms: '$.details.rooms',
  area: '$.details.livingSpace',
  district: '$.address.precinct',
  notice: '$.address[street,house_number,postal_code,city]',
};

const mappingOptions: MappingOptions = {
  filters: [],
  linkPrefix: 'https://stadtundland.de/wohnungssuche/',
  imagePrefix: 'https://d2396ha8oiavw0.cloudfront.net/',
  resultsContainer: 'data',
};

const sulFeed: FeedConfig = {
  name: 'sul',
  feedTitle: 'Stadt und Land',
  baseUri: 'https://stadtundland.de/',
  request,
  mapping,
  mappingOptions,
};

export default sulFeed;
