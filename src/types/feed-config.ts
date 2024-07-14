export type RequestConfig = {
  urls: string[];
  requestType: 'GET' | 'POST';
  payload?: object;
  headers?: Record<string, string>;
};

export type MappingConfig = {
  baseUri: string;
  resultsContainer?: string;
  title: string;
  uid: string;
  url: string;
  imageUrl?: string;
  rent: string;
  rooms: string;
  area: string;
  district?: string;
  notice?: string;
};

export type FeedConfig = {
  name: string;
  request: RequestConfig;
  mapping: MappingConfig;
};
