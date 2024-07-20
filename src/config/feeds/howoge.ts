/* ### Howoge Config ### */

import {
  FeedConfig,
  MappingConfig,
  MappingOptions,
  RequestConfig,
} from 'src/types/feed-config';

const request: RequestConfig = {
  urls: [
    'https://www.howoge.de/?type=999&tx_howsite_json_list%5Baction%5D=immoList&tx_howsite_json_list%5Blimit%5D=120&tx_howsite_json_list%5Brent%5D=&tx_howsite_json_list%5Bwbs%5D=wbs-not-necessary',
  ],
  requestType: 'GET',
};

const mapping: MappingConfig = {
  title: '$.title',
  uid: '$.uid',
  url: '$.link',
  imageUrl: '$.image',
  rent: '$.rent',
  rooms: '$.rooms',
  area: '$.area',
  district: '$.district',
  notice: '$.notice',
};

const mappingOptions: MappingOptions = {
  filters: [
    {
      key: '$.wbs',
      valueToFilterOut: 'ja',
    },
  ],
  resultsContainer: 'immoobjects',
  imagePrefix: 'https://www.howoge.de',
  linkPrefix: 'https://www.howoge.de',
};

const howogeNoWBSFeed: FeedConfig = {
  name: 'howoge',
  feedTitle: 'HOWOGE ohne WBS',
  baseUri: 'https://www.howoge.de',
  request,
  mapping,
  mappingOptions,
};

export default howogeNoWBSFeed;
