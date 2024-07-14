export type RequestConfig = {
  urls: string[];
  requestType: 'GET' | 'POST';
  payload?: object;
  headers?: Record<string, string>;
};

export type MappingConfig = {
  feedTitle: string;
  baseUri: string;
  resultsContainer?: string;
  title: string;
  uid: string;
  url: string;
  imageUrl?: string;
  imageHasFullUrl?: boolean;
  rent: string;
  rooms: string;
  area: string;
  district?: string;
  notice?: string;
  filters: MappingFilter[];
};

export type MappingFilter = {
  key: string;
  valueToFilterOut: string;
};

export type FeedConfig = {
  name: string;
  request: RequestConfig;
  mapping: MappingConfig;
};
