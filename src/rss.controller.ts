import { Controller, Get, Inject, Param } from '@nestjs/common';
import { RssService } from './rss.service';
import { Feed } from 'feed';

@Controller()
export class RssController {
  constructor(@Inject(RssService) private readonly rssService: RssService) {}

  @Get('/feed/feedName/:feedName')
  async getHello(@Param('feedName') feedName: string): Promise<string> {
    return await this.rssService.getFeedFromCache(feedName);
  }
}
