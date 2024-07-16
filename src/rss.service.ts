import { HttpException, Inject, Injectable } from '@nestjs/common';
import { FeedConfig } from './types/feed-config';
import { HttpClientService } from './http-client/client.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class RssService {
  constructor(
    @Inject(HttpClientService) private httpClientService: HttpClientService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async getFeedByGet(feed: FeedConfig): Promise<Record<string, string>[]> {
    const responses = [];

    for (const url of feed.request.urls) {
      const response = await this.httpClientService.getJson(
        url,
        'GET',
        feed.request.payload,
        feed.request.headers,
      );

      if (response) {
        try {
          const parsedResponse = JSON.parse(response);
          responses.push(
            feed.mapping.resultsContainer
              ? parsedResponse[feed.mapping.resultsContainer]
              : parsedResponse,
          );
        } catch (error) {
          console.error(`Error parsing JSON response: ${error}`);
        }
      } else {
        console.error('Error fetching JSON response');
      }
    }

    return responses.flat();
  }

  async getFeedByPOST(feed: FeedConfig): Promise<Record<string, string>[]> {
    const responses = [];

    for (const url of feed.request.urls) {
      const response = await this.httpClientService.postJson(
        url,
        'POST',
        feed.request.payload,
        feed.request.headers,
      );

      if (response) {
        try {
          const parsedResponse = JSON.parse(response);
          responses.push(
            feed.mapping.resultsContainer
              ? parsedResponse[feed.mapping.resultsContainer]
              : parsedResponse,
          );
        } catch (error) {
          console.error(`Error parsing JSON response: ${error}`);
        }
      } else {
        console.error('Error fetching JSON response');
      }
    }

    return responses.flat();
  }

  async getFeedFromCache(feedName: string): Promise<unknown> {
    const feed = await this.cache.get(feedName);
    if (!feed || feed === null) {
      throw new HttpException('Feed not found', 404);
    }
    return feed;
  }
}
