import { Controller, Get, Inject, Param } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller()
export class RssController {
  constructor(@Inject(RssService) private readonly rssService: RssService) {}

  @Get('/feed/feedName/:feedName')
  async getFeed(@Param('feedName') feedName: string): Promise<unknown> {
    return await this.rssService.getFeedFromCache(feedName);
  }
}
