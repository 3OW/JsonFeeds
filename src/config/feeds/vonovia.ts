/* ### Vonovia Config ### */

import {
  FeedConfig,
  MappingConfig,
  RequestConfig,
} from 'src/types/feed-config';

const request: RequestConfig = {
  urls: [
    'https://www.wohnraumkarte.de/api/getImmoList?rentType=miete&city=Berlin&lift=0&parking=0&cellar=0&immoType=wohnung&minRooms=0&floor=Beliebig&bathtub=0&bathwindow=0&bathshower=0&furnished=0&kitchenEBK=0&toiletSeparate=0&disabilityAccess=egal&seniorFriendly=0&balcony=egal&garden=0&subsidizedHousingPermit=egal&limit=50&offset=0&orderBy=dist_asc',
  ],
  requestType: 'GET',
};

const mapping: MappingConfig = {
  feedTitle: 'Vonovia',
  baseUri: 'https://www.vonovia.de/zuhause-finden/immobilien/',
  resultsContainer: 'results',
  title: 'titel',
  uid: 'objektnr_extern',
  url: 'slug',
  imageUrl: 'preview_img_url',
  imageHasFullUrl: true,
  rent: 'preis',
  rooms: 'anzahl_zimmer',
  area: 'groesse',
  district: 'ort',
  notice: 'strasse',
  filters: [],
};

const vonoviaBerlinFeed: FeedConfig = {
  name: 'vonoviaBerlin',
  request: request,
  mapping: mapping,
};

export default vonoviaBerlinFeed;
