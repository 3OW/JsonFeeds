import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { serviceConfig, ServiceConfig } from './config/service-config';
import { Cron } from '@nestjs/schedule';
import { ConfigType } from '@nestjs/config';
import { feedConfig, FeedsConfig } from './config/feed-config';
import { RssService } from './rss.service';

const INTERVAL = process.env.CRONJOB_INTERVAL ?? '*/30 * * * *';

@Injectable()
export class RssCronjobService implements OnApplicationBootstrap {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    @Inject(serviceConfig.KEY)
    private serviceConfig: ConfigType<() => ServiceConfig>,
    @Inject(feedConfig.KEY) private feedConfig: ConfigType<() => FeedsConfig>,
    @Inject(RssService) private rssService: RssService,
  ) {}
  async onApplicationBootstrap() {
    await this.updateRssFeedCache();
  }

  @Cron(INTERVAL)
  async updateRssFeedCache(): Promise<void> {
    const feeds = this.feedConfig.feeds;

    feeds.map(async (feed) => {
      const rssFeed =
        feed.request.requestType === 'GET'
          ? await this.rssService.getFeedByGet(feed)
          : await this.rssService.getFeedByPOST(feed);
      await this.cache.set(
        feed.name,
        rssFeed,
        this.serviceConfig.cacheTTLInMinutes,
      );

      console.log(`Updated cache for ${feed.name}`);
      console.log(rssFeed);
    });
  }
}
