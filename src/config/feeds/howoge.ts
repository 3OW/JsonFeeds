/* ### Howoge Config ### */

import {
  FeedConfig,
  MappingConfig,
  RequestConfig,
} from 'src/types/feed-config';

const howogeRequest: RequestConfig = {
  urls: [
    'https://www.howoge.de/?type=999&tx_howsite_json_list%5Baction%5D=immoList&tx_howsite_json_list%5Blimit%5D=120&tx_howsite_json_list%5Brent%5D=&tx_howsite_json_list%5Bwbs%5D=wbs-not-necessary',
  ],
  requestType: 'GET',
};

const howogeMapping: MappingConfig = {
  baseUri: 'https://www.howoge.de',
  resultsContainer: 'immoobjects',
  title: 'title',
  uid: 'uid',
  url: 'link',
  imageUrl: 'image',
  rent: 'rent',
  rooms: 'rooms',
  area: 'area',
  district: 'district',
  notice: 'notice',
};

const howogeFeed: FeedConfig = {
  name: 'howoge',
  request: howogeRequest,
  mapping: howogeMapping,
};

export default howogeFeed;
