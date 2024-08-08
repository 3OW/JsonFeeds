/* ### Gesobau Config ### */

import {
  FeedConfig,
  MappingConfig,
  MappingOptions,
  RequestConfig,
} from 'src/types/feed-config';

const request: RequestConfig = {
  urls: [
    'https://www.gesobau.de/mieten/wohnungssuche/?resultsPerPage=10000&resultsPage=0&resultAsJSON=1&befilter%5B0%5D=kanal_stringM%3ABestand&befilter%5B1%5D=nutzungsart_stringS%3AWOHNEN',
  ],
  requestType: 'GET',
};

const mapping: MappingConfig = {
  title: '$.raw.title',
  uid: '$.raw.objekt_nr_extern_stringS',
  url: '$.raw.url',
  rent: '$.raw.warmmiete_floatS',
  rooms: '$.raw.zimmer_intS',
  area: '$.area',
  address: '$.raw[adresse_stringS,plz_stringS,ort_stringS]',
  district: '$.raw.region_stringM',
  notice: '$.raw.content',
};

const mappingOptions: MappingOptions = {
  filters: [
    {
      key: '$.raw.sozialwohnung_boolS',
      valueToFilterOut: 'true',
    },
  ],
  linkPrefix: 'https://www.gesobau.de',
};

const gesobauNoWBSFeed: FeedConfig = {
  name: 'gesobau',
  feedTitle: 'Gesobau ohne WBS',
  baseUri: 'https://www.gesobau.de/mieten/wohnungssuche/',
  request,
  mapping,
  mappingOptions,
};

export default gesobauNoWBSFeed;
