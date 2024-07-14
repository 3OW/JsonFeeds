import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { serviceConfig, ServiceConfig } from './config/service-config';
import { Cron } from '@nestjs/schedule';
import { ConfigType } from '@nestjs/config';
import { feedConfig, FeedsConfig } from './config/feed-config';
import { RssService } from './rss.service';
import { JsonToRssMapper } from './mapper/json-to-rss.mapper';

const INTERVAL = process.env.CRONJOB_INTERVAL ?? '*/30 * * * *';

@Injectable()
export class RssCronjobService implements OnApplicationBootstrap {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    @Inject(serviceConfig.KEY)
    private serviceConfig: ConfigType<() => ServiceConfig>,
    @Inject(feedConfig.KEY) private feedConfig: ConfigType<() => FeedsConfig>,
    @Inject(RssService) private rssService: RssService,
    @Inject(JsonToRssMapper) private jsonToRssMapper: JsonToRssMapper,
  ) {}
  async onApplicationBootstrap() {
    await this.updateRssFeedCache();
  }

  @Cron(INTERVAL)
  async updateRssFeedCache(): Promise<void> {
    const feeds = this.feedConfig.feeds;

    for (const feed of feeds) {
      const jsonFeed =
        feed.request.requestType === 'GET'
          ? await this.rssService.getFeedByGet(feed)
          : await this.rssService.getFeedByPOST(feed);

      console.log('jsonFeed', jsonFeed);
      const rssFeed = this.jsonToRssMapper.mapJsonToRss(jsonFeed, feed);
      console.log('rssFeed', rssFeed);
      await this.cache.set(
        feed.name,
        rssFeed.rss2(),
        this.serviceConfig.cacheTTLInMinutes,
      );
    }
  }
}
