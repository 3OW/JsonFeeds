/* ### DW Config ### */

import {
  FeedConfig,
  MappingConfig,
  MappingOptions,
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
  title: '$.title',
  uid: '$.id',
  url: '$.id',
  imageUrl: '$.images[0].filePath',
  rent: '$.price',
  rooms: '$.rooms',
  area: '$.area',
  address: '$.address[street,houseNumber,zip,city]',
  district: '$.address.district',
  notice: '$.detailType',
};

const mappingOptions: MappingOptions = {
  filters: [],
  linkPrefix: 'https://www.deutsche-wohnen.com/expose/object/',
  imagePrefix: 'https://immo-api.deutsche-wohnen.com',
};

const dwFeed: FeedConfig = {
  name: 'dw',
  feedTitle: 'Deutsche Wohnen',
  baseUri: 'https://www.deutsche-wohnen.com',
  request,
  mapping,
  mappingOptions,
};

export default dwFeed;
