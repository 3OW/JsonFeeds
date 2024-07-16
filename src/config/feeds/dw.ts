/* ### DW Config ### */

import {
  FeedConfig,
  MappingConfig,
  RequestConfig,
} from 'src/types/feed-config';

const request: RequestConfig = {
  urls: ['https://immo-api.deutsche-wohnen.com/estate/findByFilter'],
  requestType: 'POST',
  payload: {
    infrastructure: {},
    flatTypes: {},
    other: {},
    page: '1',
    locale: 'de',
    commercializationType: 'rent',
    utilizationType: 'flat',
    location: 'Berlin',
    radius: '15',
    city: 'Berlin',
    rooms: '1',
  },
};

const mapping: MappingConfig = {
  feedTitle: 'Deutsche Wohnen',
  baseUri: 'https://www.deutsche-wohnen.com',
  title: 'title',
  uid: 'id',
  url: '...',
  imageUrl: 'images',
  imageHasFullUrl: false,
  rent: 'price',
  rooms: 'rooms',
  area: 'area',
  district: 'address',
  notice: 'detailType',
  filters: [],
};

const dwFeed: FeedConfig = {
  name: 'dw',
  request: request,
  mapping: mapping,
};

export default dwFeed;
