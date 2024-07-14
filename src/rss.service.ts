import { Inject, Injectable } from '@nestjs/common';
import { FeedConfig } from './types/feed-config';
import { HttpClientService } from './http-client/client.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class RssService {
  constructor(
    @Inject(HttpClientService) private httpClientService: HttpClientService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async getFeedByGet(feed: FeedConfig): Promise<[object]> {
    const responses = feed.request.urls.map(async (url) => {
      const response = await this.httpClientService.getJson(
        url,
        'GET',
        feed.request.payload,
        feed.request.headers,
      );

      return response;
    });

    return feed.mapping.resultsContainer
      ? [].concat.apply(
          responses.map((response) => response[feed.mapping.resultsContainer]),
        )
      : [].concat.apply(responses);
  }

  async getFeedByPOST(feed: FeedConfig): Promise<[object]> {
    const responses = feed.request.urls.map(async (url) => {
      const response = await this.httpClientService.postJson(
        url,
        'POST',
        feed.request.payload,
        feed.request.headers,
      );

      return response;
    });

    return feed.mapping.resultsContainer
      ? [].concat.apply(
          responses.map((response) => response[feed.mapping.resultsContainer]),
        )
      : [].concat.apply(responses);
  }

  getFeedFromCache(feedName: string): Promise<[object]> {
    return this.cache.get(feedName);
  }
}
