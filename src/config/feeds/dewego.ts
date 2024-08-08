/* ### Dewego Config ### */

import {
  FeedConfig,
  MappingConfig,
  MappingOptions,
  RequestConfig,
} from 'src/types/feed-config';

const request: RequestConfig = {
  urls: [
    'https://immosuche.degewo.de/de/search.json?utf8=%E2%9C%93&property_type_id=1&categories%5B%5D=1&property_number=&address%5Braw%5D=&address%5Bstreet%5D=&address%5Bcity%5D=&address%5Bzipcode%5D=&address%5Bdistrict%5D=&district=&price_switch=false&price_switch=on&price_from=&price_to=&price_from=&price_to=&price_radio=null&price_from=&price_to=&qm_radio=null&qm_from=&qm_to=&rooms_radio=null&rooms_from=&rooms_to=&features%5B%5D=&wbs_required=0&order=rent_total_without_vat_asc',
    'https://immosuche.degewo.de//de/search.json?address%5Bcity%5D=&address%5Bdistrict%5D=&address%5Bstreet%5D=&address%5Bzipcode%5D=&categories%5B%5D=1&district=33%2C+46%2C+3%2C+2%2C+28%2C+29%2C+71%2C+64%2C+4-8%2C+58%2C+60%2C+7%2C+40-67&features%5B%5D=&order=rent_total_without_vat_asc&price_from=&price_radio=null&price_switch=on&price_to=&property_number=&property_type_id=1&qm_from=&qm_radio=null&qm_to=&rooms_from=&rooms_radio=null&rooms_to=&utf8=%E2%9C%93&wbs_required=0&page=2',
    'https://immosuche.degewo.de//de/search.json?address%5Bcity%5D=&address%5Bdistrict%5D=&address%5Bstreet%5D=&address%5Bzipcode%5D=&categories%5B%5D=1&district=33%2C+46%2C+3%2C+2%2C+28%2C+29%2C+71%2C+64%2C+4-8%2C+58%2C+60%2C+7%2C+40-67&features%5B%5D=&order=rent_total_without_vat_asc&price_from=&price_radio=null&price_switch=on&price_to=&property_number=&property_type_id=1&qm_from=&qm_radio=null&qm_to=&rooms_from=&rooms_radio=null&rooms_to=&utf8=%E2%9C%93&wbs_required=0&page=3',
    'https://immosuche.degewo.de//de/search.json?address%5Bcity%5D=&address%5Bdistrict%5D=&address%5Bstreet%5D=&address%5Bzipcode%5D=&categories%5B%5D=1&district=33%2C+46%2C+3%2C+2%2C+28%2C+29%2C+71%2C+64%2C+4-8%2C+58%2C+60%2C+7%2C+40-67&features%5B%5D=&order=rent_total_without_vat_asc&price_from=&price_radio=null&price_switch=on&price_to=&property_number=&property_type_id=1&qm_from=&qm_radio=null&qm_to=&rooms_from=&rooms_radio=null&rooms_to=&utf8=%E2%9C%93&wbs_required=0&page=4',
  ],
  requestType: 'GET',
};

const mapping: MappingConfig = {
  title: '$.address',
  uid: '$.id',
  url: '$.property_path',
  imageUrl: '$.mobile_thumb_url',
  rent: '$.rent_total_with_vat',
  rooms: '$.number_of_rooms',
  area: '$.living_space',
  address: '$[street,street_number,zipcode,city]',
  district: '$.address',
  notice: '$.[other_information]',
};

const mappingOptions: MappingOptions = {
  filters: [],
  resultsContainer: 'immos',
  linkPrefix: 'https://immosuche.degewo.de',
};

const degewoNoWBSFeed: FeedConfig = {
  name: 'degewo',
  feedTitle: 'Degewo ohne WBS',
  baseUri: 'https://immosuche.degewo.de',
  request,
  mapping,
  mappingOptions,
};

export default degewoNoWBSFeed;
