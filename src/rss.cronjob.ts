import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { serviceConfig, ServiceConfig } from './config/service-config';
import { Cron } from '@nestjs/schedule';
import { ConfigType } from '@nestjs/config';
import { feedConfig, FeedsConfig } from './config/feed-config';
import { RssService } from './rss.service';
import { JsonToRssMapper } from './mapper/json-to-rss.mapper';
import { Feed } from 'feed';
import { DWToRssMapper } from './mapper/dw.mapper';

const INTERVAL = process.env.CRONJOB_INTERVAL ?? '*/16 * * * *';

@Injectable()
export class RssCronjobService implements OnApplicationBootstrap {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    @Inject(serviceConfig.KEY)
    private serviceConfig: ConfigType<() => ServiceConfig>,
    @Inject(feedConfig.KEY) private feedConfig: ConfigType<() => FeedsConfig>,
    @Inject(RssService) private rssService: RssService,
    @Inject(JsonToRssMapper) private jsonToRssMapper: JsonToRssMapper,
    @Inject(DWToRssMapper) private dwToRssMapper: DWToRssMapper,
  ) {}
  async onApplicationBootstrap() {
    await this.updateRssFeedCache();
  }

  @Cron(INTERVAL)
  async updateRssFeedCache(): Promise<void> {
    await this.waitRandomTime(1000, 1000 * 20);

    const feeds = this.feedConfig.feeds;

    for (const feed of feeds) {
      const jsonFeed =
        feed.request.requestType === 'GET'
          ? await this.rssService.getFeedByGet(feed)
          : await this.rssService.getFeedByPOST(feed);

      let rssFeed: Feed;

      if (feed.name === 'dw') {
        rssFeed = this.dwToRssMapper.mapJsonToRss(jsonFeed, feed);
      } else {
        rssFeed = this.jsonToRssMapper.mapJsonToRss(jsonFeed, feed);
      }

      await this.cache.set(
        feed.name,
        rssFeed.rss2(),
        this.serviceConfig.cacheTTLInMinutes,
      );
    }
  }

  async waitRandomTime(
    minMiliSeconds: number,
    maxMiliSeconds: number,
  ): Promise<void> {
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        Math.floor(
          Math.random() * (maxMiliSeconds - minMiliSeconds + 1) +
            minMiliSeconds,
        ),
      ),
    );
  }
}
