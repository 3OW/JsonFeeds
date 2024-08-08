export type RequestConfig = {
  urls: string[];
  requestType: 'GET' | 'POST';
  payload?: object;
  headers?: Record<string, string>;
};

export type MappingConfig = {
  title: string;
  uid: string;
  url: string;
  imageUrl?: string;
  rent: string;
  rooms: string;
  area: string;
  address?: string;
  district?: string;
  notice?: string;
};

export type MappingFilter = {
  key: string;
  valueToFilterOut: string;
};

export type MappingOptions = {
  filters: MappingFilter[];
  resultsContainer?: string;
  imagePrefixFromJson?: boolean;
  imagePrefix?: string;
  imageSuffix?: string;
  linkPrefixFromJson?: boolean;
  linkPrefix?: string;
  linkSuffixFromJson?: boolean;
  linkSuffix?: string;
};

export type FeedConfig = {
  name: string;
  feedTitle: string;
  baseUri: string;
  request: RequestConfig;
  mapping: MappingConfig;
  mappingOptions: MappingOptions;
};
